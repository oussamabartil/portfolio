# Portfolio — Oussama Bartil

Portfolio personnel construit avec **Next.js 14 (App Router)**, **TypeScript** et **Tailwind CSS**. Design "developer portfolio" sombre, accent cyan/turquoise, carte façon éditeur de code dans le hero.

## Stack technique

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS (utilitaires ciblés : `sr-only`, focus states — le design principal reste en CSS custom dans `app/globals.css` pour préserver le rendu pixel-perfect du prototype original)
- [next-themes](https://github.com/pacocoursey/next-themes) pour le dark mode
- `next/font` (Space Grotesk + IBM Plex Mono) pour l'auto-hébergement des polices
- [Resend](https://resend.com/) pour l'envoi d'emails depuis le formulaire de contact (API route Next.js)

## Structure du projet

```
app/
  layout.tsx           # <head>, polices, metadata SEO, ThemeProvider, Nav/Footer
  page.tsx              # Assemble les sections de la page d'accueil
  globals.css           # Design system (variables CSS clair/sombre + styles des sections)
  sitemap.ts            # sitemap.xml généré automatiquement
  robots.ts             # robots.txt généré automatiquement
  api/contact/route.ts  # Reçoit le formulaire de contact et envoie l'email via Resend

public/
  favicon.svg          # Favicon
  og-image.svg         # Image de partage (og:image)
  cv.pdf               # CV téléchargeable (bouton nav + section Contact)

components/
  Nav.tsx, Hero.tsx, About.tsx, Stack.tsx,
  Experience.tsx, Education.tsx, Projects.tsx,
  Contact.tsx, ContactForm.tsx, Footer.tsx,
  ThemeToggle.tsx, ThemeProvider.tsx, Reveal.tsx, icons.tsx

data/
  profile.ts       # Identité, texte du hero, texte "À propos", faits clés
  stack.ts         # Liste des technologies (bandeau défilant)
  experience.ts    # Expériences professionnelles
  education.ts     # Parcours académique
  projects.ts      # Projets techniques
```

Pour modifier le contenu du site (nouvelle expérience, nouveau projet, changement de texte...), il suffit d'éditer le fichier correspondant dans `data/` — aucun JSX à toucher.

## Lancer le projet en local

Prérequis : [Node.js](https://nodejs.org/) 18.17+.

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

### Activer le formulaire de contact (optionnel)

Sans configuration, le formulaire de contact répond avec un message d'erreur clair ("pas encore configuré") au lieu de planter — le site reste utilisable, mais le formulaire n'envoie rien. Pour l'activer :

1. Créez un compte sur [resend.com](https://resend.com/) et récupérez une clé API.
2. Copiez `.env.example` en `.env.local` et renseignez `RESEND_API_KEY` (et éventuellement `CONTACT_TO_EMAIL` si vous voulez recevoir les messages ailleurs que sur l'email défini dans `data/profile.ts`).
3. Redémarrez `npm run dev`.

Par défaut, les emails partent de `onboarding@resend.dev` (adresse de test fournie par Resend, aucune configuration de domaine nécessaire). Pour envoyer depuis votre propre domaine, vérifiez-le dans le tableau de bord Resend et mettez à jour le champ `from` dans `app/api/contact/route.ts`.

Autres commandes utiles :

```bash
npm run build   # build de production
npm run start   # sert le build de production localement
npm run lint    # vérifie le code avec ESLint
```

## Déployer sur Vercel

1. Poussez ce projet sur un dépôt GitHub (ou GitLab/Bitbucket).
2. Sur [vercel.com](https://vercel.com), cliquez sur **New Project** et importez le dépôt.
3. Vercel détecte automatiquement Next.js — aucune configuration supplémentaire n'est nécessaire (build command `next build`, output géré automatiquement).
4. Cliquez sur **Deploy**. Le site sera disponible sur une URL `*.vercel.app`, avec possibilité d'ajouter un domaine personnalisé (ex. `oussamabartil.com`) dans les réglages du projet.

### Avant de déployer en production

- Mettre à jour `siteUrl` dans [`data/profile.ts`](data/profile.ts) avec le domaine réel une fois qu'il est connu (utilisé pour les métadonnées SEO, le sitemap et le robots.txt).
- Vérifier les informations de contact (email, téléphone, liens GitHub/LinkedIn) dans le même fichier.
- `public/og-image.svg` est un placeholder au format SVG. Certaines plateformes (Twitter/X, LinkedIn) n'affichent pas correctement les images `og:image` en SVG : exportez-le en PNG (1200×630) avant le lancement officiel et mettez à jour le chemin dans `app/layout.tsx` (`openGraph.images` / `twitter.images`).
- Ajoutez `RESEND_API_KEY` (et `CONTACT_TO_EMAIL` si besoin) dans **Project Settings → Environment Variables** sur Vercel pour que le formulaire de contact fonctionne en production — voir la section précédente.
- Remplacez `public/cv.pdf` si votre CV change (le bouton de téléchargement pointe directement dessus, aucun code à modifier).

## Accessibilité

- Lien d'évitement ("Aller au contenu principal") pour la navigation clavier.
- États `:focus-visible` visibles sur tous les liens et boutons interactifs.
- Icônes décoratives marquées `aria-hidden`, labels explicites (`aria-label`) sur les liens sociaux.
- Respecte `prefers-reduced-motion` (désactive les animations pour les utilisateurs qui le demandent).

---

## Fonctionnalités ajoutées pour la recherche de stage (PFE)

- **CV téléchargeable** — bouton dans la nav (icône) et dans la section Contact, pointant vers `public/cv.pdf`.
- **Formulaire de contact fonctionnel** — `components/ContactForm.tsx` + `app/api/contact/route.ts`, validation serveur, honeypot anti-spam, envoi d'email via Resend (voir "Activer le formulaire de contact" plus haut).
- **Animations au scroll** — `components/Reveal.tsx` (basé sur `IntersectionObserver`, sans dépendance externe) : fade + slide-up discret sur les sections et cartes, avec un léger décalage entre les cartes d'une même grille. Désactivé automatiquement si l'utilisateur a `prefers-reduced-motion` activé.

## Autres idées pour la suite

- Menu mobile réel (actuellement les liens de nav sont simplement masqués sous 800px).
- Petites preuves sociales dans "À propos" (ex. badge "3 stages complétés", lien vers des recommandations LinkedIn).
- Mode "impression" propre pour la page si un recruteur veut l'imprimer directement depuis le navigateur.
