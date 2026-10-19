export type Project = {
  slug: "olist" | "fpl-intel" | "sawakli-ai";
  name: string;
  index: string;
  field: string;
  title: string;
  summary: string;
  role: string;
  status: string;
  stack: string[];
  accent: "amber" | "teal";
  repo?: string;
};
export const projects: Project[] = [
  {
    slug: "olist",
    name: "Olist",
    index: "01",
    field: "Reliable data",
    title: "Trust begins before the dashboard.",
    summary:
      "Turning public e-commerce files and local API feeds into validated analytical tables, product history, and a four-page Power BI report.",
    role: "Individual internship capstone · Atos",
    status: "Completed capstone",
    stack: ["Python", "SQL Server", "ETL", "Power BI"],
    accent: "amber",
  },
  {
    slug: "fpl-intel",
    name: "FPL-Intel",
    index: "02",
    field: "Contextual intelligence",
    title: "Give the numbers their context.",
    summary:
      "A team-built football assistant combining player scoring with retrieved news. My focus: RAG, application integration, and deployment.",
    role: "Team lead · RAG & integration · 6 people",
    status: "University team project",
    stack: ["Python", "Chroma", "XGBoost", "Streamlit"],
    accent: "teal",
    repo: "https://github.com/HusseinElhaddad/fpl-intel/tree/dev",
  },
  {
    slug: "sawakli-ai",
    name: "Sawakli AI",
    index: "03",
    field: "Explainable analytics",
    title: "An insight should explain itself.",
    summary:
      "Building the analytical foundations for campaign metrics, anomalies, forecasts, and recommendations—with explicit organization boundaries.",
    role: "Team lead · Data loaders & features · 6 people",
    status: "In development",
    stack: ["Python", "PostgreSQL", "FastAPI", "Next.js"],
    accent: "amber",
    repo: "https://github.com/elfaroukomaradmission-a11y/Sawakli-AI",
  },
];
