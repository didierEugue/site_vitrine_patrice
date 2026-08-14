# Chantier Microsoft 365 — Plan d'action

> **Source** : mail Patrice DALLEAU du 31/07/2026 (voir [mail.md](mail.md)), point 1
> « Traitement des e-mails selon ce besoin dans MS 365 ».
> **Client** : CAP CONSEILS / FINEXO AUDIT — Patrice DALLEAU, expert-comptable et
> commissaire aux comptes, La Réunion + relais Madagascar.
> **Cadre** : mission réorientée sur **1 mois**, le temps d'y voir clair dans Pennylane.
> **Rédigé le** : 7 août 2026.

---

## 1. Le besoin, tel qu'exprimé

Trois problèmes distincts sont mélangés dans la demande. Les séparer est la première
condition pour tenir le délai.

| # | Problème | Nature |
|---|---|---|
| A | **Vidage d'une boîte de 48 000 e-mails**, dont 7 000 non lus | Chantier ponctuel, à la main + outillé |
| B | **Faire de la boîte un poste de pilotage** : tri, résumé, rattachement client, brouillon de réponse | Chantier récurrent, outillage + méthode |
| C | **Veille métier centralisée** (Inoreader), matière première des newsletters et publications | Chantier léger, autonome |

Et un quatrième, transverse, qui n'est pas nommé dans le mail mais conditionne tout le
reste : **la conformité** (secret professionnel, RGPD, accès depuis Madagascar).

---

## 2. Avertissement de cadrage — à lire avant de s'engager

La promesse commerciale du mail est plus large que ce que Microsoft 365 Copilot fait
**nativement** aujourd'hui. Il faut le dire avant, pas après.

| Promesse du mail | Réalité Copilot out-of-the-box | Ce qu'il faut ajouter |
|---|---|---|
| « chaque message arrive **trié** » | Copilot ne trie pas dans des dossiers. Il propose un résumé et une **priorisation** de la boîte de réception. | Règles Outlook / Exchange + catégories, à construire |
| « **rattaché au bon client** » | Aucun rattachement automatique à un référentiel client. | Règles sur domaine d'expéditeur, ou agent Copilot Studio branché sur la liste clients |
| « **brouillon de réponse** prêt à valider » | ✅ Natif (*Draft with Copilot*), sur demande de l'utilisateur. | Rien — mais ce n'est pas automatique, il faut cliquer |
| « les **relances ne s'oublient plus** » | Pas de relance automatique native. | Suivi par catégories + To Do / Planner, ou flux Power Automate |
| « les **pièces classées vers la GED**, sans ressaisie » | Aucun classement natif. | Flux Power Automate : pièce jointe → bibliothèque SharePoint du bon client |
| « les **newsletters sorties de la boîte** » | Non natif. | Règles + désabonnements ; c'est Inoreader qui prend le relais |

**Conséquence à assumer** : ce chantier est à **80 % de la configuration, des règles et de
la méthode**, et à 20 % de l'IA. Copilot fait gagner du temps sur la lecture et la
rédaction — pas sur le classement. Vendre l'inverse expose à une déception au premier
rendez-vous de suivi.

**Question à trancher avec Patrice** : le rattachement client automatique est-il dans le
forfait ? S'il l'est, il faut un référentiel client exploitable (export Pennylane) et un
agent Copilot Studio — ce qui n'entre pas dans un mois avec le reste.

---

## 3. Prérequis à vérifier — **avant tout engagement**

À faire dès le premier accès au tenant. Aucun devis ferme tant que ces points ne sont pas
levés.

> **Confirmé par le client (07/08/2026)** : l'abonnement Microsoft 365 **et** les licences
> Copilot sont **déjà souscrits**, formule exacte inconnue. Conséquence : **aucun achat de
> licence à prévoir**, coût logiciel nul. L'argumentaire bascule de « combien ça coûte » vers
> « rentabiliser un abonnement déjà payé ». Le risque n°1 n'est plus le budget, c'est la
> **non-adoption**.

- [ ] **Formule exacte** : Business Basic / Standard / Premium, ou E3 / E5 ? Combien de
      postes ? Déterminant pour l'archive en ligne, la rétention Purview et les connecteurs
      Power Automate — plus pour le budget, qui est déjà engagé.
