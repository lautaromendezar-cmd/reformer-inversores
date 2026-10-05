// Recibe un lead, lo valida con el mismo Zod del cliente y lo manda por email con Resend.
// Sin RESEND_API_KEY / LEADS_TO_EMAIL responde 503 y el formulario ofrece WhatsApp.

import { Resend } from "resend";
import { esquemaLead, erroresPorCampo, type Lead } from "@/lib/lead";

export async function POST(req: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Formato inválido." }, { status: 400 });
  }

  const r = esquemaLead.safeParse(cuerpo);
  if (!r.success) {
    // El honeypot lleno se responde como éxito: al bot no se le avisa nada.
    if (r.error.issues.some((i) => i.path[0] === "empresa")) return Response.json({ ok: true });
    return Response.json({ ok: false, errores: erroresPorCampo(r.error) }, { status: 422 });
  }

  const clave = process.env.RESEND_API_KEY?.trim();
  const destino = process.env.LEADS_TO_EMAIL?.trim();
  if (!clave || !destino) {
    return Response.json({ ok: false, sinEnvio: true }, { status: 503 });
  }

  const lead = r.data;
  const remitente = process.env.LEADS_FROM_EMAIL?.trim() || "Fosque Reformer Partners <onboarding@resend.dev>";
  try {
    const resend = new Resend(clave);
    const { error } = await resend.emails.send({
      from: remitente,
      to: destino.split(",").map((s) => s.trim()),
      replyTo: lead.email,
      subject: `Nuevo lead${lead.perfil ? ` · ${lead.perfil}` : ""}: ${lead.nombre}`,
      text: comoTexto(lead),
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("[lead] fallo el envío", e);
    return Response.json({ ok: false, sinEnvio: true }, { status: 502 });
  }
  return Response.json({ ok: true });
}

function comoTexto(l: Lead): string {
  const filas: [string, string | undefined][] = [
    ["Nombre", l.nombre],
    ["Email", l.email],
    ["WhatsApp", l.whatsapp],
    ["Ciudad / país de interés", l.ubicacion],
    ["Perfil", l.perfil],
    ["Capital disponible", l.capital],
    ["Formato de interés", l.formato],
    ["Pidió el dossier", l.dossier ? "Sí" : undefined],
    ["Comentario", l.comentario],
    ["Origen", l.origen],
  ];
  return filas
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
