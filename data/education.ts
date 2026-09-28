export type EducationItem = {
  when: string;
  school: string;
  institution: string;
  degree: string;
};

export const education: EducationItem[] = [
  {
    when: "2025 — présent · Vannes, France",
    school: "ENSIBS",
    institution: "École Nationale Supérieure d'Ingénieurs de Bretagne Sud",
    degree: "Diplôme d'Ingénieur — Cybersécurité des logiciels (double diplôme)",
  },
  {
    when: "2023 — 2025 · Mohammedia, Maroc",
    school: "ENSET",
    institution: "École Normale Supérieure de l'Enseignement Technique",
    degree: "Diplôme d'Ingénieur — Génie du logiciel et systèmes distribués",
  },
  {
    when: "2021 — 2023 · Agadir, Maroc",
    school: "EST",
    institution: "École Supérieure de Technologie",
    degree: "DUT Génie Informatique",
  },
];
