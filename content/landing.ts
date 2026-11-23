// TODO el copy de la landing. Sale del boceto de Gerardo (Google Sites, 22-nov-2026, copia en
// material-22-nov/boceto/) y del "Documento Maestro B2B, versión definitiva 18-nov-2026".
// Regla: los textos van como los escribió él (incluido el tuteo). Sólo se unificó la forma de
// escribir los montos ("USD 125.000") y se corrigieron erratas.
//
// Lo marcado DUDA está en material-22-nov/DUDAS.md para charlarlo con él.

export const hero = {
  etiqueta: "Etapa 1: Argentina & Uruguay · Primeros 30 Inversores Operadores Socios",
  // El titular de Gerardo, entero y en su orden, partido en tres para darle jerarquía:
  // [0] la entrada (chica, gris), [1] el tramo en color, [2] el resto (grande).
  titulo: ["Invierte en la evolución del Pilates Moderno:", "Salas de 15 a 25 Reformers,", " CAPEX al costo operativo y un modelo asociativo sin rotación."],
  bajada:
    "Impulsado por el Método Gerardo Fosque para brindar una experiencia boutique inmersiva y resultados físicos, energéticos y emocionales en grupos amplios. Retorno estimado de 18 a 24 meses en Argentina y Uruguay.",
  cta: "Solicitar Dossier Financiero y Territorios",
  ctaSecundario: "Explorar Salón & Simulador",
  alt: "En la sala del sol, con una clase en marcha, el fundador les muestra el estudio a dos nuevos socios; alumnos de distintas edades se ríen sobre los Reformers y una instructora guía la clase",
};

export const ecuacion = {
  antetitulo: "Estándar internacional",
  titulo: "Ecuación Financiera Fosque",
  sello: "7% + 1%",
  filas: [
    { nombre: "Canon de Ingreso (Smart Scale)", valor: "USD 1.500 / Reformer" },
    { nombre: "Capacidad por Sala (ABC1)", valor: "15 a 25 Reformers" },
    { nombre: "Punto de Equilibrio (Break-even)", valor: "Mes 3 a Mes 5" },
    { nombre: "Co-propiedad Staff Líder", valor: "Hasta 35% Equity" },
  ],
  pie: "Importación directa de fábrica",
  enlace: "Ver comparativa global",
};

export const cifras = [
  { valor: "USD 125K – 250K", etiqueta: "Inversión total llave en mano", texto: "CAPEX al costo operativo importado directo de fábrica." },
  { valor: "18 – 24 meses", etiqueta: "ROI estimado", texto: "Break-even acelerado entre el mes 3 y el mes 5." },
  // DUDA: acá dice +50% a +80% y la comparativa dice +40% a +65%.
  { valor: "15 a 25", etiqueta: "Reformers por sala", texto: "+50% a +80% más facturación/hora que un estudio tradicional." },
  { valor: "Hasta 35%", etiqueta: "Co-propiedad staff", texto: "Coordinadora e instructores socios: cero rotación." },
];

