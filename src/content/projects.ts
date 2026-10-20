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

export type SupportingProject = {
  slug: string;
  name: string;
  context: string;
  problem: string;
  contribution: string;
  status: string;
  stack: string[];
  note: string;
  repository: string;
  repositoryLabel: "Team repository" | "Repository";
};

export const moreProjects: SupportingProject[] = [
  {
    slug: "so3ratk",
    name: "So3ratk",
    context: "Computer vision / Team project",
    problem:
      "Help users identify Egyptian foods in an uploaded image and inspect annotated detections.",
    contribution:
      "I developed the frontend for image uploads and visualizing the team’s predictions.",
    status: "Implemented team prototype",
    stack: ["HTML", "CSS", "JavaScript", "YOLOv8", "Inference API"],
    note: "Model training and API work belong to the team. Live inference is unverified; this is food detection, not calorie estimation.",
    repository: "https://github.com/MoBahgat010/So3ratk",
    repositoryLabel: "Team repository",
  },
  {
    slug: "trip-planner",
    name: "Trip Planner",
    context: "Desktop software / University team project",
    problem:
      "Keep flights, hotels, activities, and itinerary costs together in a Java desktop application with CSV import and export.",
    contribution:
      "I worked on NetBeans compatibility and documented the project’s structure, setup, and object-oriented design.",
    status: "Implemented coursework application",
    stack: ["Java", "Swing", "FlatLaf", "Maven", "CSV"],
    note: "The application was built by the team. Data persists through CSV export, using a basic parser.",
    repository: "https://github.com/Abdelrahman2542/Trip---Planner",
    repositoryLabel: "Team repository",
  },
  {
    slug: "titanic",
    name: "Titanic Survival Classification",
    context: "Applied ML / DEPI mini project",
    problem:
      "Explore passenger-survival classification using historical Titanic data, comparing Logistic Regression and Decision Tree models.",
    contribution:
      "I built the preprocessing, feature engineering, model comparison and export workflow, and the inference interface.",
    status: "Implemented learning prototype",
    stack: ["Python", "pandas", "scikit-learn", "LightGBM", "Gradio"],
    note: "Evaluation needs revision: target leakage and inconsistent age scaling limit the saved results. No validated accuracy or live demo is claimed.",
    repository:
      "https://github.com/HusseinElhaddad/Titanic-Classification-DEPI-Mini-Project",
    repositoryLabel: "Repository",
  },
];