- [ ] **Copilot** : souscrit ✅ — sur **combien de postes**, et surtout **quel usage réel
      aujourd'hui** ? Une licence payée et inutilisée est le point de départ le plus fréquent.
- [ ] **Taille réelle de la boîte** (Go, pas seulement le nombre de messages) et quota
      restant. Une boîte de 48 000 messages proche du quota se comporte différemment.
- [ ] **Archive en ligne** activée ? Disponible selon la licence — c'est elle qui permet de
      sortir l'historique de la boîte principale sans rien supprimer.
- [ ] **Client Outlook utilisé** : nouveau Outlook, Outlook classique, web, mobile ? Les
      fonctions Copilot diffèrent selon le client.
- [ ] **Boîte unique ou boîtes partagées** ? Une boîte `contact@` partagée change la
      stratégie de tri.
- [ ] **SharePoint** : la GED existe-t-elle déjà ? Quelle arborescence ? Un site par client,
      ou une bibliothèque unique avec métadonnées ?
- [ ] **Résidence des données** du tenant (France / UE / autre) — point de conformité, cf. §8.
- [ ] **Accès depuis Madagascar** : quels comptes, quelles données consultées ? Cf. §8.
- [ ] **Sauvegarde** : existe-t-il une sauvegarde tierce des boîtes ? La corbeille
      Microsoft 365 n'est pas une sauvegarde. **Bloquant avant toute suppression de masse.**

---

## 4. Objectifs mesurables

Sans chiffres de départ, aucun bilan de fin de mission n'est possible. À relever en
phase 0 et à re-mesurer à la fin.

| Indicateur | Départ | Cible |
|---|---|---|
| Messages en boîte de réception | ~48 000 | < 100 (le reste archivé ou classé) |
| Non lus | ~7 000 | 0 |
| Temps quotidien passé dans la messagerie | à mesurer | −30 % à −50 % |
| Pièces comptables ressaisies manuellement | à mesurer | ~0 |
| Newsletters arrivant en boîte de réception | à mesurer | 0 (redirigées vers Inoreader) |
| Microsoft Secure Score du tenant | à relever | +20 points, sans dégrader l'usage |

---

## 5. Le plan, semaine par semaine

### Semaine 1 — État des lieux et décisions structurantes

**5.1 Audit de la boîte (2 jours)**

Ne rien supprimer. Mesurer d'abord.

- Volumétrie par **expéditeur**, par **domaine**, par **année**. Sur 48 000 messages, une
  poignée de domaines (newsletters, notifications, plateformes) représente presque
  toujours la majorité du volume.
- Repérage des messages **avec pièces jointes** (les seuls à valeur comptable).
- Identification des **conversations réellement actives** (< 90 jours).
- Repérage des **fils clients** vs **notifications automatiques** vs **veille**.

*Outillage* : dossiers de recherche Outlook, recherche avancée, et export d'un inventaire
via PowerShell (`Get-MailboxFolderStatistics`) ou Graph si les droits le permettent.

**5.2 Audit de conformité (1 jour)** — cf. §8.

**5.3 Décisions à faire valider par Patrice**

- Arborescence de classement retenue (§6).
- Politique de rétention : **que garde-t-on, combien de temps** ? Un cabinet
  d'expertise comptable a des obligations de conservation ; elles priment sur l'envie de
  faire de la place.
- Périmètre Copilot : Patrice seul, ou l'équipe ?

**5.4 Chiffrage et pistes de financement (0,5 jour)**

Les licences étant déjà souscrites, le budget d'investissement se réduit au **temps de mise
en œuvre**, à l'abonnement Inoreader et à la formation. Pistes de financement à explorer — **à vérifier auprès de Bpifrance et de la
Région Réunion, aucune n'est acquise** : dispositifs de diagnostic numérique / IA,
France Num, et aides régionales à la transformation numérique des TPE-PME ultramarines.

---

### Semaine 2 — Vidage des 48 000 e-mails

**Principe non négociable : on déplace, on ne supprime pas.** Le tri se fait par
soustraction successive, du volume le plus gros au plus fin.

**Étape 1 — Sortir le bruit (gros volumes, faible valeur)**