export const metodo = {
  antetitulo: "El motor de rentabilidad",
  titulo: "Ingeniería del Movimiento: Cómo el Método Gerardo Fosque multiplica la rentabilidad de cada clase.",
  parrafos: [
    // DUDA: el documento dice "6 u 8 alumnos"; el boceto, "6 a 10".
    "En los estudios tradicionales, las clases se limitan a 6 a 10 alumnos porque el método clásico requiere correcciones constantes e improvisación del instructor. Gerardo Fosque resolvió este cuello de botella creando el Método Fosque y el Pilates Moderno, diseñados específicamente para escalar la excelencia.",
    "Mediante planificaciones coreográficas estructuradas en 4 Niveles de progresión, esto permite que de 15 a 25 alumnos en simultáneo vivan una clase dinámica, segura, divertida y de eficacia física, mejora energética y emocional, percibiendo atención personalizada y resultados visibles desde las primeras semanas.",
  ],
  impactos: [
    {
      titulo: "Facturación Superior por Hora (+50% a +80%)",
      texto: "Una sola clase genera entre un 50% y un 80% más de ingresos que un estudio boutique convencional con exactamente el mismo costo fijo de sala e instructor.",
    },
    {
      titulo: "Calidad Estandarizada sin Dependencia de “Profesores Estrella”",
      texto: "Al contar con una metodología clara y ciclos planificados, cualquier instructor certificado en la Academia Fosque replica exactamente la misma experiencia de primer nivel.",
    },
    {
      titulo: "Retención Excepcional y Lifetime Value (LTV)",
      texto: "Los resultados físicos concretos y el disfrute integral de cada sesión disparan la renovación automática de membresías y el crecimiento orgánico por recomendación.",
    },
  ],
  // Una foto vertical por paso del relato (components/landing/Metodo.tsx): introducción + 3 impactos
  alts: [
    "Clase llena en la sala del sol, con alumnos de todas las edades en sincronía; en primer plano, la instructora corrige a una alumna de pelo canoso y las dos se ríen",
    "La sala completa vista desde arriba: todos los Reformers ocupados por gente de distintas edades y una sola instructora guiando al grupo desde el pasillo central",
    "Tres instructores de distintas edades sobre sus Reformers en la misma posición exacta, junto a una formadora de pelo plateado que los observa con una tablet",
    "Cinco alumnos de entre 30 y 65 años salen riéndose por el corredor de arcos; al fondo, la instructora los despide con la mano",
  ],
};

// DUDA: las descripciones de los niveles las escribió la IA del boceto; el Documento Maestro
// sólo los nombra (Inicia, Activa, Avanzada, Master).
export const niveles = {
  antetitulo: "Coreografía de experiencia",
  titulo: "Progresión en 4 Niveles",
  ayuda: "Explora cada nivel",
  lista: [
    {
      boton: "Nivel 1 · Inicia",
      etiqueta: "Nivel 01 · Base & Conciencia",
      titulo: "Inicia — Adaptación & Biomecánica Base",
      texto: "Diseñado para recibir a alumnos nuevos sin experiencia previa en Reformer. Introduce la respiración consciente, la alineación postural y el control básico del carro con transiciones seguras y amables.",
      impacto: "Elimina la barrera de entrada y convierte al público general en socios recurrentes desde la primera sesión.",
    },
    {
      boton: "Nivel 2 · Activa",
      etiqueta: "Nivel 02 · Dinamismo & Tono",
      titulo: "Activa — Fuerza, Ritmo & Energía",
      texto: "Incrementa la cadencia y la resistencia de resortes. Combina fluidez cardiovascular de bajo impacto con trabajo muscular profundo para transformar la energía física, energética y emocional.",
      impacto: "Consolida el hábito semanal (3 a 4 visitas por semana) y dispara la adherencia mensual.",
    },
    {
      boton: "Nivel 3 · Avanzada",
      etiqueta: "Nivel 03 · Potencia & Fluidez",
      titulo: "Avanzada — Desafío Técnico Integral",
      texto: "Secuencias coreográficas continuas de alta precisión biomecánica, estabilidad de core avanzada y control excéntrico completo en los 15 a 25 Reformers en simultáneo.",
      impacto: "Fideliza al público exigente del fitness boutique y genera recomendación orgánica (boca a boca).",
    },
    {
      boton: "Nivel 4 · Master",
      etiqueta: "Nivel 04 · Fosque Signature",
      titulo: "Master — Máxima Expresión de Rendimiento",
      texto: "La experiencia cumbre del Método Gerardo Fosque. Fusión total entre fuerza atlética, presencia oriental y control absoluto del movimiento.",
      impacto: "Eleva el prestigio de marca y extiende el Lifetime Value (LTV) del socio por más de 18 meses.",
    },
  ],
  pie: ["Precisión Biomecánica Occidental + Presencia Oriental", "LTV Promedio > 18 Meses"],
};

