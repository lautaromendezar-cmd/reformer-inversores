// Datos generales del sitio: marca, navegación, contacto y aviso legal.

export const marca = {
  nombre: "Fosque Reformer Partners",
  corto: "Fosque Reformer",
  descripcion:
    "Franquicia y co-propiedad de Pilates Moderno. Salas boutique de 10 a 25 Reformers de Autor, inversión al costo operativo y un sistema que te acompaña desde la aplicación hasta la apertura.",
  // URL pública: NEXT_PUBLIC_SITE_URL en Vercel. El PDF habla de fosquereformer.com/inversores.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fosque-reformer-partners.vercel.app",
  sitioB2C: "https://fosque-reformer.vercel.app", // TODO: validar con Gerardo — pasar al dominio final
};

export const navegacion = [
  { href: "/modelo", etiqueta: "El Modelo" },
  { href: "/co-propiedad", etiqueta: "Co-Propiedad" },
  { href: "/inversion", etiqueta: "Inversión" },
  { href: "/proceso", etiqueta: "Proceso" },
  { href: "/academia", etiqueta: "Academia" },
  { href: "/faq", etiqueta: "FAQ" },
];

export const accesos = {
  aplicar: { href: "/aplicar", etiqueta: "Aplicar" },
  portal: { href: "/portal", etiqueta: "Portal Socios" },
  candidato: { href: "/candidato", etiqueta: "¿Es para vos?" },
};

export const contacto = {
  // TODO: validar con Gerardo — número inventado (el mismo placeholder del B2C). Cambiar antes de publicar.
  whatsapp: "5491100000000",
  // TODO: validar con Gerardo — link de Calendly (o similar). Mientras sea null, "Agendar reunión" abre WhatsApp.
  calendario: null as string | null,
  email: null as string | null, // TODO: validar con Gerardo — email comercial público
};

export const mensajes = {
  reunion: "Hola, quiero agendar una reunión estratégica para conocer el modelo de Fosque Reformer Partners.",
  dossier: "Hola, quiero recibir el Dossier Maestro de Fosque Reformer Partners.",
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
