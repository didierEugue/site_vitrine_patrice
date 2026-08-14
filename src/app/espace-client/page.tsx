import type { Metadata } from "next";

import CtaBlock from "@/components/sections/CtaBlock";
import PortalPanels from "@/components/sections/PortalPanels";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Espace client",
  description:
    "Accédez à Pennylane pour votre comptabilité et au SharePoint du cabinet pour vos documents. Dépôt des pièces, bilans, rapports de mission.",
  alternates: { canonical: "/espace-client" },
};

const WHAT_TO_SEND = [
  "Factures d'achat et notes de frais",
  "Factures de vente émises",
  "Relevés bancaires non synchronisés",
  "Contrats, baux et documents juridiques",
  "Justificatifs de paie et déclarations sociales",
  "Tout document reçu de l'administration",
];

const HELP = [
  {
    title: "Mot de passe oublié",
    body: "Utilisez le lien de réinitialisation du portail concerné. Si l'adresse e-mail associée n'est plus valide, contactez le cabinet.",
    cta: { label: "Écrire au cabinet", href: `mailto:${site.contact.email}` },
  },
  {
    title: "Ajouter un collaborateur",
    body: "Chaque personne dispose de son propre accès, avec les droits correspondant à son rôle. La demande passe par votre interlocuteur.",
    cta: { label: "Faire la demande", href: "/contact" },
  },
  {
    title: "Un doute sur un e-mail",
    body: "En cas de message suspect se réclamant du cabinet, ne cliquez pas et appelez-nous directement.",
    cta: { label: site.contact.phone, href: site.contact.phoneHref },
  },
];

export default function ClientAreaPage() {
  return (
    <>
      {/* En-tête : les portails sont l'objet principal de la page */}
      <header className="grid-paper border-paper-200 relative overflow-hidden border-b">
        <Container className="relative pt-[calc(var(--header-h)+4.5rem)] pb-16">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Eyebrow index="01">Espace client</Eyebrow>
              <h1 className="mt-7 text-[clamp(2.6rem,6.4vw,4.8rem)]">
                Vos outils,
                <br />
                au <span className="accent text-brand-600">même endroit</span>.
              </h1>
              <p className="mt-7 max-w-xl leading-relaxed text-slate-600">
                Le cabinet travaille avec deux plateformes. Pennylane porte la comptabilité
                courante et le dépôt de vos pièces ; le SharePoint du cabinet héberge vos documents
                et vos livrables. Vos identifiants vous sont remis à l&apos;ouverture du dossier.
              </p>
            </Reveal>

            {/* Repère chiffré plutôt qu'une illustration de plus. */}
            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
              <dl className="border-paper-300 border-t pt-6">
                <dt className="label text-slate-400">Plateformes du cabinet</dt>
                <dd className="numeric text-ink-900 mt-3 text-6xl">02</dd>
                <dd className="mt-4 text-sm text-slate-500">
                  Pennylane pour la comptabilité, SharePoint pour les documents.
                </dd>
              </dl>
            </Reveal>
          </div>
        </Container>
      </header>

      <div className="bg-paper-200 border-paper-200 border-b">
        <Container className="px-0! sm:px-0!">
          <PortalPanels />
        </Container>
      </div>

      {/* Avertissement sécurité */}
      <Container>
        <Reveal className="border-paper-200 flex flex-col gap-4 border-b py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            Les accès sont <strong className="text-ink-900 font-medium">nominatifs</strong> : ils ne
            se partagent pas entre collaborateurs. Le cabinet ne vous demandera jamais votre mot de
            passe, ni par téléphone, ni par e-mail.
          </p>
          <Button href="/contact" variant="solid" className="shrink-0">
            Demander un accès
          </Button>
        </Reveal>
      </Container>

      {/* Rythme mensuel */}
      <section className="section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="02">Le rythme mensuel</Eyebrow>
                <h2 className="mt-7 text-[clamp(2.1rem,4.4vw,3.2rem)]">
                  Vos pièces avant le{" "}
                  <span className="numeric text-brand-600">{site.monthlyDeadline}</span> du mois.
                </h2>
                <p className="mt-7 max-w-md leading-relaxed text-slate-600">
                  Le dépôt régulier de vos pièces comptables permet à notre équipe de mettre à jour
                  mensuellement votre comptabilité et de respecter les délais de transmission de vos
                  déclarations fiscales.
                </p>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-500">
                  Dans Pennylane, l&apos;envoi par e-mail à l&apos;adresse dédiée de votre dossier
                  évite toute manipulation. Une photo nette du justificatif suffit.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={120}>
                <p className="label text-slate-400">Ce qui doit nous parvenir</p>
                <ul className="border-paper-200 mt-6 border-t">
                  {WHAT_TO_SEND.map((item, i) => (
                    <li
                      key={item}
                      className="border-paper-200 flex items-baseline gap-5 border-b py-4"
                    >
                      <span className="numeric text-slate-400 text-[0.65rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Aide */}
      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <SectionHeading index="03" eyebrow="Aide" title="Un blocage sur vos accès ?" />

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {HELP.map((h, i) => (
              <Reveal key={h.title} delay={i * 90} className="border-paper-300 border-t pt-7">
                <h3 className="text-xl">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{h.body}</p>
                <a href={h.cta.href} className="label text-ink-900 link-underline mt-6 inline-block">
                  {h.cta.label} →
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBlock
        title={
          <>
            Pas encore
            <br />
            <span className="accent">d&apos;espace client</span> ?
          </>
        }
        lead="L'ouverture des accès Pennylane et SharePoint fait partie de la mise en route de votre dossier."
      />
    </>
  );
}
