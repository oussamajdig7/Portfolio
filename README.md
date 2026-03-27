# Portfolio Personnel — React + Vite

Portfolio moderne, performant et responsive, construit avec React, Vite, Tailwind CSS et Framer Motion.

## Démo en ligne
- Live demo : https://oussamajdig.netlify.app/

## Stack
- React 18 + Vite 6
- Tailwind CSS 3
- Framer Motion 11
- React Router 7
- Three.js + @react-three/fiber + @react-three/drei
- Zustand (state), EmailJS (contact), Lucide (icônes)

## Fonctionnalités clés
- Sections: Hero, About, Skills, Projects, Timeline, Contact
- Navigation sticky avec défilement fluide et section active
- Mode sombre persistant
- Animations soignées (entrées, hover, micro-interactions)
- Écran de chargement, bouton “Back to Top”

## Démarrer
### Prérequis
- Node.js et npm installés

### Installation
```bash
npm install
```

### Scripts
- Dev: `npm run dev`
- Build: `npm run build`
- Preview (après build): `npm run preview`
- Lint: `npm run lint`

## Structure du projet
- `src/components/sections/` : sections du site
- `src/data/` : données du portfolio (nom, liens, projets, compétences, timeline…)
- `public/` : assets statiques et config Netlify si utilisée

## Personnalisation
- Mets à jour les infos et contenus dans `src/data/`.
- Adapte les sections dans `src/components/sections/` selon tes besoins.
- Styles via Tailwind classes et utilitaires.

## Build & Déploiement
- Le build de production est généré dans `dist/`.
- Netlify recommandé : SPA redirect via `public/netlify.toml`.

## Licence
- Usage personnel/portfolio. Ajuste selon ton besoin.
