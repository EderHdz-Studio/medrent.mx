// Utilities para el proyecto

// Variable de entorno para Strapi URL
const STRAPI_URL =
  import.meta.env.STRAPI_URL ||
  "https://balanced-amusement-bd4a404315.strapiapp.com";

/**
 * Función helper para construir URLs de imágenes de Strapi
 * Maneja tanto URLs absolutas (producción) como relativas (desarrollo)
 * @param {string} imageUrl - URL de la imagen desde Strapi
 * @param {string} fallback - Imagen por defecto si no hay URL
 * @returns {string} URL completa de la imagen
 */
export function buildImageUrl(imageUrl, fallback = "/images/doctora.webp") {
  if (!imageUrl) return fallback;

  // Si la URL ya es absoluta (comienza con http:// o https://), usarla tal como está
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Si es una URL relativa, concatenar con STRAPI_URL
  return `${STRAPI_URL}${imageUrl}`;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/** Convierte un slug con guiones en título legible (mayúscula inicial por palabra). */
export function formatSlugAsTitle(slug) {
  if (!slug || typeof slug !== "string") return "";
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
