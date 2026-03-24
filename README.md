# Portfolio personnel (React + Vite)

Portfolio moderne et responsive construit avec React, Vite, Tailwind CSS et Framer Motion.

## Fonctionnalités
- Sections : Hero, About, Skills, Projects, Timeline, Contact
- Barre de navigation fixe avec défilement fluide et section active
- Mode sombre (persistant)
- Animations avec Framer Motion et interactions au survol
- Écran de chargement et bouton de retour en haut

## Prérequis
- Node.js et npm

## Installation et utilisation

Installer les dépendances :
```bash
npm install
```

Lancer le serveur de développement :
```bash
npm run dev
```

Générer le build de production :
```bash
npm run build
```

Prévisualiser le build :
```bash
npm run preview
```

Lint:
```bash
npm run lint
```

## Personnalisation
- Modifie les données du portfolio dans `src/data/portfolio.js` (nom, liens, projets, compétences, timeline, etc.).
- Consulte les composants des sections dans `src/components/sections/`.

## Deploy
- Vite génère les fichiers dans `dist/`.
- Si tu utilises Netlify, la redirection SPA est dans `public/netlify.toml`.