1. **Newsletters et notifications** : identifier les 20 à 30 domaines les plus volumineux.
   Pour chacun : se désabonner *puis* déplacer l'historique vers un dossier d'archive.
   C'est ici que se gagne le gros du volume.
2. **Notifications de plateformes** (réseaux sociaux, alertes applicatives, accusés
   automatiques) : règle de suppression ou d'archivage à la source.
3. **Fonction *Balayage / Sweep*** d'Outlook : « ne garder que le dernier message de cet
   expéditeur », efficace sur les notifications répétitives.

**Étape 2 — Archiver l'ancien**

Tout ce qui a plus de 24 mois (durée à valider avec Patrice au regard des obligations de
conservation) part vers l'**archive en ligne**, via une **stratégie de rétention MRM**
appliquée automatiquement. Rien n'est perdu : l'archive reste consultable et cherchable.

**Étape 3 — Classer l'actif**

Les messages restants — quelques centaines à quelques milliers — sont classés par client
selon l'arborescence du §6, en s'appuyant sur les règles construites en semaine 3.

**Étape 4 — Les 7 000 non lus**

Un non-lu de plus de 6 mois qui n'a jamais déclenché de relance n'a plus d'objet. Après
extraction des messages avec pièces jointes et des fils clients actifs, marquer le reste
comme lu et l'archiver, en une opération datée et réversible.

> **Garde-fou** : avant toute opération de masse, faire un **export PST complet** ou
> vérifier la sauvegarde tierce. Une opération mal ciblée sur 48 000 messages ne se
> rattrape pas à la main.

---

### Semaine 3 — Architecture, règles et automatisations

**6. Architecture de classement**

Deux modèles possibles. Trancher **avant** de construire quoi que ce soit :

| Modèle | Principe | Avantage | Inconvénient |
|---|---|---|---|
| **A — Dossiers par client** | Un dossier Outlook par client, alimenté par règle sur le domaine expéditeur | Familier, visible, sans licence supplémentaire | Ingérable au-delà de ~100 clients ; un client = plusieurs domaines |
| **B — Catégories + dossiers de recherche** | Boîte à plat, catégorisation par couleur/étiquette, vues dynamiques | Passe à l'échelle, un message peut porter plusieurs étiquettes | Moins intuitif, demande de la formation |

**Recommandation : modèle B**, avec un petit nombre de dossiers de premier niveau
(`À traiter`, `En attente`, `Archive`) et la granularité client portée par les catégories.
Sur un cabinet, le modèle A finit toujours par produire 300 dossiers que personne ne tient.

**Règles de tri**

- Règles **côté serveur** (Exchange), pas côté client : elles s'appliquent même quand
  Outlook est fermé, y compris sur mobile.
- ⚠️ **Limite technique** : Exchange Online plafonne la taille totale des règles d'une
  boîte (256 Ko par défaut, extensible à 256 Ko max côté serveur). Sur un cabinet avec
  beaucoup de clients, ce plafond se heurte vite. C'est l'argument décisif pour le
  modèle B et pour déporter la logique lourde vers Power Automate.

**Extraction des pièces vers la GED**

Flux **Power Automate** : à l'arrivée d'un message avec pièce jointe dans un dossier
surveillé → dépôt du fichier dans la bibliothèque SharePoint du client → renommage
normalisé (`AAAA-MM-JJ_Client_Type_Fournisseur.pdf`) → accusé dans le fil.

Points de vigilance :
- La correspondance **domaine expéditeur → client** doit exister quelque part. Une liste
  SharePoint de référence suffit ; l'idéal serait un export Pennylane.
- Prévoir un dossier **`_À qualifier`** pour tout ce qui n'est pas reconnu. Un flux qui
  classe mal est pire qu'un flux qui ne classe pas.
- **Articulation avec Pennylane** : Pennylane a déjà une adresse de dépôt par dossier.
  Pour les pièces comptables, l'envoi direct vers Pennylane est plus court que le détour
  par SharePoint. **À arbitrer** : SharePoint = documents du cabinet (bilans, rapports,
  juridique) ; Pennylane = pièces comptables courantes. Ne pas dupliquer.

---

### Semaine 4 — Copilot, veille, formation, déploiement

