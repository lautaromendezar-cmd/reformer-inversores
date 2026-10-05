// /faq — Preguntas armadas sobre el Documento Maestro B2B. Cada respuesta sale del PDF; las
// que el PDF no responde (plazos de apertura, quién gestiona la importación, etc.) no están.

export const portada = {
  antetitulo: "Preguntas frecuentes",
  titulo: "Preguntas frecuentes",
  alt: "Tres alumnas charlan y se ríen en los sillones del lounge después de clase",
};

export type Pregunta = { p: string; r: string };

export const preguntas: Pregunta[] = [
  {
    p: "¿Qué incluye el canon de ingreso?",
    r: "El canon de ingreso (fee de franquicia) es de USD 1.500 por Reformer instalado y cubre derecho de marca, know-how, onboarding del ecosistema y setup del software.",
  },
  {
    p: "¿Cuánto es la inversión según el formato?",
    r: "Boutique Compacta: canon de USD 15.000 a 21.000 y CAPEX estimado de USD 50.000 a 65.000. Boutique Standard: canon de USD 22.500 a 28.500 y CAPEX de USD 65.000 a 80.000. Flagship / Gran Sala: canon de USD 30.000 a 37.500 y CAPEX de USD 80.000 a 105.000. El CAPEX incluye equipamiento y obra.",
  },
  {
    p: "¿Qué se paga por mes?",
    r: "Un royalty mensual operativo del 6% sobre la facturación bruta y un 2% al fondo de marketing / Red de Embajadores, para posicionamiento global y generación de leads.",
  },
  {
    p: "¿Cuántos m² necesito?",
    r: "Locales boutique de 150 m² a 350 m², a la calle, en zonas de alta densidad socioeconómica (ABC1), con fachada de gran altura, luz natural y contratos a largo plazo (10 años).",
  },
  {
    p: "¿Cuántos Reformers lleva una sala?",
    r: "De 10 a 25 Reformers de Autor por sucursal: de 10 a 14 en Boutique Compacta, de 15 a 19 en Boutique Standard y de 20 a 25 en Flagship / Gran Sala.",
  },
  {
    p: "¿Qué es el programa de vesting?",
    r: "Es el ecosistema de co-propiedad: hasta un 50% de la participación accionaria de la sucursal asignada entre la coordinadora y las instructoras clave, erradicando la rotación de personal y asegurando un compromiso absoluto.",
  },
  {
    p: "¿Quién decide la participación del staff?",
    r: "El inversor principal decide cómo asignar la participación accionaria entre los operadores de la sucursal.",
  },
  {
    p: "¿Qué perfil de operador necesita cada sucursal?",
    r: "Un socio operador dedicado (100%): un franquiciado líder o coordinador con perfil de servicios, excelencia y gestión humana.",
  },
  {
    p: "¿Cuándo se alcanza el punto de equilibrio?",
    r: "El punto de equilibrio (break-even) se estima entre el mes 3 y el mes 5, y el retorno de inversión (ROI) entre 18 y 24 meses. Son valores estimados.",
  },
  {
    p: "¿De dónde viene el equipamiento?",
    r: "Importación y compra directa desde fábricas seleccionadas en China para el 100% del equipamiento, terminaciones y tecnología, eliminando intermediarios.",
  },
  {
    p: "¿Qué soporte recibo?",
    r: "Cuatro manuales de operación: A, Arquitectura & Estudio; B, Fosque Academy & Metodología (programa CANE); C, Operaciones & Hospitality; y D, Marketing, Conversión y Red de Embajadores.",
  },
  {
    p: "¿En qué países?",
    r: "Año 1: Argentina y Uruguay. Año 3: Argentina, Uruguay, Chile y Paraguay, ingresando a México y Colombia mediante esquemas de Master Franquicia. Año 5: 450 sucursales en LATAM.",
  },
];
