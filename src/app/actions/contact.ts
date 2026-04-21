"use server";

import nodemailer from "nodemailer";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString() ?? "Allgemeine Anfrage";
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Bitte alle Pflichtfelder ausfüllen." };
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("[contact] SMTP_USER oder SMTP_PASS nicht gesetzt");
    return { status: "error", message: "E-Mail-Versand nicht konfiguriert." };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.lima-city.de",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: `Leine-Honig Kontakt <${user}>`,
      to: process.env.SMTP_OWNER_EMAIL || user,
      replyTo: `${name} <${email}>`,
      subject: `Kontaktanfrage: ${subject} — ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nAnliegen: ${subject}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Anliegen:</strong> ${subject}</p>
        <hr>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });
  } catch (err) {
    console.error("[contact] Fehler beim Senden:", err);
    return { status: "error", message: "Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut." };
  }

  return { status: "success" };
}
