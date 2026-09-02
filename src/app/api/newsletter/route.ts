import { NextResponse } from "next/server";

/**
 * Inscription à la lettre du cabinet.
 *
 * ⚠️ À BRANCHER AVANT MISE EN LIGNE : l'adresse est validée puis journalisée,
 * rien n'est encore persisté. Deux options selon ce que retient le cabinet :
 *
 * - liste de diffusion Microsoft 365 (le tenant existe déjà) — l'adresse est
 *   ajoutée via Microsoft Graph, l'envoi se fait depuis Outlook ;
 * - service d'emailing dédié (Brevo, Listmonk auto-hébergé) si le cabinet veut
 *   des statistiques d'ouverture et un lien de désinscription géré.
 *
 * Dans les deux cas, le double opt-in est à prévoir : la case cochée ici ne
 * vaut pas confirmation de l'adresse.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Piège à robots : rempli, on répond succès sans rien enregistrer.
  if (typeof body.siteWeb === "string" && body.siteWeb.trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "inconnue";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 422 });
  }

  if (!body.consentement) {
    return NextResponse.json({ error: "Le consentement est requis." }, { status: 422 });
  }

  // TODO(mise en ligne) : remplacer par l'ajout réel à la liste de diffusion.
  console.info("[newsletter] inscription", { email, recuLe: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
