// /modelo — Documento Maestro B2B §1 y §2.1. Sólo textos del PDF (voseo y erratas corregidas).
import { afirmaciones } from "./afirmaciones";

export const portada = {
  antetitulo: "Módulo estratégico y filosofía de marca",
  titulo: "Modelos de Negocio de la Nueva Era",
  bajada:
    "Fosque Reformer es la convergencia entre la presencia, la disciplina y el movimiento consciente, estructurados en un modelo de negocio de la Nueva Era.",
  alt: "Corredor de arcos iluminados con luz cálida en una sucursal Fosque",
};

export const proposito = {
  antetitulo: "Propósito · El porqué",
  titulo: "Existimos para activar la conciencia en acción y redefinir el bienestar humano.",
  texto: [
    "Transformamos el vacío, la prisa y la desconexión moderna en un espacio de pausa, salud y abundancia compartida.",
    "Democratizamos el acceso a una experiencia premium para las personas que eligen despertar y construimos un ecosistema de inversión inteligente donde emprendedores, coordinadores e instructores crecen juntos en un modelo de negocios de moda con propósito.",
  ],
};

export const mision = {
  antetitulo: "Misión · El qué y el cómo",
  items: [
    {
      para: "Hacia el cliente",
      texto:
        "Crear un programa para mejorar la vida combinando el Pilates Moderno y el acompañamiento motivacional; una experiencia inmersiva, atenta, amable y accesible para que el movimiento consciente sea una práctica diaria de grandes ventajas y beneficios para el miembro de la comunidad.",
    },
    {
      para: "Hacia el emprendedor y los profesionales",
      texto:
        "Impulsar la plataforma colaborativa de negocios más avanzada de la región, donde el talento, la gestión y la enseñanza se recompensan mediante participación accionaria (que decide el inversor principal para asignar entre los operadores de la sucursal). Un modelo dinámico que puede operar sin empleados tradicionales, convirtiendo al staff en socios co-propietarios para garantizar prosperidad económica y alineación de visión compartida.",
    },
  ],
};

export const vision = {
  antetitulo: "Visión · El alcance y la escala",
  titulo: afirmaciones.unicornio,
  bajada: `Posicionando a Fosque como ${afirmaciones.redNumeroUno}.`,
  etapas: [
    {
      anio: "Año 1",
      nombre: "Consolidación regional",
      sucursales: 60,
      texto: "Alcanzar 60 sucursales activas en Argentina y Uruguay, marcando un récord histórico de aperturas impulsado por la red de asociados.",
      paises: ["AR", "UY"],
    },
    {
      anio: "Año 3",
      nombre: "Escalamiento internacional",
      sucursales: 200,
      texto: "Llegar a 200 sucursales en Argentina, Uruguay, Chile y Paraguay, ingresando a México y Colombia mediante esquemas de Master Franquicia.",
      paises: ["AR", "UY", "CL", "PY", "MX", "CO"],
    },
    {
      anio: "Año 5",
      nombre: "Consolidación global",
      sucursales: 450,
      texto:
        "Alcanzar 400 sucursales en Argentina y Uruguay (450 en LATAM) e iniciar la expansión hacia la meta global de 1.000 Embajadores y Puntos de Luz en las principales capitales del mundo.",
      paises: ["AR", "UY", "CL", "PY", "MX", "CO", "LA"],
    },
  ],
};

export const valores = {
  antetitulo: "Valores y cultura Fosque",
  items: [
    {
      titulo: "Amabilidad Profesional",
      subtitulo: "Amor en formato profesional",
      texto: "El estándar supremo de servicio. Empatía, respeto, calidez y cuidado obsesivo por el tiempo y la energía de cada persona.",
    },
    {
      titulo: "Cultura de Co-Propiedad y Abundancia",
      texto: "La prosperidad se comparte. Quienes operan, coordinan y enseñan son parte de la propiedad del negocio.",
    },
    {
      titulo: "Presencia y Precisión Técnica",
      texto: "La unión entre la sabiduría oriental (Yoga, Tai Chi, Zen) y la ciencia biológicamente precisa del Pilates occidental.",
    },
    {
      titulo: "Autodeterminación y Automotivación",
      texto: "Equipos autónomos que lideran su espacio con proactividad, guiados por el propósito y la trascendencia.",
    },
  ],
};

export const propuesta = {
  antetitulo: "La propuesta de valor",
  titulo: "Experiencia Fosque",
  disponibilidad: {
    titulo: "Garantía de disponibilidad",
    texto: "Salas optimizadas equipadas con 10 a 25 Reformers de Autor en locales de 150 m² a 350 m², resolviendo el cuello de botella tradicional para asegurar cupo siempre.",
  },
  nivelesIntro: "Coreografía de experiencia en 4 niveles: programas inmersivos para acompañar la progresión real del usuario.",
  niveles: [
    { n: 1, nombre: "Inicia", texto: "Adaptación, respiración y biomecánica básica." },
    { n: 2, nombre: "Activa", texto: "Fuerza, dinamismo y ritmo para incorporar el hábito." },
    { n: 3, nombre: "Avanzada", texto: "Desafío técnico, potencia y fluidez máxima." },
    { n: 4, nombre: "Master / Performance (Fosque Signature)", texto: "Expresión superior de la técnica Fosque." },
  ],
  inclusivas: {
    titulo: "Líneas inclusivas (Fosque Niños & Adaptado)",
    texto: "Programas diseñados para niños, adolescentes, adultos y personas en proceso de recuperación.",
    alt: "Dos chicos juegan en la sala de Fosque Niños mientras una instructora los acompaña",
  },
  hospitality: {
    titulo: "Hospitality boutique (Espacios de Presencia)",
    texto: "Iluminación cálida indirecta (2700K), acústica de alta fidelidad, aromas Signature y arquitectura boutique en madera.",
    alt: "Tres alumnas charlan y se ríen en los sillones del lounge después de clase",
  },
};
