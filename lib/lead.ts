// Esquema del lead: lo usan el formulario corto de la home, /aplicar (fase 5) y la ruta
// /api/lead. Mismo Zod en cliente y servidor.
import { z } from "zod";

export const perfiles = ["Inversor Pasivo", "Inversor Operador", "Operador Técnico"] as const;
export const capitales = ["USD 30k – 50k", "USD 80k – 120k", "+USD 250k (Master)"] as const;
export const formatosInteres = ["Boutique Compacta", "Boutique Standard", "Flagship / Gran Sala", "Todavía no sé"] as const;

const texto = (max: number) => z.string().trim().max(max);

export const esquemaLead = z.object({
  nombre: texto(120).min(2, "Contanos tu nombre."),
  email: z.string().trim().pipe(z.email("Revisá el email.")),
  whatsapp: texto(40).regex(/^[+\d][\d\s().-]{6,}$/, "Revisá el número (con código de área)."),
  ubicacion: texto(120).optional(),
  perfil: z.enum(perfiles, { message: "Elegí un perfil." }).optional(),
  capital: z.enum(capitales).optional(),
  formato: z.enum(formatosInteres).optional(),
  comentario: texto(2000).optional(),
  dossier: z.boolean().optional(),
  origen: texto(40).default("sitio"),
  // Honeypot: un campo que una persona nunca ve. Si viene con algo, es un bot.
  empresa: z.string().max(0).optional(),
});

export type Lead = z.infer<typeof esquemaLead>;

/** Primer error por campo, para mostrar al lado de cada input. */
export function erroresPorCampo(error: z.ZodError): Record<string, string> {
  const salida: Record<string, string> = {};
  for (const issue of error.issues) {
    const campo = String(issue.path[0] ?? "");
    if (campo && !salida[campo]) salida[campo] = issue.message;
  }
  return salida;
}