**7.1 Paramétrage Copilot**

- Vérification des prérequis (licence, client Outlook, indexation).
- Activation et contrôle des **limites de partage** : Copilot voit tout ce que
  l'utilisateur a le droit de voir. Un SharePoint mal cloisonné devient une fuite de
  données par la recherche. **Faire le ménage des permissions avant d'activer Copilot,
  jamais après.**
- Cas d'usage retenus, à documenter en fiches courtes :
  - résumé d'un fil de discussion long ;
  - brouillon de réponse à partir d'une consigne en une ligne ;
  - retrouver « ce qu'on a dit à ce client au sujet de X » ;
  - préparation d'un rendez-vous client à partir des échanges récents.
- **Bibliothèque de prompts** du cabinet : 10 à 15 formulations types, écrites avec
  Patrice, dans son vocabulaire métier. C'est ce qui fait la différence entre un Copilot
  utilisé et un Copilot abandonné au bout de trois semaines.

**7.2 Inoreader**

- Création du compte, arborescence de veille : fiscal, social, comptable, audit,
  numérique, actualité Réunion.
- Sources : sites officiels (BOFiP, URSSAF, Ordre, CNCC), presse spécialisée, blogs
  métier, et **les newsletters extraites de la boîte mail** — Inoreader fournit une
  adresse dédiée pour les y rediriger.
- Applications mobile et PC, dossiers de lecture, règles de mise en avant.
- **Chaînage avec le site vitrine** : c'est cette veille qui alimente la rubrique
  Actualités du site (cf. `BRIEF-SITE-VITRINE.md`). Le lien est à établir dès maintenant.

**7.3 Formation**

- 1 session de 2 h avec Patrice, sur sa vraie boîte, pas sur un environnement de démo.
- 1 session courte avec l'équipe si le périmètre dépasse le poste de Patrice.
- **Mémo d'une page** : les 10 gestes quotidiens. Un support de 40 pages ne sera pas lu.

**7.4 Recette et déploiement**

- Test sur une semaine réelle avant bascule complète.
- Vérification que chaque règle et chaque flux a été déclenché au moins une fois.
- Point de contrôle des indicateurs du §4.

---

## 8. Conformité — le volet à ne pas sous-estimer

Le mail parle d'un « audit SCORE de conformité ». **À clarifier avec Patrice** : il s'agit
vraisemblablement du **Microsoft Secure Score** (score de sécurité du tenant) et/ou du
**Gestionnaire de conformité (Compliance Manager)**. Ce sont deux outils différents, les
deux sont pertinents.

**Points à traiter :**

- **Secret professionnel.** L'expert-comptable y est tenu. Toute donnée client qui transite
  par un outil tiers doit être couverte. Copilot traite les données **à l'intérieur du
  périmètre du tenant** et Microsoft s'engage à ne pas les utiliser pour entraîner ses
  modèles — **à vérifier et à documenter** dans les conditions contractuelles en vigueur au
  moment de la mise en œuvre, et à consigner par écrit pour le dossier du cabinet.
- **Accès depuis Madagascar.** ⚠️ **Point le plus sensible du dossier.** Un collaborateur
  situé hors UE qui accède à des données de clients français constitue un **transfert de
  données hors Union européenne**. Il faut : identifier les comptes concernés, encadrer
  contractuellement (clauses contractuelles types), restreindre les accès au strict
  nécessaire, et le mentionner dans le registre des traitements du cabinet. Ce point est
  à traiter **avant** d'ouvrir davantage d'accès, pas après.
- **Registre des traitements** du cabinet : à mettre à jour avec les nouveaux traitements
  (assistance IA à la rédaction, classement automatisé).
- **Durées de conservation** : aligner la rétention Microsoft 365 sur les obligations de
  conservation de la profession. Une stratégie de suppression automatique mal calibrée
  détruirait des pièces à conserver.
- **Sécurité de base**, à vérifier au passage : authentification multifacteur sur tous les
  comptes, comptes d'administration séparés des comptes d'usage, anti-hameçonnage,
  politique de mots de passe, appareils gérés.

---

## 9. Livrables

