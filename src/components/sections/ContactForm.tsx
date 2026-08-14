"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

const SUBJECTS = [
  "Devenir client du cabinet",
  "Facturation électronique 2026",
  "Commissariat aux comptes",
  "Accès à mon espace client",
  "Autre demande",
];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-sm border border-paper-300 bg-paper-50 px-4 py-3 text-sm text-ink-900 placeholder:text-slate-400 transition-colors focus:border-brand-600 focus:outline-none";

const label = "label block text-slate-500";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Envoi impossible");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Envoi impossible");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-paper-200 border-t pt-10">
        <p className="label text-brand-600">Bien reçu</p>
        <h3 className="font-display mt-4 text-4xl">Message transmis.</h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
          Nous revenons vers vous sous un jour ouvré. Pour une demande urgente, le standard reste le
          plus rapide.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-paper-200 relative space-y-6 border-t pt-10"
      noValidate
    >
      {/* Piège à robots : invisible pour l'utilisateur, rempli par les bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="site-web">Ne pas remplir</label>
        <input id="site-web" name="siteWeb" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={label}>
            Nom et prénom *
          </label>
          <input id="nom" name="nom" required autoComplete="name" className={`${field} mt-2`} />
        </div>
        <div>
          <label htmlFor="societe" className={label}>
            Société
          </label>
          <input
            id="societe"
            name="societe"
            autoComplete="organization"
            className={`${field} mt-2`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="telephone" className={label}>
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            className={`${field} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sujet" className={label}>
          Sujet
        </label>
        <select id="sujet" name="sujet" defaultValue={SUBJECTS[0]} className={`${field} mt-2`}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Votre message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Activité, forme juridique, effectif, échéance qui approche… tout ce qui nous aidera à préparer l'échange."
          className={`${field} mt-2 resize-y`}
        />
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
        <input
          type="checkbox"
          name="consentement"
          required
          className="accent-ink-900 mt-0.5 h-4 w-4 shrink-0"
        />
        <span>
          J&apos;accepte que ces informations soient utilisées pour traiter ma demande. Elles ne
          sont ni cédées, ni utilisées à des fins commerciales. *
        </span>
      </label>

      {status === "error" ? (
        <p role="alert" className="text-signal-500 text-sm">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
        </Button>
        <span className="label text-slate-400">* Champs obligatoires</span>
      </div>
    </form>
  );
}