// DUDA: cifras de terceros publicadas con nombre. Confirmar con Francorp.
export const comparativa = {
  antetitulo: "Benchmark global de franquicias",
  titulo: "Las Mejores Franquicias de Pilates del Mundo vs. Fosque Reformer",
  bajada: "Compara nuestro modelo de inversión al costo operativo, mayor capacidad por sala y co-propiedad frente a los líderes globales de EE. UU. y Australia.",
  ayudaMovil: "Desliza la tabla",
  columnas: [
    { nombre: "Club Pilates", origen: "EE. UU. / Global" },
    { nombre: "JETSET Pilates", origen: "EE. UU. / Lujo" },
    { nombre: "STRONG Pilates", origen: "Australia / Global" },
  ],
  propia: { nombre: "Fosque Reformer", origen: "LATAM / Nuevo modelo" },
  filas: [
    {
      variable: "Escala y Método",
      otras: ["+1.300 estudios. Masivo, accesible (“Pilates para todos”), 4 niveles estándar.", "Lujo moderno, alta tensión, estética editorial, música de DJ.", "Híbrido (Reformer + Remo/Bici), alta intensidad, tecnología en pantalla."],
      fosque: ["Método Gerardo Fosque:", " Pilates Moderno escalable + Ecosistema Asociativo boutique."],
    },
    {
      variable: "Capacidad por Sala",
      otras: ["12 a 15 Reformers", "12 a 16 Reformers", "14 a 18 máquinas"],
      fosque: ["15 a 25 Reformers", " (+40% a +65% más facturación potencial por hora)."],
    },
    {
      variable: "Inversión Total (CAPEX)",
      otras: ["USD 250.000 – 450.000+", "USD 525.540 – 749.575", "AUD 250.000 – 350.000+"],
      fosque: ["USD 125.000 – 250.000", " (Importación directa de fábrica, sin intermediarios)."],
    },
    {
      variable: "Canon de Ingreso (Fee)",
      otras: ["USD 60.000 fijo", "USD 60.000 – 75.000 fijo", "AUD 50.000 – 65.000 fijo"],
      fosque: ["Modular (Smart Scale): USD 1.500 / Reformer", " (USD 22.500 a 37.500)."],
    },
    {
      variable: "Royalty + Marketing",
      otras: ["8% Royalty + 2% Marketing (10% total)", "7% - 8% Royalty + 2% Marketing (9% - 10% total)", "7% - 8% Royalty + 2% Marketing (9% - 10% total)"],
      fosque: ["7% Royalty + 1% Fondo Marketing (8% total)", " · La carga más liviana."],
    },
    {
      variable: "Break-even / ROI",
      otras: ["Break-even: Mes 6-9. ROI: 30 a 42 meses", "Break-even: Mes 6-10. ROI: 30 a 48 meses", "Break-even: Mes 4-7. ROI: 24 a 36 meses"],
      fosque: ["Break-even: Mes 3-5. ROI: 18 a 24 meses", ""],
    },
    {
      variable: "Gestión de Personal",
      otras: ["Empleados tradicionales (alta rotación de instructores).", "Empleados tradicionales + Gerente General.", "Empleados tradicionales + pantallas guía."],
      fosque: ["Co-Propiedad (hasta 35% equity)", " para el equipo. Cero rotación, mentalidad de dueño."],
    },
  ],
};

