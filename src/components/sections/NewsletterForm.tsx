"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

/**
 * Collecte des inscriptions à la lettre du cabinet.
 *
 * Reprise de la page `/newsletter` de l'ancien site. Elle prend ici la forme
 * d'un bloc posé en bas des actualités plutôt que d'une page à elle seule :
 * une page dont le seul contenu est un champ e-mail ne se justifie pas, et
 * l'inscription se décide après la lecture, pas avant.
 *
 * L'architecture éditoriale prévue est : veille Inoreader → articles du site →
 * lettre mensuelle. Cette liste en est le point de sortie.
 */

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper-50 placeholder:text-paper-200/40 transition-colors focus:border-aqua-300 focus:outline-none";

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Inscription impossible");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Inscription impossible");
    }
  }

  if (status === "sent") {
    return (
      <div>
        <p className="label text-aqua-300">Inscription enregistrée</p>
        <p className="font-display text-paper-50 mt-4 text-3xl">À bientôt dans votre boîte.</p>
        <p className="text-paper-200/60 mt-4 max-w-sm text-sm leading-relaxed">
          Une lettre par mois, pas davantage. Désinscription en un clic depuis n&apos;importe quel
          envoi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md" noValidate>
      {/* Piège à robots, même principe que le formulaire de contact. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="newsletter-site">Ne pas remplir</label>
        <input id="newsletter-site" name="siteWeb" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Votre adresse e-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="prenom@entreprise.re"
          className={field}
        />
        <Button type="submit" variant="light" disabled={status === "sending"} className="shrink-0">
          {status === "sending" ? "Envoi…" : "M'inscrire"}
        </Button>
      </div>

      <label className="text-paper-200/55 mt-5 flex items-start gap-3 text-xs leading-relaxed">
        <input
          type="checkbox"
          name="consentement"
          required
          className="accent-aqua-400 mt-0.5 h-4 w-4 shrink-0"
        />
        <span>
          J&apos;accepte de recevoir la lettre du cabinet. Mon adresse n&apos;est ni cédée, ni
          revendue, et je peux me désinscrire à tout moment.
        </span>
      </label>

      {status === "error" ? (
        <p role="alert" className="text-signal-400 mt-4 text-sm">
          {error}
        </p>
      ) : null}
    </form>
  );
}
