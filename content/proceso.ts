// /proceso — Los siete pasos los pidió Lautaro en el brief; el Documento Maestro no describe el
// proceso. Cada paso lleva SÓLO la frase del PDF que le corresponde, o ninguna.
// TODO: validar con Gerardo — orden, plazos y contenido de cada paso.

export const portada = {
  antetitulo: "Proceso",
  titulo: "Cómo convertirte en socio",
  alt: "Fachada de una sucursal Fosque encendida de noche en una calle comercial",
};

export const pasos: { titulo: string; texto?: string }[] = [
  {
    titulo: "Aplicación y calificación",
    texto: "Formulario de calificación: nombre, WhatsApp, ciudad o país de interés, perfil y capital estimado disponible.",
  },
  { titulo: "Reunión estratégica" },
  {
    titulo: "Selección de ubicación",
    texto: "Locales a la calle en zonas de alta densidad socioeconómica (150 m² a 350 m²), con fachada de gran altura, luz natural y contratos a largo plazo (10 años).",
  },
  {
    titulo: "Firma y canon",
    texto: "Canon de ingreso: USD 1.500 por Reformer instalado. Cubre derecho de marca, know-how, onboarding del ecosistema y setup del software.",
  },
  {
    titulo: "Obra e importación de equipamiento",
    texto: "Manual de Arquitectura & Estudio: layouts óptimos, planos de instalación, renders 3D y especificaciones de iluminación y acústica. Equipamiento por importación directa de fábrica.",
  },
  {
    titulo: "Formación en Fosque Academy",
    texto: "Programa CANE (Capacitación, Actualización, Nivelación y Entrenamiento), manuales del instructor y pedagogía de los 4 Niveles.",
  },
  {
    titulo: "Pre-apertura y lanzamiento",
    texto: "Estrategia de pre-apertura local, retención de membresías, pauta digital y campañas de comunicación.",
  },
];