export const salon = {
  antetitulo: "Arquitectura boutique & experiencia sensorial",
  titulo: "El Salón Fosque Reformer: Diseño Editorial de Alta Rentabilidad",
  // DUDA: el boceto dice "madera natural, piedra"; se muestra la sala real de los renders.
  bajada: "Espacios de 150 a 250 m² con iluminación lineal cálida, madera natural, piedra y 15 a 25 camas Reformer Fosque en simetría perfecta, donde las alumnas experimentan el Método Gerardo Fosque en armonía.",
  etiquetas: ["Iluminación Cálida & Acústica Envolvente", "15 a 25 Reformers al costo de fábrica"],
  pieFoto: "Simetría de 15 a 25 Reformers Fosque importados directo de fábrica · Experiencia inmersiva sincronizada.",
  sello: "150 a 250 m² ABC1",
  alt: "Clase en plena coreografía en la sala del sol: dos filas de alumnos acostados en los Reformers con las piernas extendidas al mismo ángulo, y la instructora marcando el ritmo desde el pasillo",
  altReformer: "El Reformer Fosque negro en primer plano, en la sala del sol, con la fila de Reformers y el mural de palmas desenfocados detrás",
};

export const ventajas = [
  { titulo: "Método Gerardo Fosque", texto: "Escala de 6 a 25 alumnos por clase manteniendo eficacia física, energética y emocional." },
  { titulo: "CAPEX al Costo Operativo", texto: "USD 125.000 a 250.000 llave en mano gracias a importación directa sin intermediarios." },
  { titulo: "7% Royalty + 1% Mkt", texto: "Carga operativa liviana + hasta 35% de co-propiedad para Coordinadora e Instructores." },
  { titulo: "Sinergia de Holding", texto: "Primeros 30 inversores fundadores (AR & UY) reciben acciones del holding regional." },
];

export type Formato = {
  id: "compacta" | "flagship";
  nombre: string;
  m2: [number, number];
  reformers: [number, number];
  canon: string;
  inversion: string;
  perfil: string;
};

export const formatos: Formato[] = [
  {
    id: "compacta",
    nombre: "Boutique Compacta",
    m2: [150, 175],
    reformers: [15, 18],
    canon: "USD 22.500 – 27.000",
    inversion: "USD 125.000 – 175.000",
    perfil: "Barrios residenciales ABC1, ciudades del interior o primer estudio.",
  },
  {
    id: "flagship",
    nombre: "Boutique Flagship",
    m2: [180, 250],
    reformers: [20, 25],
    canon: "USD 30.000 – 37.500",
    inversion: "USD 180.000 – 250.000",
    perfil: "Polos corporativos y comerciales de alto flujo (Palermo, Nordelta, Carrasco, Pocitos).",
  },
];

export const formatosTabla = {
  columnas: ["Formato de sala", "Superficie", "Capacidad", "Canon de ingreso (USD 1.500/cama)", "Inversión total estimada (CAPEX + canon + obra)*", "Perfil ideal"],
  nota: "*Valores optimizados mediante importación directa de fábrica. Condiciones mensuales: 7% Royalty + 1% Fondo Marketing | Break-even: Mes 3-5 | ROI: 18-24 meses.",
};

// La lógica del simulador es la del boceto, tal cual (scripts.js):
//   canon      = camas × 1.500
//   CAPEX      = 125.000 + (camas − 15) / 10 × 125.000
//   m²         = 150 + (camas − 15) / 10 × 100
//   facturación relativa = (camas − 8) / 8, contra un estudio de 8 camas
//   formato    = Compacta hasta 18 camas, Flagship desde 19
// DUDA: con 20 camas da "+150%", mientras el resto de la página dice "+50% a +80%".
export const simulador = {
  etiqueta: "Simulador interactivo B2B",
  titulo: "Configura la capacidad de tu estudio",
  bajada: "Ajusta la cantidad de Reformers Fosque en tu sala (de 15 a 25 camas) para calcular en tiempo real el formato recomendado, canon modular, CAPEX total estimado y potencial de facturación relativa.",
  control: "Cantidad de Reformers en Sala:",
  unidad: "Camas",
  marcas: ["15 (Compacta)", "20 (Flagship Base)", "25 (Flagship Max)"],
  formato: "Formato Recomendado",
  sugeridos: "m² sugeridos",
  canon: { titulo: "Canon de ingreso", pie: "USD 1.500 × cama instalada" },
  capex: { titulo: "CAPEX total estimado", pie: "Equipamiento + Obra + Canon" },
  facturacion: { titulo: "Facturación relativa", pie: "vs. estudio tradicional de 8 camas" },
  retorno: { titulo: "Retorno estimado", valor: "18 – 24 meses", cta: "Postular con esta configuración" },
  min: 15,
  max: 25,
  inicial: 20,
};

