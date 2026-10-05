// Copy de la home. Fuente: Documento Maestro B2B (docs/), corregido y pasado a voseo.
import { afirmaciones } from "./afirmaciones";

export const hero = {
  antetitulo: "Franquicia y co-propiedad de Pilates Moderno",
  titulo: "El modelo de negocios de la Nueva Era.",
  bajada:
    "Te damos la bienvenida al primer ecosistema asociativo que une la precisión del Pilates Moderno con una plataforma comercial global. Inversión inteligente al costo operativo real, diseño industrial de autor y co-propiedad compartida.",
  ctaDossier: "Descargar Dossier",
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

export const cifras: { titulo: string; bajada: string; items: Cifra[] } = {
  titulo: "Un sistema pensado para escalar",
  bajada: "Fosque Reformer no vende un local: entrega un formato probado, modular y medible.",
  items: [
    { numeros: [afirmaciones.trayectoria.valor], sufijo: afirmaciones.trayectoria.sufijo, texto: afirmaciones.trayectoria.texto },
    { numeros: [10, 25], separador: " a ", texto: "Reformers de Autor por sala" },
    { numeros: [150, 350], separador: "–", sufijo: " m²", texto: "por sucursal, en locales a la calle" },
    {
      previo: "Mes ",
      numeros: [afirmaciones.breakEven.desde, afirmaciones.breakEven.hasta],
      separador: " a ",
      texto: "punto de equilibrio estimado",
      estimado: true,
    },
    {
      numeros: [afirmaciones.roi.desde, afirmaciones.roi.hasta],
      separador: "–",
      sufijo: " meses",
      texto: "retorno estimado de la inversión",
      estimado: true,
    },
    { numeros: [afirmaciones.embajadores.valor], texto: afirmaciones.embajadores.texto },
  ],
};

// Manifiesto "Nuevo Ciclo": tres estrofas, de la luz fría a la cálida.
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
      "En Fosque Reformer ordenamos la abundancia que nos rodea.",
      "Somos una plataforma viva donde profesionales, instructores e inversores unen talentos para crear negocios con propósito.",
    ],
    [
      "No abrimos locales: creamos portales a una vida más presente, inclusiva y abundante.",
      "Esto no es solo Pilates. Es la evolución del ser humano en movimiento.",
      "Bienvenidos al Nuevo Ciclo. Bienvenidos a Fosque.",
    ],
  ],
};

// Las cuatro claves del éxito del operador (§2.2), en el lugar del "Por qué".
export const porQue = {
  antetitulo: "Por qué Fosque",
  titulo: "Cuatro decisiones que sostienen el negocio",
  bajada: "La fórmula del operador: lo que cada sucursal Fosque tiene que tener desde el primer día.",
  pilares: [
    {
      titulo: "Ubicación premium ABC1",
      texto:
        "Locales a la calle de 150 a 350 m² en zonas de alta densidad socioeconómica, con fachada de gran altura, luz natural y contratos a largo plazo (10 años).",
    },
    {
      titulo: "Inversión al costo operativo",
      texto:
        "Importación y compra directa desde fábricas seleccionadas para el 100% del equipamiento, las terminaciones y la tecnología. Sin intermediarios.",
    },
    {
      titulo: "Socio operador dedicado",
      texto:
        "Un franquiciado líder o coordinador con dedicación completa y perfil de servicio, excelencia y gestión humana.",
    },
    {
      titulo: "Co-propiedad",
      texto:
        "Hasta el 50% de la participación de la sucursal, asignable a la coordinadora y las instructoras clave mediante un programa de vesting.",
    },
  ],
  alt: "Recepción Fosque con barra de café en madera: una recepcionista sirve un café mientras dos alumnas entran por los molinetes",
};

export const coPropiedad = {
  antetitulo: "Revolución asociativa",
  titulo: "Del empleado que rota al socio que se queda",
  bajada:
    "En Fosque el inversor principal puede asignar hasta el 50% de la sucursal a la coordinadora y a las instructoras clave. Quien enseña y gestiona también es dueño.",
  columnas: ["La franquicia del pasado", "El ecosistema Fosque"],
  filas: [
    { tema: "El equipo", antes: "Empleados con alta rotación.", ahora: "Socios co-propietarios, alineados con la rentabilidad." },
    { tema: "La propiedad", antes: "Un solo dueño.", ahora: "Hasta el 50% asignable al staff clave, por decisión del inversor principal." },
    { tema: "El equipamiento", antes: "Comprado a intermediarios.", ahora: "Importación directa de fábrica, al costo operativo." },
    { tema: "El canon", antes: "Un monto único para cualquier tamaño.", ahora: "USD 1.500 por Reformer instalado: escala con tu sala." },
  ],
  cta: "Cómo funciona la co-propiedad",
  alt: "El equipo de una sucursal Fosque: la coordinadora y cuatro instructores abrazados en la sala, sonriendo a cámara",
};

export const formatosTeaser = {
  antetitulo: "Formatos de sala",
  titulo: "Elegí el tamaño. El sistema es el mismo.",
  bajada: "Tres formatos según la superficie del local. Cada punto es un Reformer de Autor.",
  cta: "Abrir la calculadora",
};

export const quiz = {
  antetitulo: "¿Fosque Reformer es para vos?",
  titulo: "Marcá lo que te representa",
  afirmaciones: [
    "Quiero invertir en un negocio con propósito, con una marca y un sistema detrás.",
    "Tengo, o puedo conseguir, un local a la calle de 150 a 350 m² en una zona ABC1.",
    "Me imagino liderando un equipo que también es dueño del negocio.",
    "Cuento con capital propio desde USD 30.000.",
  ],
  respuestas: [
    "Empezá por el test: en dos minutos te decimos qué perfil y qué formato van con vos.",
    "Hay una base. El test completo te muestra por dónde seguir.",
    "Vas bien. Con el test sabés qué formato te conviene.",
    "Tenés el perfil que buscamos. Hacé el test o aplicá directo.",
    "Tenés el perfil que buscamos. Aplicá y agendamos la reunión.",
  ],
  cta: "Hacer el test completo",
};

export const dossier = {
  antetitulo: "Dossier Maestro",
  titulo: "Todo el modelo, en un documento",
  texto:
    "Filosofía, formatos de sala, estructura económica, co-propiedad y los cuatro manuales de soporte. Dejanos tus datos y te lo enviamos.",
  // TODO: validar con Gerardo — el PDF del dossier no existe todavía. Cuando llegue, va en
  // public/dossier/ y el formulario lo entrega después de enviar.
  tapa: { linea1: "Dossier", linea2: "Maestro", pie: "Edición 2026 · Confidencial" },
};

export const cierre = {
  antetitulo: "Aplicación",
  titulo: "No abrimos locales: creamos portales.",
  bajada: "Contanos quién sos y qué buscás. Te respondemos para agendar una reunión estratégica.",
  alt: "Una instructora ajusta la postura de una alumna sobre el Reformer; las dos se ríen en la sala del sol",
};
