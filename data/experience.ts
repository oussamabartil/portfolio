export type Experience = {
  initials: string;
  title: string;
  place: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    initials: "TI",
    title: "Développeur Full-Stack · Stage",
    place: "TEIMA INFO — Agadir, Maroc",
    period: "Juillet – août 2024",
    bullets: [
      "Conception et développement d'une application de gestion des livraisons : backend Laravel, application mobile Flutter, API REST avec authentification JWT.",
      "Containerisation et déploiement en production avec Docker ; gestion des rôles livreur, administrateur et client.",
      "Modélisation de la base de données MySQL, documentation technique et recette fonctionnelle des modules livrés.",
    ],
    tags: ["Laravel", "Flutter", "API REST", "JWT", "Docker", "MySQL"],
  },
  {
    initials: "OC",
    title: "Développeur Web · Stage",
    place: "ONESTCOM — Marrakech, Maroc",
    period: "Avril – juin 2023",
    bullets: [
      "Développement d'une plateforme e-commerce complète : catalogue produits, panier, commandes, espace client et tableau de bord admin.",
      "Implémentation de l'authentification avec gestion des sessions et des rôles (admin, client) ; intégration HTTPS et protection CSRF.",
      "Tests fonctionnels et de régression, rédaction de la documentation technique et participation aux revues de code.",
    ],
    tags: ["Authentification", "HTTPS", "CSRF", "Tests", "Code review"],
  },
  {
    initials: "OC",
    title: "Développeur Web · Stage",
    place: "ONESTCOM — Marrakech, Maroc",
    period: "Juillet – août 2022",
    bullets: [
      "Développement de fonctionnalités web : formulaires dynamiques, validation des entrées côté serveur et client.",
      "Gestion sécurisée des sessions utilisateurs et mise en place des contrôles d'accès sur les routes protégées.",
      "Participation à la mise en production, monitoring des erreurs et suivi qualité des livrables.",
    ],
    tags: ["Formulaires dynamiques", "Validation", "Sessions", "Contrôle d'accès"],
  },
];
