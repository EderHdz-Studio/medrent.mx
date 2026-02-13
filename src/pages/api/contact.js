export const prerender = false;

const HUBSPOT_TOKEN = import.meta.env.HUBSPOT_PAT_TK;

// Dominios permitidos para CORS
const allowedOrigins = [
  'https://mvp-medrent.vercel.app',
  'https://www.medrent.mx',
  'http://localhost:4321', 'http://localhost:4322' // Permitir para desarrollo local
];

// Función para enviar datos a HubSpot (sin cambios)
async function sendToHubspot(properties) {
  const payload = { properties };
  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HUBSPOT_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  return {
    data,
    status: response.status
  };
}

// --- Manejador de la API para Astro ---
export async function ALL({ request }) {
  const origin = request.headers.get('origin');
  const headers = new Headers();

  // --- Manejo de CORS ---
    if (origin && allowedOrigins.some(o => origin.startsWith(o))) {
        headers.set('Access-Control-Allow-Origin', origin);
        headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }

  // --- Manejo de Petición OPTIONS (preflight) ---
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // --- Validar Método POST ---
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers });
  }

  // --- Validar Token ---
  if (!HUBSPOT_TOKEN) {
    console.error('HUBSPOT_PAT_TK is not defined');
    return new Response(JSON.stringify({ error: 'HubSpot token is not configured' }), { status: 500, headers });
  }
  
  try {
    // --- Procesar el cuerpo de la petición ---
    const input = await request.json();

    if (!input.email) {
      return new Response(JSON.stringify({ error: 'Invalid request body - email is required' }), { status: 400, headers });
    }

    // --- Construir propiedades para HubSpot ---
    const properties = {};
    
    // Separar nombre y apellido
    if (input.name) {
      const nameParts = input.name.trim().split(' ');
      properties.firstname = nameParts.shift() || '';
      properties.lastname = nameParts.join(' ') || '';
    }

    // Procesar todos los campos del formulario
    for (const key in input) {
      if (key === 'name') continue; // Ya procesado

      const value = input[key];

      if (key === 'specialty') {
        properties['especialidad_medica'] = String(value).trim();
        continue;
      }

      if (key === 'unidades_de_negocios') {
        // Forzar el valor correcto para HubSpotF
        properties['unidades_de_negocios'] = 'MED RENT';
        continue;
      }

      if (key === 'phone') {
        let rawPhone = String(value).replace(/[^0-9]/g, '');
        // Validar que tenga exactamente 10 dígitos (número mexicano)
        if (rawPhone.length !== 10) {
          return new Response(JSON.stringify({ error: 'El número de teléfono debe tener exactamente 10 dígitos (México).' }), { status: 400, headers });
        }
        let phone = `+52${rawPhone}`;
        properties.phone = phone;
        continue;
      }

      // Si el campo es un array (checkboxes), lo convierte a string separado por ;
      if (Array.isArray(value)) {
        const filteredValues = value.map(v => String(v).trim()).filter(Boolean);
        if (filteredValues.length > 0) {
          properties[key] = filteredValues.join('; ');
        }
      } else {
        properties[key] = String(value).trim();
      }
    }

    let result = await sendToHubspot(properties);

    // --- Enviar respuesta final ---
    headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify(result.data), { status: result.status, headers });

  } catch (error) {
    console.error('Function error:', error);
    if (error instanceof SyntaxError) { // Error al parsear JSON
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), { status: 400, headers });
    }
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers });
  }
}
