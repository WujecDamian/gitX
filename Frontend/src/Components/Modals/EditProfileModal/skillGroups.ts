export type SkillGroup = {
  name: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "C#",
      "C++",
      "Go",
      "Rust",
      "PHP",
      "C",
      "Kotlin",
      "Swift",
      "Ruby",
      "SQL",
      "HTML",
      "CSS",
      "Bash / Shell",
    ],
  },
  {
    name: "Version Control & Collaboration",
    skills: ["Git", "GitHub", "GitLab"],
  },
  {
    name: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQLite",
      "Redis",
      "Microsoft SQL Server",
    ],
  },
  {
    name: "Frontend Frameworks",
    skills: ["React", "Next.js", "Vue.js", "Angular", "Svelte"],
  },
  {
    name: "Backend / Full-stack",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "Django",
      "FastAPI",
      "Flask",
      "Spring Boot",
      "ASP.NET",
      "Laravel",
    ],
  },
  {
    name: "DevOps / Cloud / Tools",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "Google Cloud",
      "Linux",
      "CI/CD",
      "GitHub Actions",
      "Terraform",
    ],
  },
  {
    name: "Other Common Skills",
    skills: ["REST APIs", "GraphQL", "Unit Testing", "Agile / Scrum"],
  },
];

export const catalogSkills = skillGroups.flatMap((group) => group.skills);
