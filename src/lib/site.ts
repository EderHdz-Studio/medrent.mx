export const SITE = {
  name: 'Med Rent',
  legalName: 'Medrent®',
  slogan: 'Distribuimos las mejores marcas de equipo médico',
};

export const BRANDS = [
  { name: "Ambu", logo: "Ambu.png" },
  { name: "Astar", logo: "Astar.png" },
  { name: "Cadwell", logo: "Cadwell.png" },
  { name: "Deymed", logo: "Deymed.png" },
  { name: "Electrocap", logo: "Electrocap.png" },
  { name: "Esaote", logo: "Esaote.png" },
  { name: "Luciole medical", logo: "Luciole medical.png" },
  { name: "Hasomed", logo: "Hasomed - Logotipo.png" },
  { name: "NE Neuroelectrics", logo: "NE.png" },
  { name: "Physiomed", logo: "Physiomed.png" },
  { name: "Rimed", logo: "Rimed.png" },
  { name: "Hasomed Rehacom", logo: "Rehacom.png" },
  { name: "Samsung Medison", logo: "Samsung Medison.png" },
  { name: "Spes medica", logo: "spes.png" },
  { name: "Spine Guard", logo: "Spine Guard - logotipo.png" },
  { name: "Syneika", logo: "Syneika - Logotipo.png" },
  { name: "tVNS", logo: "tVNS Health - Logotipo.png" },
  { name: "Weaver", logo: "Weaver.png" }, 
];

export const METRICS = [
  { value: '+8000', label: 'CLIENTES AL 2026' },
  { value: '+200', label: 'FINANCIAMIENTOS OTORGADOS' },
  { value: '15', label: 'MARCAS' },
  { value: '+50', label: 'AÑOS DE EXPERIENCIA' },
  { value: '+45', label: 'ÁREAS DE ESPECIALIDAD' },
]

export const ESPECIALTIES = [
  { Nombre:"Neurofisiología", id: 1, Id: 1, Path:"neurofisiologia",
    CatalogoAplicaciones: [
      { AplicacionClinica: "EEG", Slug: "eeg", id: 1 },
      { AplicacionClinica: "EMG", Slug: "emg", id: 2 },
      { AplicacionClinica: "NCS", Slug: "ncs", id: 3 },
      { AplicacionClinica: "EP", Slug: "ep", id: 4 },
      { AplicacionClinica: "NMUS", Slug: "nmus", id: 5 },
      { AplicacionClinica: "IONM", Slug: "ionm", id: 6 },
      { AplicacionClinica: "PSG", Slug: "psg", id: 7 },
      { AplicacionClinica: "Polígrafo", Slug: "poligrafo", id: 8 },
      { AplicacionClinica: "Consumibles", Slug: "consumibles", id: 9 },
    ]
  },
  { Nombre:"Neurocirugía", id: 2, Id: 2, Path:"neurocirugia",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Visualización", Slug: "visualizacion", id: 1 },
      { AplicacionClinica: "Neuronavegación", Slug: "neuronavegacion", id: 2 },
      { AplicacionClinica: "Instrumental", Slug: "instrumental", id: 3 },
      { AplicacionClinica: "Aspiración", Slug: "aspiracion", id: 4 },
      { AplicacionClinica: "Electrocirugía", Slug: "electrocirugia", id: 5 },
    ]
  },
  { Nombre:"Neuromodulación", id: 3, Id: 3, Path:"neuromodulacion",
    CatalogoAplicaciones: [
      { AplicacionClinica: "TMS", Slug: "tms", id: 1 },
      { AplicacionClinica: "tDCS/TES", Slug: "tdcs-tes", id: 2 },
      { AplicacionClinica: "VNS", Slug: "vns", id: 3 },
      { AplicacionClinica: "Terapia cognitiva", Slug: "terapia-cognitiva", id: 4 },
    ]
  },
  { Nombre:"Rehabilitación", id: 4, Id: 4, Path:"rehabilitacion",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Isocinesia", Slug: "isocinesia", id: 1 },
      { AplicacionClinica: "Electroterapia", Slug: "electroterapia", id: 2 },
      { AplicacionClinica: "Ondas de choque", Slug: "ondas-de-choque", id: 3 },
      { AplicacionClinica: "Ultrasonido", Slug: "ultrasonido", id: 4 },
    ]
  },
  { Nombre:"Neurovascular", id: 5, Id: 5, Path:"neurovascular",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Doppler transcraneal", Slug: "doppler-transcraneal", id: 1 },
      { AplicacionClinica: "Monitoreo cerebral", Slug: "monitoreo-cerebral", id: 2 },
    ]
  }
];

export const APLICATIONS = [
  {
    nombre: "Cardiología",
    descripcion: "Soluciones para diagnóstico y monitoreo cardíaco.",
    icono: "/icons/cardiologia.svg",
    url: "/aplicaciones/cardiologia"
  },
  {
    nombre: "Neurofisiología",
    descripcion: "Equipos para estudios neurofisiológicos.",
    icono: "/icons/neurofisiologia.svg",
    url: "/aplicaciones/neurofisiologia"
  },
  {
    nombre: "Ultrasonido",
    descripcion: "Tecnología avanzada en ultrasonido médico.",
    icono: "/icons/ultrasonido.svg",
    url: "/aplicaciones/ultrasonido"
  },
];