export type HomeEspecialidadItem = {
  name: string;
  slug: string;
  isActive: boolean;
  iconImage: string;
};

/** Misma fuente que el mosaico de especialidades del home (`index.astro`). */
export const HOME_ESPECIALIDADES: HomeEspecialidadItem[] = [
  {
    name: "Neurofisiología",
    slug: "neurofisiologia",
    isActive: true,
    iconImage: "/temp/categorias/img - especialidad.png",
  },
  {
    name: "Neurocirugía",
    slug: "neurocirugia",
    isActive: true,
    iconImage: "/temp/categorias/img - especialidad-1.png",
  },
  {
    name: "Neuromodulación",
    slug: "neuromodulacion",
    isActive: true,
    iconImage: "/temp/categorias/img - especialidad-2.png",
  },
  {
    name: "Rehabilitación",
    slug: "rehabilitacion",
    isActive: true,
    iconImage: "/temp/categorias/img - especialidad-3.png",
  },
  {
    name: "Neurovascular",
    slug: "neurovascular",
    isActive: true,
    iconImage: "/temp/categorias/img - especialidad-4.png",
  },
  {
    name: "Consumibles",
    slug: "consumibles",
    isActive: true,
    iconImage: "/temp/categorias/img - especialidad-5.png",
  },
];

export function getHomeEspecialidadesForSlider(): HomeEspecialidadItem[] {
  return HOME_ESPECIALIDADES.filter((m) => m.name !== "Consumibles");
}
