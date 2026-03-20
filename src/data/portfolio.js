import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import chambreImage from "@/assets/chambreArtisana.png";
import universitaireImage from "@/assets/universitaire.png";

export const portfolio = {
  name: "Oussama Jdig",
  title: "Full Stack Developer",
  intro:
    "I build fast, accessible web experiences with React, JavaScript, and a strong focus on UI polish.",
  location: "Agadir, Morocco",
  email: "oussamajdig7@gmail.com",
  socials: [
    { label: "Email", href: "mailto:oussamajdig7@gmail.com", Icon: Mail },
    { label: "GitHub", href: "https://github.com/oussamajdig7", Icon: Github },
    { label: "Instagram", href: "https://www.instagram.com/4_5fp?igsh=MTd6d3pqcGs0ZDFmNw==", Icon: Instagram },
  ],
  profileImageSrc: profileImage,
  bannerImageSrc: "#",
  projects: [
    {
      title: "Chambre Artisana - Plateforme Web",
      description:
        "Plateforme web moderne développée avec Laravel pour la Chambre d'Artisanat. Elle permet aux artisans d'accéder aux actualités, services, et événements de la chambre tout en offrant un portail de communication interactif.",
      tech: ["Laravel 12", "Tailwind CSS 4.0", "MySQL", "Vite"],
      imageSrc: chambreImage,
      repoUrl: "https://github.com/oussamajdig7/chambre_artisana",
      demoUrl: "#",
    },

    {
      title: "UniPortal - Système Universitaire",
      description:
        "UniPortal is a state-of-the-art University Administration Management platform. It bridges the gap between students and administration through a highly intuitive, user-friendly interface. With UniPortal, students can easily access important information about the university, such as course schedules, class rosters, and event calendars.",
      tech: [
        "React",
        "Laravel 12+",
        "Tailwind CSS",
        "PostgreSQL",
        "Filament v3+",
        "Inertia.js",
      ],
      imageSrc: universitaireImage,
      repoUrl: "https://github.com/alpha-045/univercity_system",
      demoUrl: "#",
    },
    // {
    //   title: "Realtime Collaboration",
    //   description:
    //     "A lightweight collaboration prototype with presence indicators and smooth UI transitions.",
    //   tech: ["React", "JavaScript", "Framer Motion"],
    //   imageSrc:
    //     "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20collaboration%20app%20thumbnail%2C%20presence%20avatars%2C%20chat%20panel%2C%20clean%20minimal%20UI%2C%20teal%20accent%2C%20high%20quality&image_size=landscape_4_3",
    //   repoUrl: "https://github.com/oussama-jdig/realtime-collab",
    //   demoUrl: "https://example.com/demo/collab",
    // },
    // {
    //   title: "Portfolio Builder",
    //   description:
    //     "A customizable portfolio generator with sections, theming, and exportable templates.",
    //   tech: ["React", "JavaScript", "Vite", "Tailwind"],
    //   imageSrc:
    //     "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20portfolio%20website%20thumbnail%2C%20minimal%20layout%2C%20hero%20section%2C%20project%20grid%2C%20soft%20lighting%2C%20clean%20design%2C%20high%20quality&image_size=landscape_4_3",
    //   repoUrl: "https://github.com/oussama-jdig/portfolio-builder",
    //   demoUrl: "https://example.com/demo/portfolio",
    // },
  ],
  skills: [
    {
      title: "Frontend",
      items: [
        { name: "HTML5/CSS3", level: 80 },
        { name: "BootStrap CSS", level: 79 },
        { name: "React", level: 50 },
        { name: "JavaScript", level: 66 },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Laravel", level: 80 },
        { name: "MongoDB", level: 65 },
        { name: "PostgreSQL", level: 64 },
        { name: "MySQL", level: 75 },
      ],
    },
    {
      title: "Tooling",
      items: [
        { name: "Agile/Scrum", level: 75 },
        { name: "Git/GitHub", level: 85 },
        { name: "Figma", level: 67 },
        { name: "VS Code", level: 93 },
      ],
    },
  ],
  timeline: [
    {
      title: "Full Stack Developer",
      org: "Optiza Work",
      period: "Stage (1 mois)",
      bullets: [
        "Développement de fonctionnalités Full Stack en utilisant Laravel et React.",
        "Optimisation des performances Frontend et amélioration de l'interface utilisateur.",
        "Collaboration sur la conception et l'intégration de bases de données relationnelles.",
      ],
    },
    {
      title: "Technicien spécialisé en Développement Digital",
      org: "OFPPT",
      period: "2024 — 2026",
      bullets: [
        "Formation intensive sur le développement web moderne (Frontend & Backend).",
        "Conception d'applications web robustes avec l'architecture MVC et Laravel.",
        "Apprentissage des bonnes pratiques de codage et gestion de versions avec Git.",
      ],
    },
  ],
};
