export type Project = {
  category: string;
  title: string;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    category: "MICROSERVICES · COMMUNICATION",
    title: "Escolis",
    description:
      "Architecture microservices avec service de notifications push et service d'envoi d'emails transactionnels, déployée sur infrastructure Proxmox et orchestrée via Docker Compose. Analyse de risques EBIOS-RM complète (5 ateliers) et suivi de projet par méthode EVM.",
    tags: ["Spring Boot", "Docker", "PostgreSQL", "Redis", "Proxmox"],
  },
  {
    category: "BLOCKCHAIN · DAPP",
    title: "NotaryChain-DApp",
    description:
      "DApp de notarisation de documents : smart contract Solidity déployé via Truffle sur réseau Ethereum local (Ganache). Hash SHA-256 côté client, vérification d'intégrité et transfert de propriété, avec 14 tests unitaires.",
    tags: ["Solidity", "React", "Ethers.js", "Truffle", "Ganache"],
    link: { label: "Code sur GitHub →", href: "https://github.com/oussamabartil" },
  },
  {
    category: "BACKEND · SÉCURITÉ",
    title: "E-Banking",
    description:
      "Backend REST complet pour la gestion de comptes bancaires : virements, historique de transactions, soldes. Authentification et autorisation via OAuth2 Resource Server (JWT), documentation interactive avec Swagger/OpenAPI.",
    tags: ["Spring Boot 3", "Spring Security", "OAuth2", "JPA", "MySQL"],
    link: { label: "Code sur GitHub →", href: "https://github.com/oussamabartil/ebanking" },
  },
  {
    category: "FULL-STACK · MOBILE",
    title: "Gestion de livraisons",
    description:
      "API REST Laravel avec gestion des commandes, livreurs et clients, authentification JWT et contrôle d'accès par rôles. Application mobile Flutter consommant l'API, containerisée et déployée en production à Agadir.",
    tags: ["Laravel", "Flutter", "MySQL", "Docker"],
    link: { label: "Voir en production →", href: "https://agadispaservice.com" },
  },
  {
    category: "VISION PAR ORDINATEUR",
    title: "Reconnaissance faciale",
    description:
      "Système de contrôle d'accès par reconnaissance faciale en temps réel : client JavaFX + OpenCV, couplé à un service Python dédié (face_recognition) pour l'identification.",
    tags: ["JavaFX", "OpenCV", "Python"],
    link: { label: "Code sur GitHub →", href: "https://github.com/oussamabartil/ReconnaissanceFaciale1" },
  },
  {
    category: "DEVOPS · SUPERVISION",
    title: "System Monitoring",
    description:
      "Stack de supervision d'infrastructure dockerisée : Prometheus pour la collecte de métriques, Grafana pour la visualisation, AlertManager pour les alertes.",
    tags: ["Prometheus", "Grafana", "Docker"],
    link: { label: "Code sur GitHub →", href: "https://github.com/oussamabartil/system-monitoring" },
  },
];
