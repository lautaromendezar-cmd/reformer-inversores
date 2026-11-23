// Datos generales del sitio: marca, navegación, contacto y aviso legal.

export const marca = {
  nombre: "Fosque Reformer Franquicias",
  corto: "Fosque Reformer",
  bajada: "Ecosistema de inversión B2B",
  descripcion:
    "Invierte en la evolución del Pilates Moderno: salas de 15 a 25 Reformers, CAPEX al costo operativo y un modelo asociativo sin rotación. Etapa 1: Argentina y Uruguay.",
  // URL pública: NEXT_PUBLIC_SITE_URL en Vercel. El PDF habla de fosquereformer.com/inversores.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fosque-reformer-partners.vercel.app",
  sitioB2C: "https://fosque-reformer.vercel.app", // TODO: validar con Gerardo — pasar al dominio final
};

// Anclas de la landing (los cinco ítems del menú del boceto).
export const navegacion = [
  { href: "/#metodo", etiqueta: "Método" },
  { href: "/#comparativa", etiqueta: "Comparativa" },
  { href: "/#formatos", etiqueta: "Formatos" },
  { href: "/#sistema", etiqueta: "Sistema" },
  { href: "/#territorios", etiqueta: "Territorios" },
];

export const accesos = {
  dossier: { href: "/#postular", etiqueta: "Solicitar Dossier" },
};

export const contacto = {
  // TODO: validar con Gerardo — número inventado (el mismo placeholder del B2C). Cambiar antes de publicar.
  whatsapp: "5491100000000",
  // TODO: validar con Gerardo — link de Calendly (o similar). Mientras sea null, "Agendar reunión" abre WhatsApp.
  calendario: null as string | null,
  email: null as string | null, // TODO: validar con Gerardo — email comercial público
};

export const mensajes = {
  reunion: "Hola, quiero agendar una reunión estratégica para conocer el modelo de franquicia de Fosque Reformer.",
  dossier: "Hola, quiero recibir el Dossier Financiero de Fosque Reformer.",
  general: "Hola, quiero conocer el modelo de franquicia y co-propiedad de Fosque Reformer.",
};

export function enlaceWhatsApp(texto: string = mensajes.general): string {
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function enlaceReunion(): string {
  return contacto.calendario ?? enlaceWhatsApp(mensajes.reunion);
}

// Aviso legal: footer, /inversion y /legal. En la línea del de las grandes redes de franquicia.
export const avisoLegal = {
  titulo: "Aviso legal",
  texto:
    "La información de este sitio es orientativa y no constituye una oferta de venta de franquicia ni una promesa de rentabilidad. Los valores económicos son estimados: pueden variar según la ubicación, el formato de sala, el tipo de cambio y las condiciones de importación, y no reemplazan el análisis propio de cada inversor. Las condiciones finales se establecen exclusivamente en el contrato de franquicia y su documentación anexa.",
};
