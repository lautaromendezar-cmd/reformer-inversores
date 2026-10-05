// /candidato (test) y /aplicar (formulario de calificación).
// Perfiles, capitales y formatos: los del Documento Maestro (lib/lead.ts y content/economia.ts).
// Las opciones del test reutilizan frases del PDF; el resultado sólo muestra datos del PDF.

export type Perfil = "Inversor Pasivo" | "Inversor Operador" | "Operador Técnico";
export type FormatoId = "compacta" | "standard" | "flagship";
export type Capital = "USD 30k – 50k" | "USD 80k – 120k" | "+USD 250k (Master)";

type Opcion = { texto: string; perfil?: Perfil; formato?: FormatoId; capital?: Capital; peso?: number };
export type PreguntaTest = { id: string; pregunta: string; opciones: Opcion[] };

export const test = {
  portada: {
    antetitulo: "¿Fosque Reformer es para vos?",
    titulo: "Test de perfil",
    bajada: "Seis preguntas. Al final te sugerimos un perfil y un formato de sala, y podés aplicar con los datos ya cargados.",
  },
  preguntas: [
    {
      id: "perfil",
      pregunta: "¿Con qué perfil te identificás?",
      opciones: [
        { texto: "Inversor Pasivo", perfil: "Inversor Pasivo", peso: 2 },
        { texto: "Inversor Operador", perfil: "Inversor Operador", peso: 2 },
        { texto: "Operador Técnico", perfil: "Operador Técnico", peso: 2 },
      ],
    },
    {
      id: "operacion",
      pregunta: "¿Quién sería el socio operador dedicado (100%) de la sucursal?",
      opciones: [
        { texto: "Otra persona: un franquiciado líder o coordinador", perfil: "Inversor Pasivo" },
        { texto: "Yo, como franquiciado líder", perfil: "Inversor Operador" },
        { texto: "Yo, como coordinador o instructor", perfil: "Operador Técnico" },
      ],
    },
    {
      id: "capital",
      pregunta: "¿Cuál es tu capital estimado disponible?",
      opciones: [
        { texto: "USD 30.000 a 50.000", capital: "USD 30k – 50k", formato: "compacta", peso: 2 },
        { texto: "USD 80.000 a 120.000", capital: "USD 80k – 120k", formato: "standard", peso: 2 },
        { texto: "Más de USD 250.000 (Master)", capital: "+USD 250k (Master)", formato: "flagship", peso: 2 },
      ],
    },
    {
      id: "zona",
      pregunta: "¿Qué enfoque buscás para tu sala?",
      opciones: [
        { texto: "Zonas residenciales o ciudades medianas", formato: "compacta" },
        { texto: "Flujo constante de membresías (packs de 4, 8 y 12)", formato: "standard" },
        { texto: "Picos de demanda y espacio para Fosque Niños", formato: "flagship" },
      ],
    },
    {
      id: "superficie",
      pregunta: "¿Qué superficie tiene (o tendría) tu local?",
      opciones: [
        { texto: "150 a 180 m²", formato: "compacta" },
        { texto: "180 a 250 m²", formato: "standard" },
        { texto: "250 a 350 m²", formato: "flagship" },
        { texto: "Todavía no tengo local" },
      ],
    },
    {
      id: "staff",
      pregunta: "¿Asignarías participación al staff clave?",
      opciones: [
        { texto: "Sí, hasta el 50% entre la coordinadora y las instructoras clave" },
        { texto: "Quiero conocer más el programa de vesting" },
      ],
    },
  ] as PreguntaTest[],
  master: "+USD 250k: rango Master Franquicia.",
};

export const aplicar = {
  portada: {
    antetitulo: "Formulario interactivo de calificación",
    titulo: "Aplicar a mi franquicia",
  },
  intro: "Una pregunta por pantalla.",
  gracias: {
    titulo: "Gracias. Recibimos tu aplicación.",
    texto: "Te contactamos para agendar la reunión estratégica.",
    agendar: "Agendar reunión estratégica",
  },
};
