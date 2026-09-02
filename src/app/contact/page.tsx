import type { Metadata } from "next";

import ContactForm from "@/components/sections/ContactForm";
import OfficeMap from "@/components/sections/OfficeMap";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez CAP CONSEILS : premier rendez-vous sans engagement, standard téléphonique, adresse du cabinet à La Réunion.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const coords = [
    { label: "Téléphone", value: site.contact.phone, href: site.contact.phoneHref, mono: true },
    { label: "E-mail", value: site.contact.email, href: `mailto:${site.contact.email}` },
    {
      label: "Siège social",
      value: `${site.contact.address.street}, ${site.contact.address.postalCode} ${site.contact.address.city}`,
    },
  ];

  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Contact"
        family="onde"
        tone="cuivre"
        spin={0.9}
        title={
          <>
            Le premier échange
            <br />
            est <span className="accent text-brand-600">sans engagement</span>.
          </>
        }
        lead="Décrivez votre activité et ce qui vous amène. Nous vous rappelons pour convenir d'un rendez-vous, au cabinet ou en visioconférence."
      />

      <section className="section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <div className="lg:col-span-4 lg:col-start-9">
              <dl className="border-paper-200 border-t">
                {coords.map((c, i) => (
                  <Reveal
                    key={c.label}
                    delay={i * 80}
                    className="border-paper-200 border-b py-5"
                  >
                    <dt className="label text-slate-400">{c.label}</dt>
                    <dd className={`mt-2 ${c.mono ? "numeric text-xl" : "text-sm"}`}>
                      {c.href ? (
                        <a href={c.href} className="text-ink-900 link-underline">
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-slate-600">{c.value}</span>
                      )}
                    </dd>
                  </Reveal>
                ))}
              </dl>

              {/* Horaires d'ouverture */}
              <Reveal delay={260} className="border-paper-200 mt-10 border-t pt-6">
                <p className="label text-slate-400">Horaires d&apos;ouverture</p>
                <dl className="mt-4 space-y-2.5">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 text-sm">
                      <dt className="text-slate-600">{h.days}</dt>
                      <dd className="numeric text-ink-900 text-right text-xs">
                        {h.times.join(" · ")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* Renvoi vers l'espace client */}
              <Reveal delay={340} className="bg-ink-900 text-paper-100 mt-10 p-8">
                <p className="label text-aqua-300">Déjà client</p>
                <p className="font-display text-paper-50 mt-3 text-2xl leading-tight">
                  Passez par votre espace, vous gagnerez un aller-retour.
                </p>
                <a
                  href="/espace-client"
                  className="label text-aqua-300 hover:text-aqua-400 mt-6 inline-block transition-colors"
                >
                  Accéder à mon espace →
                </a>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
      {/* Les quatre bureaux */}
      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Nos bureaux"
            title={
              <>
                Quatre adresses,
                <br />
                une <span className="accent text-brand-600">même équipe</span>.
              </>
            }
            lead="Trois bureaux à La Réunion et un à Paris. Vos interlocuteurs restent les mêmes, quel que soit le site."
          />

          <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {site.offices.map((o, i) => (
              <Reveal
                as="li"
                key={o.slug}
                delay={i * 80}
                className="border-paper-300 border-t pt-6"
              >
                <p className="label text-brand-600">{o.role}</p>
                <h3 className="mt-3 text-2xl">{o.name}</h3>
                <address className="mt-3 text-sm leading-relaxed text-slate-600 not-italic">
                  {o.street}
                  <br />
                  {o.postalCode} {o.city}
                  {o.landmark ? (
                    <>
                      <br />
                      <span className="text-xs text-slate-500">{o.landmark}</span>
                    </>
                  ) : null}
                </address>
              </Reveal>
            ))}
          </ul>

          {/* Carte GPS des bureaux — demandée par le cabinet (mail du 23/08/2026) */}
          <Reveal delay={120} className="mt-16">
            <OfficeMap />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
