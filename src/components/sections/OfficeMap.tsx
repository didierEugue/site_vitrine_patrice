"use client";

import { useState } from "react";

import { site } from "@/content/site";

/**
 * Carte GPS des bureaux — demandée par le cabinet (mail du 23/08/2026, point 4).
 *
 * Fond de carte OpenStreetMap, chargé en `iframe` : aucun script tiers, aucune
 * clé d'API, aucun cookie publicitaire — la CSP n'ouvre que `frame-src` vers
 * openstreetmap.org. La carte n'est montée qu'après un clic de l'internaute
 * (`consent`), pour ne pas appeler un domaine tiers sans son accord.
 */

/** Demi-largeur de la fenêtre de carte, en degrés (~500 m). */
const SPAN = 0.006;

function embedUrl(lat: number, lon: number) {
  const bbox = [lon - SPAN, lat - SPAN / 2, lon + SPAN, lat + SPAN / 2]
    .map((n) => n.toFixed(5))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
}

function directionsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function OfficeMap() {
  type Slug = (typeof site.offices)[number]["slug"];
  const [active, setActive] = useState<Slug>(site.offices[0].slug);
  const [consent, setConsent] = useState(false);

  const office = site.offices.find((o) => o.slug === active) ?? site.offices[0];
  const address = `${office.street}, ${office.postalCode} ${office.city}`;

  return (
    <div>
      {/* Sélecteur de bureau */}
      <div role="tablist" aria-label="Choisir un bureau" className="flex flex-wrap gap-2">
        {site.offices.map((o) => {
          const selected = o.slug === active;
          return (
            <button
              key={o.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(o.slug)}
              className={`label rounded-sm border px-4 py-2.5 text-[0.6rem] transition-colors duration-300 ${
                selected
                  ? "bg-ink-900 border-ink-900 text-paper-50"
                  : "border-paper-300 text-slate-600 hover:text-ink-900"
              }`}
            >
              {o.name}
            </button>
          );
        })}
      </div>

      <div className="border-paper-300 mt-6 overflow-hidden rounded-sm border">
        {consent ? (
          <iframe
            key={office.slug}
            title={`Carte — bureau de ${office.name}`}
            src={embedUrl(office.coords.lat, office.coords.lon)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="block h-[22rem] w-full border-0 sm:h-[26rem]"
          />
        ) : (
          <div className="bg-paper-100 flex h-[22rem] flex-col items-center justify-center gap-5 px-6 text-center sm:h-[26rem]">
            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              La carte est fournie par OpenStreetMap. L&apos;afficher établit une connexion vers
              openstreetmap.org.
            </p>
            <button
              type="button"
              onClick={() => setConsent(true)}
              className="label bg-ink-900 text-paper-50 rounded-sm px-6 py-3.5 transition-opacity hover:opacity-90"
            >
              Afficher la carte
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
        <address className="text-sm leading-relaxed text-slate-600 not-italic">
          <strong className="text-ink-900 font-medium">{office.name}</strong> — {address}
          {office.landmark ? (
            <>
              <br />
              <span className="text-xs text-slate-500">{office.landmark}</span>
            </>
          ) : null}
        </address>
        <a
          href={directionsUrl(`${site.name} ${address}`)}
          target="_blank"
          rel="noreferrer noopener"
          className="label text-ink-900 link-underline"
        >
          Itinéraire →
        </a>
      </div>
    </div>
  );
}
