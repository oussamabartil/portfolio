import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — should stay empty
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { name, email, message, company } = body;

  // Honeypot: bots tend to fill every field, humans never see this one.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Merci de remplir tous les champs." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Un des champs dépasse la longueur autorisée." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante — message reçu mais non transmis:", { name, email });
    return NextResponse.json(
      { error: "Le formulaire n'est pas encore configuré côté serveur. Merci d'écrire directement par email." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || profile.email,
      reply_to: email,
      subject: `Nouveau message de ${name} — portfolio`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Erreur lors de l'envoi. Réessaie plus tard." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de l'envoi. Réessaie plus tard." }, { status: 500 });
  }
}