| # | Livrable | Format |
|---|---|---|
| 1 | Rapport d'audit de la boîte mail et du tenant | PDF |
| 2 | Boîte assainie : < 100 messages en réception, 0 non lu, historique archivé et consultable | Résultat vérifiable |
| 3 | Arborescence de classement + jeu de règles Exchange documenté | Configuration + doc |
| 4 | Flux Power Automate d'extraction des pièces vers la GED | Configuration + doc |
| 5 | Copilot paramétré + bibliothèque de prompts du cabinet | Configuration + fiches |
| 6 | Inoreader configuré, sources et dossiers de veille | Configuration |
| 7 | Rapport de conformité : Secure Score avant/après, points RGPD, recommandations | PDF |
| 8 | Mémo utilisateur d'une page + session de formation | PDF + présentiel/visio |
| 9 | Chiffrage de l'investissement et pistes de financement | PDF |
| 10 | Rendez-vous de suivi mensuels | Récurrent, hors forfait initial |

---

## 10. Risques et points de vigilance

| Risque | Gravité | Parade |
|---|---|---|
| Suppression accidentelle de pièces à conserver | **Élevée** | Export PST préalable ; on archive, on ne supprime pas |
| Copilot ne tient pas la promesse « tri automatique » | **Élevée** | Recadrer maintenant (§2), pas à la livraison |
| **Licence Copilot payée mais jamais adoptée** | **Élevée** | Risque n°1 du dossier : prompts métier, mémo court, suivi mensuel, mesure du gain |
| Formule M365 ne couvrant pas l'archive en ligne | Moyenne | Vérifier en semaine 1 ; repli par dossier d'archive si besoin |
| Accès Madagascar non encadré juridiquement | Élevée | Traiter en semaine 1, cf. §8 |
| Permissions SharePoint trop larges → Copilot expose des données | Élevée | Audit des partages **avant** activation |
| Plafond des règles Exchange atteint | Moyenne | Modèle B (catégories) + Power Automate |
| Double dépôt Pennylane / SharePoint | Moyenne | Arbitrer le périmètre de chaque outil (§6) |
| Un mois est court pour les trois volets | Moyenne | Prioriser A et C ; B peut déborder sur le mois suivant |

---

## 11. Hors forfait — à étudier séparément

Repris du mail, sans engagement de délai :

- **Brief hebdomadaire** des échanges clients (synthèse automatique).
- **CRM structuré** pour les missions de conseil et le suivi commercial — « qui ne repose
  plus sur ta mémoire ». C'est un projet à part entière, pas une option.
- **Newsletters** vers les clients et collaborateurs, alimentées par la veille.
- **Articles et publications** LinkedIn et site web — à connecter avec la rubrique
  Actualités du site vitrine.

Chacun de ces points suppose une charge propre. Les mentionner comme perspectives est
utile ; les laisser croire inclus serait un malentendu coûteux.

---

## 12. Questions à poser à Patrice au prochain point

1. **Copilot** : sur combien de postes, et quel usage réel aujourd'hui ? *(souscrit, confirmé)*
2. **Périmètre humain** : Patrice seul, ou toute l'équipe ? Combien de personnes à La
   Réunion, combien à Madagascar ?
3. **Rattachement client automatique** : dans le forfait, ou en option ? (impact fort, §2)
4. **Répartition Pennylane / SharePoint** pour les pièces : qui reçoit quoi ?
5. **Durée de conservation** souhaitée pour les e-mails, au regard des obligations de la
   profession ?
6. **Sauvegarde** : existe-t-il une sauvegarde tierce des boîtes ?
7. **Accès Madagascar** : quels comptes, quelles données, quel encadrement contractuel
   actuel ?
8. **Priorité si le mois ne suffit pas** : vidage de la boîte, ou mise en place de
   l'assistant ?

---

## Annexe — Place de ce chantier dans la mission

Deux chantiers sont retenus à ce stade :

1. **Microsoft 365 / traitement des e-mails** ← objet du présent rapport.
2. **Modernisation du site internet** — cf. [BRIEF-SITE-VITRINE.md](BRIEF-SITE-VITRINE.md)
   et [README.md](README.md).

**Recoupement utile** : la veille Inoreader mise en place au chantier 1 alimente la
rubrique Actualités du site du chantier 2. Le module d'articles du site est déjà prêt à
la recevoir.
