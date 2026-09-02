# Livrables identité — CAP CONSEILS

Documents demandés par Patrice DALLEAU (mail du 24/08/2026 : « modernisation du logo,
du papier en-tête et de la signature e-mail ») et corrections du 23/08/2026.

## Fichiers

| Fichier | À quoi ça sert | À envoyer au client |
|---|---|---|
| `papier-entete.pdf` | Papier en-tête A4, à imprimer ou à joindre | ✅ oui |
| `papier-entete.docx` | Modèle Word éditable — logo et mentions verrouillés en en-tête / pied de page | ✅ oui |
| `papier-entete.html` | Source des deux précédents | non |
| `signature-email.html` | Signature Outlook + mode d'emploi | ✅ oui |
| `assets/` | Images utilisées par le papier en-tête | non (embarquées dans le PDF) |

## Régénérer le PDF et le DOCX

Après modification de `papier-entete.html` :

```bash
# PDF
google-chrome --headless --no-pdf-header-footer \
  --print-to-pdf=livrables/papier-entete.pdf livrables/papier-entete.html

# DOCX (nécessite python-docx)
python3 scripts/papier-entete-docx.py
```

Le `.docx` est produit par `scripts/papier-entete-docx.py` (python-docx, à lancer
depuis la racine du projet) : le HTML converti par
LibreOffice place l'en-tête dans le corps du document, où l'utilisateur l'écrase en
tapant. Le script pose le logo dans l'en-tête de section et les mentions légales dans
le pied de page, pour que Word les répète sur toutes les pages.

## Points de vigilance

- **Polices** : le `.docx` utilise Calibri, présente sur tous les postes Word. La
  prévisualisation sous LibreOffice tombe en serif faute de la police — le rendu réel
  sous Word est correct.
- **IBAN** : il figure sur le papier en-tête (repris du modèle 2022) mais **ne doit pas
  aller sur le site**. Un IBAN publié en clair alimente les fraudes au faux virement.
- **Signature e-mail** : les deux images doivent être servies depuis une URL publique
  HTTPS. Elles pointent sur `www.capconseils.net` — donc inutilisables tant que le site
  n'est pas en ligne. Ni `data:` ni fichier local ne fonctionnent dans Outlook.
- **Logo** : `public/brand/*.png` est recadré depuis le fichier officiel du client
  (PNG-8, 255 couleurs). Suffisant jusqu'à ~35 mm de large. Au-delà (enseigne, kakémono),
  il faut un vectoriel, à demander au cabinet.
