import { NextResponse } from "next/server";

import { site } from "@/content/site";

/**
 * Réception du formulaire de contact.
 *
 * ⚠️ AUCUN FOURNISSEUR D'ENVOI N'EST ENCORE BRANCHÉ. Tant que les variables
 * d'environnement Microsoft Graph sont absentes, la route refuse la demande et
 * renvoie les coordonnées directes du cabinet, au lieu d'accuser réception d'un
 * message qui n\'irait nulle part : un prospect à qui l\'on promet une réponse
 * qui ne viendra jamais est pire qu\'un formulaire indisponible.
 *
 * Le tenant M365 étant déjà en place côté cabinet, Microsoft Graph
 * (`/users/{boîte}/sendMail`) évite un prestataire supplémentaire et garde les
 * échanges dans l'écosystème du cabinet. Voir `.env.example`.
 */

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Le formulaire n'est ouvert que si un fournisseur d'envoi est réellement
 * configuré. Les quatre variables vont ensemble : une seule manquante et
 * l'appel Graph échouerait à l'exécution.
 */
function mailProviderConfigured() {
  return Boolean(
    process.env.MS_GRAPH_TENANT_ID &&
      process.env.MS_GRAPH_CLIENT_ID &&
      process.env.MS_GRAPH_CLIENT_SECRET &&
      process.env.CONTACT_MAILBOX,
  );
}

/** Coordonnées renvoyées au visiteur quand l'envoi est indisponible. */
const FALLBACK = {
  phone: site.contact.phone,
  phoneHref: site.contact.phoneHref,
  email: site.contact.email,
} as const;

/** Limitation basique par IP : suffisant pour un site vitrine sans back-office. */
const HITS = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = HITS.get(ip);

  if (!entry || now > entry.resetAt) {
    HITS.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Le piège à robots doit rester vide.
  if (str(body.siteWeb)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "inconnue";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes envoyées. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const nom = str(body.nom);
  const email = str(body.email);
  const message = str(body.message);

  if (nom.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Merci de vérifier votre nom, votre e-mail et votre message." },
      { status: 422 },
    );
  }

  if (!body.consentement) {
    return NextResponse.json({ error: "Le consentement est requis." }, { status: 422 });
  }

  const demande = {
    nom,
    email,
    societe: str(body.societe),
    telephone: str(body.telephone),
    sujet: str(body.sujet) || "Autre demande",
    message: message.slice(0, 5000),
    recuLe: new Date().toISOString(),
  };

  if (!mailProviderConfigured()) {
    // Journalisé pour ne pas perdre la demande côté exploitation, mais le
    // visiteur doit savoir que personne ne l'a reçue.
    console.warn("[contact] envoi indisponible — aucun fournisseur configuré", demande);

    return NextResponse.json(
      {
        error:
          "L'envoi du formulaire n'est pas encore actif. Contactez-nous directement, " +
          "nous répondons aussi vite.",
        fallback: FALLBACK,
      },
      { status: 503 },
    );
  }

  // TODO(mise en ligne) : envoi via Microsoft Graph /users/{boîte}/sendMail.
  console.info("[contact] nouvelle demande", demande);

  return NextResponse.json({ ok: true });
}
