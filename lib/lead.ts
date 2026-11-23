// Esquema del lead: lo usan el formulario de la landing y la ruta /api/lead. Mismo Zod en cliente y servidor.
import { z } from "zod";

// Opciones del formulario de calificación (Documento Maestro B2B 18-nov-2026, bloque 7).
export const zonas = ["CABA", "GBA Norte / Oeste / Sur", "Córdoba", "Rosario", "Mendoza", "Montevideo", "Punta del Este", "Otra zona (Argentina / Uruguay / LATAM)"] as const;
export const perfiles = ["Inversor Único (con Socio Operador dedicado)", "Dueño / Operador (Gastronómico, Hotelero o Empresario)", "Grupo de Inversores"] as const;
export const capitales = [
  "USD 125.000 – 175.000 (Formato Boutique Compacta · 15-18 Reformers)",
  "USD 180.000 – 250.000 (Formato Boutique Flagship · 20-25 Reformers)",
  "Más de USD 250.000 (Desarrollo Multi-Unidad / Master)",
] as const;

const texto = (max: number) => z.string().trim().max(max);

export const esquemaLead = z.object({
  nombre: texto(120).min(2, "Escribe tu nombre y apellido."),
  whatsapp: texto(40).regex(/^[+\d][\d\s().-]{6,}$/, "Revisa el número (con código de área)."),
  email: z.string().trim().pipe(z.email("Revisa el email.")),
  zona: z.enum(zonas, { message: "Selecciona una zona." }),
  perfil: z.enum(perfiles, { message: "Selecciona tu perfil." }),
  capital: z.enum(capitales, { message: "Selecciona un rango de inversión." }),
  // Si llegó desde el simulador: cuántas camas tenía configuradas.
  camas: z.number().int().min(15).max(25).optional(),
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
