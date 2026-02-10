export const SITE = {
  name: 'Med Rent',
  legalName: 'Medrent®',
  slogan: 'Distribuimos las mejores marcas de equipo médico',
  contact: '525559854347'
};

export const METRICS = [
  { value: '+8000', label: 'CLIENTES AL 2026' },
  { value: '+200', label: 'FINANCIAMIENTOS OTORGADOS' },
  { value: '15', label: 'MARCAS' },
  { value: '+50', label: 'AÑOS DE EXPERIENCIA' },
  { value: '+45', label: 'ÁREAS DE ESPECIALIDAD' },
]

export const ESPECIALTIES = [
  { Nombre:"Neurofisiología", 
    id: 1, 
    Id: 1, 
    Path:"neurofisiologia", 
    Descripcion:"Tecnologías para el diagnóstico funcional del sistema nervioso, que integran EEG, EMG, estudios de conducción nerviosa, polisomnografía, poligrafía y ultrasonido neuromuscular, con soluciones orientadas a la práctica clínica especializada y al análisis neurofisiológico avanzado.", Slug:"neurofisiologia", ImageHero:"hero.png",
    Image:"Neurofisiologia.jpg",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Electroencefalografía (EEG)", Slug: "eeg", id: 1, Equipos:"", image: "eeg.png", Descripcion:"Registro de la actividad eléctrica cerebral para la evaluación de epilepsia, trastornos neurológicos, alteraciones del sueño y estudios funcionales del sistema nervioso central, con soluciones diseñadas para entornos clínicos y hospitalarios."},
      { AplicacionClinica: "Electromiografía (EMG)", Slug: "emg", id: 2, Equipos:"", image: "emg.png", Descripcion: "Evaluación de la actividad eléctrica muscular para el diagnóstico de enfermedades neuromusculares, lesiones del nervio periférico y trastornos del movimiento, como parte integral del estudio neuromuscular."},
      { AplicacionClinica: "Estudios de conducción nerviosa (NCS)", Slug: "ncs", id: 3, Equipos:"", image: "ncs.png", Descripcion: "Medición de la velocidad, latencia y amplitud de conducción de los nervios periféricos para la detección de neuropatías, atrapamientos nerviosos y alteraciones sensitivo-motoras."},
      { AplicacionClinica: "Potenciales evocados (EP)", Slug: "ep", id: 4, Equipos:"", image: "ep.png", Descripcion: "Evaluación de la respuesta del sistema nervioso ante estímulos visuales, auditivos y somatosensoriales, utilizada para el diagnóstico de alteraciones neurológicas centrales y el apoyo en estudios funcionales avanzados."},
      { AplicacionClinica: "Ultrasonido neuromuscular (NMUS)", Slug: "ultrasonido-neuromuscular", id: 5, Equipos:"", image: "NMUS.png", Descripcion: "Evaluación estructural y funcional del sistema neuromuscular mediante imágenes en tiempo real, utilizada para el análisis de músculos, nervios periféricos y como complemento diagnóstico en estudios neuromusculares."},
      { AplicacionClinica: "Monitoreo neurofisiológico intraoperatorio (IONM)", Slug: "ionm", id: 6, Equipos:"", image: "IONM.png", Descripcion: "Supervisión continua de la integridad funcional del sistema nervioso durante procedimientos quirúrgicos, con el objetivo de reducir riesgos neurológicos y apoyar la toma de decisiones intraoperatorias en cirugías de alta complejidad."},
      { AplicacionClinica: "Polisomnografía (PSG)", Slug: "polisomnografia", id: 7, Equipos:"", image: "PSG.png", Descripcion: "Registro y análisis de variables fisiológicas durante el sueño para la evaluación de trastornos respiratorios del sueño, alteraciones del ritmo sueño-vigilia y estudios del descanso, tanto en laboratorio como en modalidades ambulatorias."},
      { AplicacionClinica: "Polígrafo", Slug: "poligrafo", id: 8, Equipos:"", image: "Poligrafo.png", Descripcion: "Evaluación simplificada del sueño enfocada en el diagnóstico de trastornos respiratorios, como apnea del sueño, mediante el registro de variables respiratorias clave."},
      { AplicacionClinica: "Consumibles EEG / EMG / EP / NCS", Slug: "consumibles-eeg-emg-ep-ncs", id: 9, Equipos:"consumibles-eeg-emg-ep-ncs.png", image: "consumibles-eeg-emg-ep-ncs", Descripcion: "Consumibles especializados para estudios de EEG, EMG, NCS, EP, PSG e IONM, que incluyen electrodos, agujas, pastas conductivas y accesorios clínicos, diseñados para garantizar registros confiables, seguros y reproducibles en entornos médicos."},
    ]
  },
  { Nombre:"Neurocirugía", id: 2, Id: 2, Path:"neurocirugia", Descripcion:"Soluciones tecnológicas para procedimientos neuroquirúrgicos que incluyen visualización avanzada, neuronavegación, instrumental especializado y tecnologías de apoyo quirúrgico, diseñadas para mejorar la precisión, seguridad y toma de decisiones en entornos de alta complejidad.", Slug:"neurocirugia", Image:"Neurocirugia.jpg", ImageHero:"hero.png",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Microscopio / Exoscopio", Slug: "microscopio-exoscopio", id: 1, Equipos:"", image: "microscopio-exoscopio.png", Descripcion: "Sistemas de visualización quirúrgica avanzada que permiten una visión ampliada y detallada del campo operatorio, mejorando la precisión, la ergonomía del cirujano y el control durante procedimientos neuroquirúrgicos complejos."},
      { AplicacionClinica: "Neuronavegación", Slug: "neuronavegacion", id: 2, image: "neuronavegacion.png", Descripcion: "Sistemas de neuronavegación diseñados para asistir al cirujano mediante la integración de imágenes médicas y referencias anatómicas en tiempo real, facilitando una localización precisa y segura durante procedimientos neuroquirúrgicos."},
      { AplicacionClinica: "Guía dinámica de cirugía", Slug: "guia-dinamica-cirugia", id: 3, image: "guia-dinamica-cirugia.png", Descripcion: "Tecnología de guiado dinámico que proporciona retroalimentación en tiempo real durante procedimientos quirúrgicos, ayudando a mejorar la precisión del abordaje y a reducir el riesgo de desviaciones intraoperatorias."},
      { AplicacionClinica: "Consumibles IONM", Slug: "consumibles", id: 4, image: "consumibles.png", Descripcion: "Consumibles especializados utilizados en procedimientos de monitoreo neurofisiológico intraoperatorio (IONM), esenciales para la evaluación y preservación de la función neurológica durante cirugías de alta complejidad."},
    ]
  },
  { Nombre:"Neuromodulación", id: 3, Id: 3, Path:"neuromodulacion", Descripcion:"Tecnologías terapéuticas no invasivas y de estimulación neurológica que abarcan TMS, tDCS/TES, VNS transcutáneo y terapias cognitivas, enfocadas en el tratamiento de trastornos neurológicos, cognitivos y funcionales con respaldo clínico.", Slug:"neuromodulacion", Image:"Neuromodulacion.jpg",ImageHero:"hero.png",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Terapia cognitiva", Slug: "terapia-cognitiva", id: 4, Equipos:"", image: "terapia-cognitiva.png", Descripcion: "Tecnologías de rehabilitación cognitiva asistida por computadora, diseñadas para apoyar la evaluación y el entrenamiento de funciones cognitivas como memoria, atención y funciones ejecutivas en pacientes con trastornos neurológicos."},
      { AplicacionClinica: "Estimulación transcraneal por corriente directa (tDCS)", Slug: "tdcs", id: 1, Equipos:"", image: "tdcs.png", Descripcion: "Tecnología de neuromodulación no invasiva basada en la aplicación de corriente eléctrica de baja intensidad para modular la excitabilidad cortical, utilizada en protocolos terapéuticos y de investigación clínica." },
      { AplicacionClinica: "Estimulación magnética transcraneal (TMS)", Slug: "tms", id: 2, Equipos:"", image: "tms.png", Descripcion: "Sistema de neuromodulación no invasiva que emplea campos magnéticos para inducir actividad neuronal focalizada, utilizado en el tratamiento de diversos trastornos neurológicos y psiquiátricos bajo protocolos clínicos establecidos."},
      { AplicacionClinica: "Estimulación del nervio vago transcutánea (VNS)", Slug: "vns", id: 3, Equipos:"", image: "vns.png", Descripcion: "Tecnología de neuromodulación no invasiva orientada a la estimulación del nervio vago mediante dispositivos externos, utilizada como apoyo terapéutico en distintos trastornos neurológicos y funcionales" },
      { AplicacionClinica: "Consumibles para neuromodulación", Slug: "consumibles-neuromodulacion", id: 3, Equipos:"", image: "consumibles-neuromodulacion.png", Descripcion: "Consumibles especializados utilizados en terapias de neuromodulación, indispensables para la correcta aplicación de los protocolos de estimulación y el contacto seguro con el paciente." },
    ]
  },
  { Nombre:"Neurovascular", id: 5, Id: 5, Path:"neurovascular", Descripcion:"Equipos para la evaluación hemodinámica cerebral y el diagnóstico vascular, que integran Doppler transcraneal (TCD) y soluciones de monitoreo cerebral, apoyando la detección y seguimiento de patologías neurovasculares.", Slug:"neurovascular", Image:"Neurovascular.jpg", ImageHero:"hero.png",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Doppler transcraneal (TCD)", Slug: "tdc", id: 1, Equipos:"", image: "tdc.png", Descripcion: "Tecnología de ultrasonido no invasiva utilizada para la evaluación del flujo sanguíneo en las principales arterias cerebrales. El Doppler transcraneal permite el análisis hemodinámico cerebral en tiempo real y es una herramienta fundamental en el diagnóstico, monitoreo y seguimiento de patologías neurovasculares." },
      { AplicacionClinica: "Monitoreo cerebral", Slug: "monitoreo-cerebral", id: 2, Equipos:"", image: "monitoreo-cerebral.png", Descripcion: "Plataformas tecnológicas diseñadas para el monitoreo continuo de parámetros cerebrales y fisiológicos, orientadas al seguimiento clínico en entornos hospitalarios y de cuidados críticos. Estas soluciones permiten la evaluación prolongada del estado cerebral como apoyo en la toma de decisiones clínicas y el manejo del paciente neurológico." },
    ]
  },
  { Nombre:"Rehabilitación", id: 4, Id: 4, Path:"rehabilitacion", Descripcion:"Herramientas y equipos para rehabilitación física y neurológica, que incluyen isocinesia, electroterapia, ondas de choque, oscilación profunda, radiofrecuencia, terapias combinadas y ultrasonido diagnóstico, orientados a optimizar procesos terapéuticos y resultados clínicos.", Slug:"rehabilitacion", Image:"Rehabilitacion.jpg", ImageHero:"hero.png",
    CatalogoAplicaciones: [
      { AplicacionClinica: "Electroterapia", Slug: "electroterapia", id: 2, Equipos:"", image: "electroterapia.png", Descripcion: "Tecnologías de estimulación eléctrica utilizadas en procesos de rehabilitación para el alivio del dolor, la activación neuromuscular y la recuperación funcional. La electroterapia es una herramienta fundamental en programas de fisioterapia y rehabilitación física." },
      { AplicacionClinica: "Isocinesia", Slug: "isocinesia", id: 2, Equipos:"", image: "isocinesia.png", Descripcion: "Sistemas de evaluación y rehabilitación isocinética diseñados para medir y entrenar la fuerza muscular de forma controlada, precisa y reproducible. La isocinesia es ampliamente utilizada en rehabilitación deportiva, ortopédica y neurológica." },
      { AplicacionClinica: "Láser de alta potencia", Slug: "laser-alta-potencia", id: 3, Equipos:"", image: "laser-alta-potencia.png", Descripcion: "Tecnología terapéutica basada en la aplicación de láser de alta potencia para el tratamiento del dolor, la inflamación y la regeneración tisular, utilizada como apoyo en protocolos de rehabilitación física." },
      { AplicacionClinica: "Ondas de choque", Slug: "ondas-de-choque", id: 4, Equipos:"", image: "ondas-de-choque.png", Descripcion: "Sistemas de ondas de choque utilizados en rehabilitación para el tratamiento de patologías musculoesqueléticas, favoreciendo la regeneración tisular y la reducción del dolor en lesiones crónicas y agudas." },
      { AplicacionClinica: "Oscilación profunda", Slug: "oscilacion-profunda", id: 5, Equipos:"", image: "oscilacion-profunda.png", Descripcion: "Tecnología terapéutica basada en campos electrostáticos que generan oscilación profunda en los tejidos, utilizada para el manejo del dolor, el edema y la recuperación postoperatoria y postraumática." },
      { AplicacionClinica: "Radiofrecuencia", Slug: "radiofrecuencia", id: 6, Equipos:"", image: "radiofrecuencia.png", Descripcion: "Tecnología de radiofrecuencia aplicada en rehabilitación para el tratamiento del dolor y la estimulación profunda de tejidos, utilizada como apoyo en procesos de recuperación funcional." },
      { AplicacionClinica: "Terapia combinada", Slug: "terapia-combinada", id: 7, Equipos:"", image: "terapia-combinada.png", Descripcion: "Plataformas terapéuticas que integran múltiples modalidades de tratamiento en un solo sistema, permitiendo la aplicación combinada de distintas técnicas de rehabilitación para optimizar los resultados terapéuticos." },
      { AplicacionClinica: "Ultrasonido terapéutico", Slug: "ultrasonido-terapeutico", id: 8, Equipos:"", image: "ultrasonido-terapeutico.png", Descripcion: "Tecnología de ultrasonido utilizada en rehabilitación para el tratamiento de tejidos blandos, favoreciendo la recuperación muscular, la reducción del dolor y la mejora de la movilidad funcional." },
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

// export const BRANDS = [
//   { name: "Ambu", logo: "Ambu.png" },
//   { name: "Astar", logo: "Astar.png" },
//   { name: "Cadwell", logo: "Cadwell.png" },
//   { name: "Deymed", logo: "Deymed.png" },
//   { name: "Electrocap", logo: "Electrocap.png" },
//   { name: "Esaote", logo: "Esaote.png" },
//   { name: "Luciole medical", logo: "Luciole medical.png" },
//   { name: "Hasomed", logo: "Hasomed - Logotipo.png" },
//   { name: "NE Neuroelectrics", logo: "NE.png" },
//   { name: "Physiomed", logo: "Physiomed.png" },
//   { name: "Rimed", logo: "Rimed.png" },
//   { name: "Hasomed Rehacom", logo: "Rehacom.png" },
//   { name: "Samsung Medison", logo: "Samsung Medison.png" },
//   { name: "Spes medica", logo: "spes.png" },
//   { name: "Spine Guard", logo: "Spine Guard - logotipo.png" },
//   { name: "Syneika", logo: "Syneika - Logotipo.png" },
//   { name: "tVNS", logo: "tVNS Health - Logotipo.png" },
//   { name: "Weaver", logo: "Weaver.png" }, 
// ];


export const BRANDS = [
  {
    name: "Ambu",
    logo: "Ambu.png",
    bgColor: "bg-[#FCE7EB]",
    textColor: "text-[#006764]",
    title: "Líder global en soluciones médicas de emergencia y monitoreo de pacientes.",
    description: "Ambu desarrolla tecnología innovadora para diagnóstico cardiorrespiratorio, anestesia y manejo de la vía aérea, garantizando seguridad, precisión y eficiencia en cada procedimiento. Su compromiso con la calidad y la innovación ha consolidado a Ambu como referente mundial en el cuidado clínico y hospitalario.",
    categories: [
      {
        title: "Diagnóstico cardiorrespiratorio",
        description: "Equipos para espirometría, pruebas de esfuerzo y monitoreo de la función pulmonar."
      },
      {
        title: "Manejo de la vía aérea",
        description: "Sistemas avanzados para la medición de signos vitales con soluciones portátiles e inalámbricas."
      },
      {
        title: "Educación y soporte clínico",
        description: "Programas de capacitación y acompañamiento técnico para profesionales de la salud."
      }
    ]
  },
  {
    name: "Astar",
    logo: "Astar.png",
    bgColor: "bg-[#0A478C0D]",
    textColor: "text-[#006764]",
    title: " Innovación en rehabilitación, fisioterapia y medicina física.",
    description: "Astar es una marca europea especializada en el desarrollo de equipos médicos para terapia láser, ultrasonido, magnetoterapia y electroterapia. Su tecnología combina precisión, seguridad y eficacia clínica, ofreciendo soluciones avanzadas para la recuperación funcional de los pacientes. Con presencia internacional, Astar se ha consolidado como un referente en rehabilitación y fisioterapia, impulsando la evolución del tratamiento terapéutico en hospitales y clínicas.",
    categories: [
      {
        title: "Terapia láser",
        description: "Dispositivos diseñados para acelerar la recuperación muscular y articular."
      },
      {
        title: "Ultrasonido terapéutico",
        description: "Sistemas de campo electromagnético de baja frecuencia para tratamientos de rehabilitación profunda."
      },
      {
        title: "Electroterapia",
        description: "Tecnología avanzada para control del dolor, estimulación neuromuscular y fortalecimiento."
      }
    ]
  },
  {
    name: "Cadwell",
    logo: "Cadwell.png",
    bgColor: "bg-[#213F950D]",
    textColor: "text-[#0066CC]",
    title: "Excelencia en neurodiagnóstico y monitoreo intraoperatorio.",
    description: "Cadwell es una compañía líder en el desarrollo de sistemas para neurofisiología clínica, electromiografía, electroencefalografía y potenciales evocados. Su tecnología permite obtener datos precisos y confiables que facilitan diagnósticos neurológicos avanzados y apoyo intraoperatorio en tiempo real. Con décadas de experiencia, Cadwell impulsa el progreso del neurodiagnóstico a través de soluciones que integran innovación, facilidad de uso y soporte técnico especializado.",
    categories: [
      {
        title: "Neurofisiología clínica",
        description: "Equipos diseñados para el estudio de la función cerebral, nerviosa y muscular."
      },
      {
        title: "Monitoreo intraoperatorio",
        description: "Soluciones que permiten registrar la actividad neurológica durante procedimientos quirúrgicos, garantizando seguridad y precisión."
      },
      {
        title: "Electromiografía (EMG)",
        description: "Sistemas para diagnóstico de trastornos neuromusculares mediante la medición de la actividad eléctrica del músculo."
      },
      {
        title: "Electroencefalografía (EEG)",
        description: "Equipos avanzados para el registro y análisis de la actividad cerebral en entornos clínicos y hospitalarios."
      }
    ]
  },
  {
    name: "Deymed",
    logo: "Deymed.png",
    bgColor: "bg-[#2181AC0D]",
    textColor: "text-[#0077CC]",
    title: "Tecnología de precisión para neurodiagnóstico y estimulación magnética.",
    description: "Deymed Diagnostic desarrolla equipos médicos de alta especialización para neurofisiología, estimulación magnética transcraneal (TMS), potenciales evocados y electromiografía (EMG). Su enfoque en innovación, precisión digital y eficiencia energética redefine la calidad del diagnóstico neurológico moderno. Con presencia internacional y un compromiso constante con la investigación, Deymed se ha consolidado como un aliado confiable para hospitales, clínicas y centros de investigación en neurociencia.",
    categories: [
      {
        title: "Electromiografía (EMG)",
        description: "Equipos compactos y de alta sensibilidad para el estudio de la actividad muscular y nerviosa."
      },
      {
        title: "Estimulación magnética transcraneal (TMS)",
        description: "Dispositivos de última generación para investigación y tratamiento en neuroestimulación no invasiva."
      },
      {
        title: "Potenciales evocados",
        description: "Sistemas digitales para la medición precisa de respuestas neurológicas a estímulos sensoriales y motores."
      },
      {
        title: "Monitoreo neurofisiológico",
        description: "Dispositivos de última generación para investigación y tratamiento en neuroestimulación no invasiva."
      }
    ]
  },
  {
    name: "NE Neuroelectrics",
    logo: "NE.png",
    bgColor: "bg-[#9493930D]",
    textColor: "text-[#6633CC]",
    title: "Neurotecnología avanzada para estimulación cerebral y monitoreo cognitivo.",
    description: "Neuroelectrics es una compañía pionera en el desarrollo de soluciones para estimulación cerebral no invasiva (tDCS/tACS) y electroencefalografía (EEG) inalámbrica, diseñadas para investigación clínica y neurorehabilitación. Su tecnología combina neurociencia, ingeniería y conectividad inteligente, permitiendo registrar y modular la actividad cerebral con una precisión sin precedentes. Con presencia global, Neuroelectrics impulsa la innovación en el cuidado neurológico mediante plataformas que integran hardware, software y análisis de datos en tiempo real.",
    categories: [
      {
        title: "Electroencefalografía inalámbrica (EEG)",
        description: "Sistemas portátiles de alta resolución para registro y monitoreo cerebral en entornos clínicos y de investigación."
      },
      {
        title: "Estimulación cerebral no invasiva (tDCS / tACS)",
        description: "Dispositivos diseñados para terapias neuromoduladoras que promueven la recuperación cognitiva y motora."
      },
      {
        title: "Neurorehabilitación digital",
        description: "Soluciones que combinan neuroestimulación y biofeedback para optimizar el tratamiento de pacientes con trastornos neurológicos."
      },
      {
        title: "Investigación clínica y cognitiva",
        description: "Plataformas integradas para proyectos de neurociencia aplicada, educación médica y estudios de estimulación cerebral."
      }
    ]
  },
  {
    name: "Esaote",
    logo: "Esaote.png",
    bgColor: "bg-[#A823220D]",
    textColor: "text-[#B60D45]",
    title: "Excelencia en imagenología médica y diagnóstico por ultrasonido.",
    description:"Esaote es un referente mundial en ultrasonido, resonancia magnética y software de diagnóstico médico, reconocido por su innovación, calidad de imagen y fiabilidad clínica. Sus soluciones están diseñadas para ofrecer precisión diagnóstica en múltiples especialidades, desde cardiología y radiología hasta rehabilitación y medicina deportiva.",
    categories: [
      {
        title: "Ultrasonido diagnóstico",
        description: "Sistemas portátiles y de alta resolución diseñados para aplicaciones cardiovasculares, musculoesqueléticas y generales."
      },
      {
        title: "Resonancia magnética (MRI)",
        description: "Equipos compactos dedicados, optimizados para obtener imágenes precisas con menor consumo energético y máxima comodidad del paciente."
      },
      {
        title: "Software médico y análisis de imagen",
        description: "Herramientas avanzadas para la interpretación, almacenamiento y gestión de estudios clínicos."
      },
      {
        title: "Aplicaciones clínicas especializadas",
        description: "Soluciones para cardiología, radiología, ortopedia, rehabilitación y medicina del deporte."
      }
    ]
  },
  {
    name: "Luciole medical",
    logo: "Luciole medical.png",
    bgColor: "bg-[#C8D3000D]",
    textColor: "text-[#CC3366]",
    title: "Neurotecnología portátil para neuromodulación y estimulación clínica",
    description:"Luciole Medical es una empresa europea especializada en el desarrollo de soluciones compactas y portátiles para neuromodulación no invasiva. Su enfoque se centra en acercar tecnologías de estimulación nerviosa seguras y accesibles a entornos clínicos, de investigación y atención ambulatoria. Sus dispositivos destacan por su diseño ergonómico, facilidad de uso y compatibilidad con protocolos clínicos modernos, permitiendo a los profesionales integrar terapias neuromoduladoras en distintos escenarios de atención neurológica.",
    categories: [
      {
        title: "Neuromodulación no invasiva",
        description: "Dispositivos diseñados para estimulación nerviosa periférica y terapias neuromoduladoras controladas."
      },
      {
        title: "Aplicaciones clínicas y ambulatorias",
        description: "Soluciones portátiles adaptadas a consultorios, hospitales y programas de rehabilitación neurológica."
      },
      {
        title: "Diseño clínico y ergonomía",
        description: "Equipos compactos pensados para uso continuo, seguro y confortable para el paciente."
      },
      {
        title: "Soporte terapéutico especializado",
        description: "Tecnología alineada con protocolos clínicos y programas de seguimiento médico."
      }
    ]
  },
  {
    name: "Physiomed",
    logo: "Physiomed.png",
    bgColor: "bg-[#58585A0D]",
    textColor: "text-[#CC6600]",
    title: "Tecnología médica avanzada para terapia y rehabilitación física.",
    description:"Physiomed es una empresa alemana líder en el desarrollo de equipos para fisioterapia, rehabilitación y medicina deportiva, reconocida por su compromiso con la innovación, la precisión y la eficacia terapéutica. Sus soluciones abarcan desde electroterapia y ultrasonido terapéutico hasta magnetoterapia y termoterapia, diseñadas para optimizar la recuperación funcional y mejorar la calidad de vida de los pacientes. Con presencia global, Physiomed combina ingeniería médica de alto rendimiento con un enfoque clínico orientado a resultados.",
    categories: [
      {
        title: "Electroterapia",
        description: "Dispositivos de estimulación neuromuscular y analgesia, adaptados a distintas fases de la rehabilitación."
      },
      {
        title: "Ultrasonido terapéutico",
        description: "Equipos precisos para tratamientos musculoesqueléticos y regeneración tisular."
      },
      {
        title: "Magnetoterapia y termoterapia",
        description: "Soluciones que combinan calor, energía magnética y tecnología controlada para acelerar procesos de recuperación."
      },
      {
        title: "Rehabilitación deportiva",
        description: "Equipos diseñados para la readaptación funcional y el fortalecimiento físico de alto rendimiento."
      }
    ]
  },
  {
    name: "Rimed",
    logo: "Rimed.png",
    bgColor: "bg-[#85AC2B0D]",
    textColor: "text-[#0099CC]",
    title: "Confiabilidad y precisión en monitoreo y diagnóstico médico.",
    description: "RIDEM desarrolla soluciones tecnológicas diseñadas para ofrecer seguridad, precisión y tranquilidad en entornos clínicos y hospitalarios. Sus equipos abarcan desde monitores multiparámetro y dispositivos de diagnóstico vital, hasta sistemas de seguimiento y registro de signos que garantizan una atención continua y eficiente.",
    categories: [
      {
        title: "Monitoreo clínico",
        description: "Dispositivos multiparámetro de alta precisión para el control de signos vitales en tiempo real."
      },
      {
        title: "Diagnóstico hospitalario",
        description: "Equipos diseñados para optimizar la detección y seguimiento de condiciones críticas."
      },
      {
        title: "Tecnología segura y confiable",
        description: "Sistemas con protocolos internacionales de calidad y diseño ergonómico para uso continuo."
      },
      {
        title: "Soporte y mantenimiento",
        description: "Asistencia técnica especializada que asegura el funcionamiento óptimo en cada instalación."
      }
    ]
  },
  {
    name: "Electrocap",
    logo: "Electrocap.png",
    bgColor: "bg-[#F5FAF9]",
    textColor: "text-[#0099CC]",
    title: "Precisión, comodidad y calidad en el registro EEG.",
    description: "Electro-Cap es una marca reconocida mundialmente por la fabricación de gorras y accesorios para electroencefalografía (EEG), diseñadas para ofrecer mediciones neurológicas precisas y confort duradero durante los estudios clínicos y de investigación. Sus sistemas se adaptan a diferentes configuraciones y necesidades, garantizando contacto uniforme, estabilidad eléctrica y compatibilidad con los principales equipos de neurodiagnóstico del mercado.",
    categories: [
      {
        title: "Gorras EEG",
        description: "Diseños ergonómicos y reutilizables para estudios prolongados y alta resolución de señal."
      },
      {
        title: "Accesorios y electrodos",
        description: "Componentes de precisión que garantizan conectividad estable y lecturas consistentes."
      },
      {
        title: "Compatibilidad universal",
        description: "Adaptables a múltiples sistemas de registro y monitoreo neurológico."
      },
      {
        title: "Investigación y docencia",
        description: "Soluciones prácticas para laboratorios, universidades y hospitales especializados."
      }
    ]
  },
  {
    name: "Hasomed Rehacom",
    logo: "Rehacom.png",
    bgColor: "bg-[#86AC270D]",
    textColor: "text-[#00AA66]",
    title: "Neurotecnología para la rehabilitación cognitiva y funcional.",
    description: "Hasomed, con su sistema RehaCom, es líder mundial en rehabilitación cognitiva asistida por computadora, ofreciendo soluciones diseñadas para restaurar funciones mentales afectadas por lesiones cerebrales, accidentes vasculares o trastornos neurológicos. Su plataforma combina software clínico, neurociencia aplicada y entrenamiento personalizado, permitiendo al profesional adaptar cada programa a las necesidades individuales del paciente. Con décadas de respaldo científico, Hasomed – RehaCom redefine la forma en que se aborda la recuperación cognitiva en hospitales, clínicas y centros de neurorehabilitación.",
    categories: [
      {
        title: "Rehabilitación cognitiva asistida",
        description: "Programas terapéuticos interactivos para atención, memoria, percepción y funciones ejecutivas."
      },
      {
        title: "Neurociencia aplicada",
        description: "Protocolos basados en evidencia científica para la evaluación y el entrenamiento cognitivo."
      },
      {
        title: "Integración con equipos clínicos",
        description: "Compatibilidad con sistemas de neurodiagnóstico y plataformas de seguimiento de progreso."
      },
      {
        title: "Soporte y capacitación",
        description: "Asistencia técnica y entrenamiento para profesionales en neuropsicología y terapia ocupacional."
      }
    ]
  },
  {
    name: "Weaver",
    logo: "Weaver.png",
    bgColor: "bg-[#00456A0D]",
    textColor: "text-[#009900]",
    title: "Calidad y precisión en materiales para neurodiagnóstico.",
    description:"Weaver and Company es un fabricante líder en pastes, geles y consumibles conductivos utilizados en electroencefalografía (EEG), electromiografía (EMG) y polisomnografía (PSG). Sus productos garantizan una excelente conductividad, estabilidad eléctrica y confort para el paciente, optimizando la calidad de las señales y la fiabilidad de los registros neurológicos. Con más de 40 años de experiencia, Weaver and Company se ha consolidado como un aliado esencial para profesionales e instituciones dedicadas al neurodiagnóstico clínico.",
    categories: [
      {
        title: "Pastes y geles conductivos",
        description: "Formulados para asegurar una transmisión eléctrica óptima y minimizar el ruido de señal."
      },
      {
        title: "Consumibles para EEG, EMG y PSG",
        description: "Accesorios clínicos de precisión diseñados para estudios neurológicos y del sueño."
      },
      {
        title: "Compatibilidad universal",
        description: "Productos adaptables a distintos sistemas y protocolos de registro neurofisiológico."
      },
      {
        title: "Confianza profesional",
        description: "Certificaciones internacionales y estándares de calidad médica reconocidos globalmente."
      }
    ]
  },
  {
    name: "Hasomed",
    logo: "Hasomed - Logotipo.png",
    bgColor: "bg-[#F08A000D]",
    textColor: "text-[#00AA66]",
    title: "Rehabilitación cognitiva asistida por computadora basada en evidencia científica",
    description: "Hasomed es un referente internacional en rehabilitación cognitiva digital a través de su plataforma RehaCom. Sus soluciones están diseñadas para la evaluación, entrenamiento y recuperación de funciones cognitivas afectadas por daño neurológico, eventos cerebrovasculares o trastornos neurodegenerativos. La plataforma combina neurociencia aplicada, software clínico y protocolos personalizables que permiten al especialista adaptar cada tratamiento a las necesidades específicas del paciente.",
    categories: [
      {
        title: "Rehabilitación cognitiva asistida",
        description: "Programas terapéuticos interactivos para atención, memoria, percepción y funciones ejecutivas."
      },
      {
        title: "Evaluación y seguimiento clínico",
        description: "Herramientas digitales para medir progreso terapéutico y resultados funcionales."
      },
      {
        title: "Neurociencia aplicada",
        description: "Protocolos respaldados por evidencia científica y validación clínica internacional."
      },
      {
        title: "Integración en entornos clínicos",
        description: "Soluciones compatibles con hospitales, clínicas y centros de neurorehabilitación."
      }
    ]
  },
  {
    name: "Samsung Medison",
    logo: "Samsung Medison.png",
    bgColor: "bg-[#0044940D]",
    textColor: "text-[#0047BB]",
    title: "Innovación global en ultrasonido médico de alta precisión",
    description:"Samsung Medison es un líder mundial en soluciones de ultrasonido diagnóstico, reconocido por integrar tecnología de imagen avanzada, inteligencia artificial y diseño ergonómico. Sus sistemas están desarrollados para ofrecer precisión diagnóstica en múltiples especialidades médicas, con especial fortaleza en salud de la mujer, radiología y atención clínica general. Con presencia global y constante inversión en I+D, Samsung Medison redefine los estándares de calidad en imagenología médica.",
    categories: [
      {
        title: "Ultrasonido para salud de la mujer",
        description: "Sistemas avanzados para ginecología, obstetricia y diagnóstico materno-fetal."
      },
      {
        title: "Imagenología general y especializada",
        description: "Equipos diseñados para radiología, cardiología y aplicaciones clínicas diversas."
      },
      {
        title: "Tecnología con inteligencia artificial",
        description: "Herramientas de medición automática y apoyo diagnóstico."
      },
      {
        title: "Diseño ergonómico y flujo de trabajo eficiente",
        description: "Soluciones pensadas para optimizar la práctica médica diaria."
      }
    ]
  },
  {
    name: "Spes medica",
    logo: "spes.png",
    bgColor: "bg-[#119F880D]",
    textColor: "text-[#6666CC]",
    title: "Consumibles y accesorios de alta precisión para neurodiagnóstico",
    description:"Spes Medica es un fabricante especializado en consumibles médicos para neurofisiología, reconocido por la calidad y fiabilidad de sus productos en estudios EEG, EMG y PSG. Sus soluciones están diseñadas para garantizar estabilidad eléctrica, confort del paciente y señales neurológicas limpias y reproducibles. Con presencia internacional, Spes Medica es un aliado clave para laboratorios, hospitales y centros de diagnóstico neurológico.",
    categories: [
      {
        title: "Electrodos EEG, EMG y PSG",
        description: "Consumibles diseñados para obtener señales precisas y estables."
      },
      {
        title: "Accesorios para neurofisiología",
        description: "Componentes compatibles con los principales sistemas de registro del mercado."
      },
      {
        title: "Calidad clínica certificada",
        description: "Productos fabricados bajo estándares internacionales para uso médico."
      },
      {
        title: "Optimización del diagnóstico",
        description: "Soluciones enfocadas en mejorar la calidad del registro neurofisiológico."
      }
    ]
  },
  {
    name: "Spine Guard",
    logo: "Spine Guard - logotipo.png",
    bgColor: "bg-[#0281920D]",
    textColor: "text-[#3366CC]",
    title: "Tecnología de navegación dinámica para cirugía de columna más segura y precisa",
    description:"SpineGuard es una empresa especializada en soluciones de guía quirúrgica en tiempo real para procedimientos de columna. Su tecnología se basa en sistemas de detección dinámica que permiten al cirujano identificar la correcta trayectoria ósea durante la instrumentación, reduciendo riesgos y aumentando la seguridad intraoperatoria. Sus soluciones están diseñadas para integrarse de forma natural en el flujo quirúrgico, proporcionando retroalimentación inmediata sin interrumpir el procedimiento ni depender de navegación óptica compleja.",
    categories: [
      {
        title: "Guía dinámica para cirugía de columna",
        description: "Sistemas diseñados para asistir la colocación segura de tornillos pediculares mediante retroalimentación en tiempo real."
      },
      {
        title: "Seguridad intraoperatoria",
        description: "Tecnología que ayuda a reducir el riesgo de perforaciones corticales y complicaciones neurológicas."
      },
      {
        title: "Integración en quirófano",
        description: "Soluciones compatibles con flujos quirúrgicos estándar sin necesidad de infraestructura adicional compleja."
      },
      {
        title: "Aplicaciones en cirugía espinal",
        description: "Herramientas utilizadas en procedimientos de columna abiertos y mínimamente invasivos."
      }
    ]
  },
  {
    name: "Syneika",
    logo: "Syneika - Logotipo.png",
    bgColor: "bg-[#F5F5FF]",
    textColor: "text-[#333399]",
    title: "Navegación quirúrgica avanzada para neurocirugía de alta precisión",
    description:"Syneika desarrolla sistemas de neuronavegación diseñados para mejorar la precisión, seguridad y planificación en procedimientos neuroquirúrgicos. Su tecnología permite una localización anatómica exacta en tiempo real, apoyando la toma de decisiones durante cirugías complejas. Los sistemas Syneika integran software avanzado, visualización tridimensional y flujos de trabajo optimizados para quirófano.",
    categories: [
      {
        title: "Neuronavegación quirúrgica",
        description: "Sistemas diseñados para guiar procedimientos neuroquirúrgicos con alta exactitud."
      },
      {
        title: "Planificación preoperatoria",
        description: "Herramientas de visualización y análisis anatómico en 3D."
      },
      {
        title: "Soporte intraoperatorio",
        description: "Navegación en tiempo real para mayor seguridad durante la intervención."
      },
      {
        title: "Integración clínica",
        description: "Compatibilidad con flujos quirúrgicos y tecnologías hospitalarias existentes."
      }
    ]
  },
  {
    name: "tVNS",
    logo: "tVNS Health - Logotipo.png",
    bgColor: "bg-[#FFFFFF]",
    textColor: "text-[#CC0000]",
    title: "Estimulación vagal transcutánea para neuromodulación no invasiva",
    description:"tVNS es una marca especializada en soluciones de estimulación del nervio vago de forma no invasiva. Sus dispositivos están diseñados para aplicaciones terapéuticas y de investigación en neuromodulación, ofreciendo una alternativa segura y controlada a los sistemas implantables. La tecnología tVNS permite implementar protocolos de estimulación en entornos clínicos y ambulatorios, con enfoque en seguridad, facilidad de uso y seguimiento terapéutico.",
    categories: [
      {
        title: "Estimulación vagal transcutánea",
        description: "Dispositivos diseñados para neuromodulación no invasiva."
      },
      {
        title: "Aplicaciones clínicas y de investigación",
        description: "Soluciones utilizadas en neurología, rehabilitación y estudios clínicos."
      },
      {
        title: "Diseño seguro y controlado",
        description: "Tecnología enfocada en la comodidad del paciente y la reproducibilidad terapéutica."
      },
      {
        title: "Protocolos neuromoduladores",
        description: "Equipos compatibles con programas clínicos estructurados."
      }
    ]
  },
];