export function simular(camas: number) {
  const flagship = camas > 18;
  return {
    canon: camas * 1500,
    capex: Math.round(125000 + ((camas - 15) / 10) * 125000),
    m2: Math.round(150 + ((camas - 15) / 10) * 100),
    facturacion: Math.round(((camas - 8) / 8) * 100),
    formato: flagship ? formatos[1] : formatos[0],
  };
}

export const sistema = {
  antetitulo: "Acompañamiento integral 360°",
  titulo: "Sistema Llave en Mano: 6 Pilares de Soporte",
  bajada: "No necesitas experiencia previa en fitness ni Pilates. Un modelo diseñado para inversores, empresarios y operadores gastronómicos u hoteleros que buscan eficiencia y respaldo probado.",
  pilares: [
    { titulo: "Geomarketing & Real Estate ABC1", texto: "Búsqueda estratégica de locales a la calle de 150 a 250 m² en zonas ABC1 de alta densidad socioeconómica y asesoramiento en negociación contractual." },
    { titulo: "Arquitectura & Importación Directa", texto: "Layout optimizado de sala para 15–25 camas, acústica, iluminación cálida boutique y 100% del equipamiento Fosque importado directo de fábrica al costo." },
    { titulo: "Preventa “Fundadores” (45 Días Antes)", texto: "Campaña intensiva de prelanzamiento 45 días antes de abrir para inaugurar con base sólida de membresías recurrentes y flujo de caja positivo temprano." },
    { titulo: "Academia Fosque & Reclutamiento", texto: "Selección y certificación oficial de instructores en el Método Gerardo Fosque y sus 4 Niveles (Inicia, Activa, Avanzada, Master) desde el día uno." },
    { titulo: "Modelo Societario & Legal (35%)", texto: "Contratos marco y reglamentos internos para asignar hasta el 35% de co-propiedad entre Coordinadora e Instructores líderes, erradicando la rotación." },
    { titulo: "App Propia & Tablero Financiero", texto: "Software propio de administración de ventas, clientes, reservas, CRM de retención y tablero de métricas en tiempo real para control estratégico del inversor." },
  ],
  // Una foto por pilar, en el mismo orden
  alts: [
    "Fachada de una sucursal Fosque encendida de noche en una calle comercial",
    "Corredor de arcos iluminados con luz cálida en una sucursal Fosque",
    "Preventa en la recepción: futuros socios de distintas edades se anotan en una tablet que les acerca la coordinadora",
    "Las manos de una instructora guían los pies de una alumna sobre la barra del Reformer",
    "En la sala de palmeras, la coordinadora le da la mano al inversor mientras tres instructores de distintas edades miran con orgullo",
    "Un inversor de unos sesenta años mira el tablero de su sucursal en una tablet junto a la coordinadora, que le señala un gráfico",
  ],
};

export const manifiesto = {
  antetitulo: "Negocios con conciencia · Amabilidad profesional",
  titulo: "Manifiesto Fosque Reformer",
  cita: "Vivimos cargados de ruido, de apuro, de pantallas… y de miedo. Corremos para llegar a ningún sitio. Queremos estar en todas partes y no estamos en ningún lugar. ¿Y si lo que falta no es tiempo, sino presencia?",
  texto: "El Pilates tradicional necesitaba evolucionar. Nace una nueva era: el Pilates Moderno. En Fosque Reformer ordenamos la abundancia que nos rodea bajo nuestro estándar de Amabilidad Profesional: calidez, respeto y excelencia técnica.",
  cupo: "Cupo Fundadores Etapa 1: Los primeros 30 Inversores Operadores Embajadores Socios en Argentina y Uruguay reciben participación accionaria en el Holding de expansión regional.",
  alt: "Silueta a contraluz de una mujer estirándose de costado sobre un Reformer, frente a una montaña entre nubes",
};

