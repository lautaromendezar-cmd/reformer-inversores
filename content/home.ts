// Copy de la home. REGLA (Lautaro, 5-oct-2026): sólo textos del Documento Maestro B2B (docs/),
// corregidos y pasados a voseo. Nada inventado: lo que no es del PDF es interfaz (botones,
// etiquetas, instrucciones).
import { afirmaciones } from "./afirmaciones";

export const hero = {
  antetitulo: "Plataforma de emprendedores, inversores y operadores en comunidad",
  titulo: "El modelo de negocios de la Nueva Era.",
  bajada:
    "Te damos la bienvenida al primer ecosistema asociativo que unifica la precisión del Pilates Moderno con una plataforma comercial global. Inversión inteligente al costo operativo real, diseño industrial de autor y co-propiedad compartida.",
  ctaDossier: "Descargar Dossier Maestro",
  ctaReunion: "Agendar reunión estratégica",
  alt: "Clase de Pilates Reformer en una sala Fosque con luz cálida: alumnas sonriendo sobre los Reformers y la instructora caminando por el pasillo central",
};

export type Cifra = {
  // Partes del número: los dígitos de `numeros` cuentan al entrar en pantalla.
  previo?: string;
  numeros: number[];
  separador?: string;
  sufijo?: string;
  texto: string;
  estimado?: boolean;
};

export const cifras: { titulo: string; items: Cifra[] } = {
  titulo: "Cifras de escala",
  items: [
    { numeros: [afirmaciones.trayectoria.valor], sufijo: afirmaciones.trayectoria.sufijo, texto: afirmaciones.trayectoria.texto },
    { numeros: [10, 25], separador: " a ", texto: "Reformers de Autor por sala" },
    { numeros: [150, 350], separador: "–", sufijo: " m²", texto: "por local boutique" },
    {
      previo: "Mes ",
      numeros: [afirmaciones.breakEven.desde, afirmaciones.breakEven.hasta],
      separador: " a ",
      texto: afirmaciones.breakEven.texto,
      estimado: true,
    },
    {
      numeros: [afirmaciones.roi.desde, afirmaciones.roi.hasta],
      separador: "–",
      sufijo: " meses",
      texto: afirmaciones.roi.texto,
      estimado: true,
    },
    { numeros: [afirmaciones.embajadores.valor], texto: afirmaciones.embajadores.texto },
  ],
};

// Manifiesto "Nuevo Ciclo" (§1.5), completo, en tres estrofas: de la luz fría a la cálida.
export const manifiesto = {
  antetitulo: "Manifiesto · Nuevo Ciclo",
  estrofas: [
    [
      "Vivimos cargados de ruido, de apuro, de pantallas… y de miedo.",
      "Corremos para llegar a ningún sitio.",
      "Queremos estar en todas partes y no estamos en ningún lugar.",
      "¿Y si lo que falta no es tiempo, sino presencia?",
    ],
    [
      "El Pilates tradicional necesita actualizarse. Nace la nueva era: Pilates Moderno.",
      "En Fosque Reformer ordenamos la abundancia que nos rodea. Somos el punto de encuentro entre la tecnología de autor, el diseño boutique internacional y la energía de una comunidad que vibra en una misma frecuencia.",
      "Somos una plataforma viva donde profesionales, instructores e inversores unen talentos para crear negocios con propósito.",
    ],
    [
      "No abrimos locales: creamos portales a una vida más presente, inclusiva y abundante.",
      "Esto no es solo Pilates. Es la evolución del ser humano en movimiento.",
      "Bienvenidos al Nuevo Ciclo. Bienvenidos a Fosque.",
    ],
  ],
};

