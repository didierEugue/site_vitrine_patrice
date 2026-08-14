import type { Metadata } from "next";

import LegalPage from "@/components/sections/LegalPage";
import { site, TODO } from "@/content/site";

export const metadata: Metadata = {
  title: "Confidentialité & cookies",
  description:
    "Traitement des données personnelles, durées de conservation, droits RGPD et politique de cookies du site capconseils.net.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      draft
      eyebrow="Données personnelles"
      title="Confidentialité & cookies"
      lead="Quelles données nous collectons, pourquoi, combien de temps nous les conservons, et comment exercer vos droits."
      updatedAt="août 2026"
      sections={[
        {
          title: "Responsable de traitement",
          body: (
            <p>
              Le responsable de traitement est {site.legalName}, {site.contact.address.street},{" "}
              {site.contact.address.postalCode} {site.contact.address.city}. Pour toute question relative à vos données :{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-brand-600 underline underline-offset-4"
              >
                {site.contact.email}
              </a>
              . Délégué à la protection des données, le cas échéant : {TODO}.
            </p>
          ),
        },
        {
          title: "Données collectées et finalités",
          body: (
            <>
              <p>Le site collecte uniquement les données que vous nous transmettez :</p>
              <ul className="space-y-1.5">
                <li>
                  <strong>Formulaire de contact</strong> : nom, société, e-mail, téléphone, sujet et
                  message. Finalité : répondre à votre demande et, le cas échéant, préparer une
                  proposition de mission. Base légale : mesures précontractuelles et intérêt
                  légitime.
                </li>
                <li>
                  <strong>Journaux techniques du serveur</strong> : adresse IP et données de
                  connexion, conservées pour la sécurité du site. Base légale : intérêt légitime.
                </li>
              </ul>
              <p>
                Aucune donnée n&apos;est vendue, louée ou cédée à des tiers à des fins commerciales.
                Aucun profilage n&apos;est réalisé.
              </p>
            </>
          ),
        },
        {
          title: "Données traitées dans le cadre des missions",
          body: (
            <p>
              Les données comptables, fiscales et sociales que vous nous confiez dans le cadre
              d&apos;une mission ne transitent pas par ce site : elles sont traitées dans Pennylane
              et dans le SharePoint du cabinet, sous contrat de sous-traitance avec leurs éditeurs.
              Les conditions de ces traitements sont détaillées dans votre lettre de mission.
            </p>
          ),
        },
        {
          title: "Durées de conservation",
          body: (
            <ul className="space-y-1.5">
              <li>Demandes de contact sans suite : 12 mois à compter du dernier échange.</li>
              <li>
                Demandes ayant abouti à une mission : durée de la relation contractuelle, puis
                archivage selon les obligations légales de la profession.
              </li>
              <li>Journaux techniques : 12 mois maximum.</li>
            </ul>
          ),
        },
        {
          title: "Vos droits",
          body: (
            <>
              <p>
                Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
                limitation, d&apos;opposition et de portabilité sur vos données. Vous pouvez les
                exercer à l&apos;adresse indiquée ci-dessus, en justifiant de votre identité.
              </p>
              <p>
                Ces droits s&apos;exercent sous réserve des obligations légales de conservation
                propres aux professions d&apos;expert-comptable et de commissaire aux comptes. En cas
                de désaccord persistant, vous pouvez saisir la CNIL (www.cnil.fr).
              </p>
            </>
          ),
        },
        {
          title: "Cookies et mesure d'audience",
          body: (
            <>
              <p>
                En l&apos;état, ce site ne dépose{" "}
                <strong>aucun cookie de mesure d&apos;audience ni de publicité</strong>. Aucun
                traceur tiers n&apos;est chargé, et aucun bandeau de consentement n&apos;est donc
                requis.
              </p>
              <p>
                Si une solution de mesure d&apos;audience est ajoutée ultérieurement, elle sera soit
                configurée en mode exempté de consentement, soit accompagnée d&apos;un bandeau
                permettant un refus aussi simple que l&apos;acceptation. Cette page sera mise à jour
                en conséquence.
              </p>
              <p>
                Les portails Pennylane et SharePoint, accessibles depuis l&apos;espace client,
                déposent leurs propres cookies une fois que vous y êtes redirigé. Ils relèvent de la
                politique de confidentialité de leurs éditeurs.
              </p>
            </>
          ),
        },
        {
          title: "Sécurité",
          body: (
            <p>
              Le site est servi exclusivement en HTTPS. Les demandes issues du formulaire sont
              transmises à une boîte professionnelle du cabinet. Le cabinet ne vous demandera jamais
              vos identifiants ou mots de passe par e-mail ou par téléphone : en cas de message
              suspect, contactez-nous au {site.contact.phone}.
            </p>
          ),
        },
      ]}
    />
  );
}
