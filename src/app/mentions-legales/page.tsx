import type { Metadata } from "next";

import LegalPage from "@/components/sections/LegalPage";
import { site, TODO } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site capconseils.net — éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      family="pebble"
      draft
      eyebrow="Informations légales"
      title="Mentions légales"
      lead="Éditeur du site, hébergement, propriété intellectuelle et mentions propres aux professions réglementées."
      updatedAt="août 2026"
      sections={[
        {
          title: "Éditeur du site",
          body: (
            <>
              <p>
                Le présent site est édité par <strong>CAP CONSEILS</strong>, société d&apos;expertise
                comptable, et <strong>FINEXO AUDIT</strong>, société de commissariat aux comptes.
              </p>
              <ul className="space-y-1.5">
                <li>
                  Dénomination : {site.legal.entity} — {site.legal.form},{" "}
                  {site.legal.activity.toLowerCase()}
                </li>
                <li>Capital social : {site.legal.capital}</li>
                <li>
                  Siège social : {site.contact.address.street},{" "}
                  {site.contact.address.postalCode} {site.contact.address.city}
                </li>
                <li>SIREN : {site.legal.siren}</li>
                <li>Numéro de TVA intracommunautaire : {TODO}</li>
                <li>Téléphone : {site.contact.phone}</li>
                <li>E-mail : {site.contact.email}</li>
                <li>Directeur de la publication : Patrice DALLEAU</li>
              </ul>
            </>
          ),
        },
        {
          title: "Professions réglementées",
          body: (
            <>
              <p>
                CAP CONSEILS est inscrite au tableau de l&apos;Ordre des experts-comptables (conseil
                régional de La Réunion, numéro d&apos;inscription : {TODO}). L&apos;activité est soumise
                au code de déontologie des professionnels de l&apos;expertise comptable.
              </p>
              <p>
                FINEXO AUDIT est inscrite sur la liste des commissaires aux comptes auprès de la
                Compagnie régionale des commissaires aux comptes de Saint-Denis de La Réunion
                (numéro : {TODO}), sous le contrôle de la Haute
                autorité de l&apos;audit.
              </p>
              <p>
                Assurance responsabilité civile professionnelle : {TODO} — couverture applicable à
                l&apos;ensemble du territoire français.
              </p>
            </>
          ),
        },
        {
          title: "Hébergement",
          body: (
            <p>
              Le site est hébergé par {TODO}. Coordonnées complètes de l&apos;hébergeur : {TODO}.
            </p>
          ),
        },
        {
          title: "Propriété intellectuelle",
          body: (
            <>
              <p>
                L&apos;ensemble des contenus du site — textes, structure, identité visuelle, marque
                et logo — est protégé par le droit d&apos;auteur et le droit des marques. Toute
                reproduction ou représentation, totale ou partielle, sans autorisation écrite
                préalable est interdite.
              </p>
              <p>
                Les liens vers ce site sont libres, sous réserve de ne pas porter atteinte à
                l&apos;image du cabinet et de ne pas s&apos;inscrire dans une page pouvant prêter à
                confusion sur l&apos;origine du contenu.
              </p>
            </>
          ),
        },
        {
          title: "Liens vers des services tiers",
          body: (
            <p>
              L&apos;espace client renvoie vers Pennylane et vers le SharePoint du cabinet
              (Microsoft 365). Ces plateformes sont exploitées par leurs éditeurs respectifs et
              soumises à leurs propres conditions d&apos;utilisation et politiques de
              confidentialité. Le cabinet n&apos;est pas responsable de leur disponibilité.
            </p>
          ),
        },
        {
          title: "Responsabilité",
          body: (
            <p>
              Les informations publiées sur ce site, notamment les articles d&apos;actualité, ont une
              portée générale et ne constituent pas un conseil personnalisé. Elles ne sauraient
              engager la responsabilité du cabinet en cas d&apos;application à une situation
              particulière sans consultation préalable. La réglementation évoluant, la date de
              publication de chaque article fait foi.
            </p>
          ),
        },
      ]}
    />
  );
}