// Claves del éxito del negocio (§2.2).
export const porQue = {
  antetitulo: "Por qué Fosque",
  titulo: "Claves del éxito del negocio",
  bajada: "La fórmula del operador.",
  pilares: [
    {
      titulo: "Ubicación premium (ABC1)",
      texto:
        "Locales a la calle en zonas de alta densidad socioeconómica (150 m² a 350 m²), con fachada de gran altura, luz natural y contratos a largo plazo (10 años).",
    },
    {
      titulo: "Inversión inteligente al costo operativo",
      texto:
        "Importación y compra directa desde fábricas seleccionadas en China para el 100% del equipamiento, terminaciones y tecnología, eliminando intermediarios y optimizando el retorno.",
    },
    {
      titulo: "Socio operador dedicado (100%)",
      texto: "Un franquiciado líder o coordinador con perfil de servicios, excelencia y gestión humana.",
    },
    {
      titulo: "Ecosistema de co-propiedad",
      texto:
        "Programa de vesting: hasta un 50% de la participación accionaria de la sucursal asignada entre la coordinadora y las instructoras clave, erradicando la rotación de personal y asegurando un compromiso absoluto.",
    },
  ],
  alt: "Recepción Fosque con barra de café en madera: una recepcionista sirve un café mientras dos alumnas entran por los molinetes",
};

// Sección "Co-Propiedad Dinámica" de la web (§4): franquicia del pasado vs. ecosistema Fosque.
export const coPropiedad = {
  antetitulo: "Revolución asociativa",
  titulo: "Sistema de Co-Propiedad (Vesting 50%)",
  bajada:
    "El talento, la gestión y la enseñanza se recompensan mediante participación accionaria, que decide el inversor principal para asignar entre los operadores de la sucursal.",
  columnas: ["La franquicia del pasado", "El ecosistema Fosque"],
  filas: [
    {
      tema: "El equipo",
      antes: "Alta rotación de empleados.",
      ahora: "Participación accionaria de hasta el 50% para la coordinadora y las instructoras clave, alineando los incentivos de rentabilidad.",
    },
    {
      tema: "El modelo",
      antes: "Empleados tradicionales.",
      ahora: "Un modelo dinámico que puede operar sin empleados tradicionales, convirtiendo al staff en socios co-propietarios.",
    },
    {
      tema: "El equipamiento",
      antes: "Intermediarios.",
      ahora: "Importación y compra directa desde fábricas seleccionadas, eliminando intermediarios.",
    },
  ],
  cta: "Ver el sistema de co-propiedad",
  alt: "El equipo de una sucursal Fosque: la coordinadora y cuatro instructores abrazados en la sala, sonriendo a cámara",
};

export const formatosTeaser = {
  antetitulo: "Formatos de sala",
  titulo: "Matriz comparativa por formato de sala",
  bajada: "Cada punto es un Reformer de Autor.",
  cta: "Abrir la calculadora",
};

export const quiz = {
  antetitulo: "¿Fosque Reformer es para vos?",
  titulo: "Marcá lo que te representa",
  afirmaciones: [
    "Quiero ser parte de un ecosistema asociativo y de negocios con propósito.",
    "Puedo acceder a un local a la calle de 150 a 350 m² en una zona ABC1.",
    "Quiero que el staff clave sea socio co-propietario de la sucursal.",
    "Cuento con capital desde USD 30.000.",
  ],
  respuestas: [
    "Marcá las que te representan.",
    "Hacé el test completo para conocer tu perfil.",
    "Hacé el test completo para conocer tu perfil y tu formato.",
    "Aplicá o hacé el test completo.",
    "Aplicá y agendá la reunión estratégica.",
  ],
  cta: "Hacer el test completo",
};

export const dossier = {
  antetitulo: "Dossier Maestro (PDF)",
  titulo: "Dossier Maestro",
  texto: "Dejanos tus datos y te lo enviamos.",
  // TODO: validar con Gerardo — el PDF del dossier no existe todavía. Cuando llegue, va en
  // public/dossier/ y el formulario lo entrega después de enviar.
  tapa: { linea1: "Dossier", linea2: "Maestro", pie: "Fosque Reformer · B2B" },
};

export const cierre = {
  antetitulo: "Aplicación",
  titulo: "No abrimos locales: creamos portales a una vida más abundante.",
  bajada: "Dejanos tus datos y te contactamos para agendar la reunión estratégica.",
  alt: "Una instructora ajusta la postura de una alumna sobre el Reformer; las dos se ríen en la sala del sol",
};
