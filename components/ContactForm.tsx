"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.error || "Une erreur est survenue.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="cf-row">
        <label className="cf-field">
          <span>Nom</span>
          <input type="text" name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label className="cf-field">
          <span>Email</span>
          <input type="email" name="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>
      <label className="cf-field">
        <span>Message</span>
        <textarea name="message" required maxLength={5000} rows={5} />
      </label>

      {/* Honeypot field: kept off-screen and out of tab order, real users never fill it in */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="cf-honeypot"
      />

      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Envoyer le message"}
      </button>

      <div className="cf-status" aria-live="polite">
        {status === "success" && (
          <p className="cf-success">Message envoyé — merci, je réponds rapidement !</p>
        )}
        {status === "error" && <p className="cf-error">{errorMsg}</p>}
      </div>
    </form>
  );
}
