import { NextResponse } from "next/server";

/**
 * Réception du formulaire de contact.
 *
 * ⚠️ À BRANCHER AVANT MISE EN LIGNE : aucun e-mail n'est réellement envoyé ici.
 * Le message est validé puis journalisé côté serveur. Pour l'expédition,
 * ajouter un fournisseur (Microsoft Graph via le tenant M365 du cabinet, ou
 * un service transactionnel type Resend / Postmark) à l'endroit indiqué.
 *
 * Le tenant M365 étant déjà en place côté cabinet, Microsoft Graph
 * (`/users/{boîte}/sendMail`) évite un prestataire supplémentaire et garde les
 * échanges dans l'écosystème du cabinet.
 */

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  // TODO(mise en ligne) : remplacer par l'envoi réel.
  console.info("[contact] nouvelle demande", demande);

  return NextResponse.json({ ok: true });
}