// DUDA: los estados ("Cupos Limitados", "En Evaluación") los puso la IA del boceto.
export const territorios = {
  antetitulo: "Etapa 1 · Territorios protegidos",
  titulo: "Expansión Argentina & Uruguay",
  bajada: "Consulta la disponibilidad por zona geográfica para los primeros 30 Inversores Operadores Embajadores Socios.",
  filtros: [
    { id: "todos", etiqueta: "Todos" },
    { id: "AR", etiqueta: "Argentina" },
    { id: "UY", etiqueta: "Uruguay" },
  ],
  lista: [
    { pais: "AR", nombre: "CABA — Palermo / Recoleta / Belgrano / Núñez", formato: "Boutique Flagship (20-25 camas)", estado: "Cupos Limitados" },
    { pais: "AR", nombre: "GBA Norte / Oeste / Sur (Nordelta, San Isidro, V. López)", formato: "Boutique Flagship (20-25 camas)", estado: "Disponible" },
    { pais: "AR", nombre: "Córdoba — Cerro de las Rosas / Nueva Córdoba", formato: "Compacta o Flagship", estado: "Disponible" },
    { pais: "AR", nombre: "Rosario & Mendoza — Zonas ABC1", formato: "Compacta o Flagship", estado: "Disponible" },
    { pais: "UY", nombre: "Montevideo — Carrasco / Pocitos / Punta Carretas", formato: "Boutique Flagship (20-25 camas)", estado: "Disponible" },
    { pais: "UY", nombre: "Punta del Este — Península / Manantiales", formato: "Boutique Flagship (20-25 camas)", estado: "En Evaluación" },
  ],
  etapa2: ["Etapa 2 Regional:", " Tras consolidar Argentina y Uruguay, se abrirán Master Franquicias en Chile, Paraguay, México y Colombia."],
};

export const postulacion = {
  antetitulo: "Postulación B2B confidencial",
  titulo: "Solicita el Dossier Financiero y Reserva tu Zona",
  bajada: "Completa tu perfil para recibir el Unit Economics detallado, disponibilidad exacta en tu zona y agendar una entrevista ejecutiva.",
  campos: {
    nombre: { etiqueta: "Nombre y apellido", ejemplo: "Ej. Martín Rodríguez" },
    whatsapp: { etiqueta: "WhatsApp", ejemplo: "Ej. +54 9 11 5555-1234" },
    email: { etiqueta: "Email", ejemplo: "martin@empresa.com" },
    zona: { etiqueta: "Zona de interés", vacio: "Selecciona una zona..." },
    perfil: { etiqueta: "Perfil de participación", vacio: "Selecciona tu perfil..." },
    capital: { etiqueta: "Capital disponible para invertir", vacio: "Selecciona rango de inversión..." },
  },
  enviar: "Solicitar Dossier Financiero y Agendar Reunión",
  enviando: "Enviando…",
  gracias: "¡Gracias",
  // El dossier en PDF todavía no existe: se promete el contacto, no una descarga.
  confirmacion: "Recibimos tu postulación. Te contactamos para enviarte el Dossier Financiero y agendar la entrevista ejecutiva.",
  otra: "Cargar otra postulación",
};

export const pie = {
  descripcion: "Plataforma de Expansión, Inversores y Operadores en Comunidad · Método Gerardo Fosque",
  aviso:
    "Aviso Legal: La información contenida en esta plataforma tiene fines informativos y de presentación comercial B2B. Las proyecciones de punto de equilibrio (mes 3 a 5) y retorno de inversión (18 a 24 meses) son estimaciones basadas en modelos operativos piloto y dependen de la ubicación y gestión de cada sucursal.",
};
