import Link from "next/link";
import { pageMeta, site } from "@/content/site";
import { ContactCTA } from "@/components/layout/Footer";
import styles from "./about.module.css";
export const metadata = pageMeta(
  "About — engineering, experience & community",
  "Hussein Elhaddad is a final-year Computer and Communication Engineering student in Cairo, with experience in data engineering, AI projects, leadership, and mentoring.",
  "/about/",
  "about",
);
const capabilities = [
  [
    "AI applications",
    "RAG integration, embeddings, vector retrieval, and LLM/application integration.",
    "FPL-Intel",
    "/work/fpl-intel/",
  ],
  [
    "Applied machine learning",
    "Python, pandas, NumPy, scikit-learn, feature engineering, and model comparison. Team project experience with XGBoost.",
    "FPL-Intel evaluation",
    "/work/fpl-intel/#evaluation",
  ],
  [
    "Data systems",
    "SQL, ETL, SQL Server, PostgreSQL, dimensional modeling, SCD Type 2, data quality, API ingestion, and Power BI.",
    "Olist + Sawakli",
    "/work/olist/",
  ],
  [
    "Engineering practice",
    "Git/GitHub, testing, documentation, Streamlit, and project experience with FastAPI and CI.",
    "Analytical foundations",
    "/work/sawakli-ai/",
  ],
];
export default function About() {
  return (
    <>
      <div className="container">
        <header className="page-intro">
          <span className="eyebrow">About / Hussein Elhaddad</span>
          <h1>
            Curious about the model.
            <br />
            Careful about the system<span className="accent">.</span>
          </h1>
          <p className="lede">
            I’m a final-year Computer and Communication Engineering student
            based in Cairo. I build Python applications combining machine
            learning, retrieval-augmented generation, and reliable data
            workflows.
          </p>
        </header>
        <section
          className={styles.background}
          aria-labelledby="background-title"
        >
          <div>
            <span className="eyebrow">My approach</span>
            <h2 id="background-title">
              Make it useful.
              <br />
              Make it understandable.
            </h2>
          </div>
          <div>
            <p>
              My experience includes data engineering at Atos, leading
              university AI projects, and founding and leading student learning
              communities. I’m interested in the connections: how raw records
              become features, how retrieved evidence supports an answer, and
              how an analytical result earns trust.
            </p>
            <p>
              The work here shows my specific contributions alongside the team’s
              broader system. I care about clear boundaries, honest evaluation,
              and documentation that makes the next change easier.
            </p>
            <a className="text-link" download href={site.cv}>
              Download my CV <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section
          className={styles.section}
          aria-labelledby="capabilities-title"
        >
          <div className="section-title">
            <div>
              <span className="eyebrow">Capabilities / connected to work</span>
              <h2 id="capabilities-title">Tools in context.</h2>
            </div>
          </div>
          <div className={styles.capabilities}>
            {capabilities.map(([title, description, label, href], i) => (
              <article key={title}>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link prefetch={false} href={href}>
                  {label} ↗
                </Link>
              </article>
            ))}
          </div>
          <p className="small-note">
            Supporting foundations: C++, algorithms, TensorFlow coursework, and
            team frontend work.
          </p>
        </section>
        <section className={styles.section} aria-labelledby="industry-title">
          <span className="eyebrow">Industry experience</span>
          <h2 id="industry-title">Learning through delivery.</h2>
          <div className={styles.timeline}>
            <article>
              <div>
                <h3>Atos</h3>
                <span>Jul–Sep 2026 · Hybrid</span>
              </div>
              <div>
                <h4>Data Engineering Intern</h4>
                <p>
                  Individual Olist capstone with Python and SQL Server:
                  ingestion, staging, validation, transformation, warehouse
                  loading, history tracking, audit/data-quality logging, local
                  API ingestion, scheduling, and a four-page Power BI report.
                </p>
                <Link prefetch={false} href="/work/olist/">
                  Explore the capstone ↗
                </Link>
              </div>
            </article>
            <article>
              <div>
                <h3>EJADA Systems Ltd.</h3>
                <span>Jul–Aug 2025 · Hybrid</span>
              </div>
              <div>
                <h4>Software Engineering Intern</h4>
                <p>
                  Completed ServiceNow training and contributed to an internal
                  IT/HR operations platform through tables, forms, and
                  service-management workflows.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="leadership-title">
          <span className="eyebrow">Leadership & mentoring</span>
          <h2 id="leadership-title">Build the space to learn.</h2>
          <div className={styles.timeline}>
            <article>
              <div>
                <h3>Helwan Career Center</h3>
                <span>HCC</span>
              </div>
              <div>
                <h4>Founding & leadership</h4>
                <p>
                  Founding and organizational leadership, community operations,
                  and coordination of technical learning initiatives.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>FEHU-CPC</h3>
                <span>Problem-solving community</span>
              </div>
              <div>
                <h4>Problem-solving mentor → HR Head</h4>
                <p>
                  Mentored problem solving, then served as HR Head across two
                  waves. These roles are separate from my HCC leadership.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="education-title">
          <span className="eyebrow">Education</span>
          <h2 id="education-title">Engineering foundations.</h2>
          <div className={styles.education}>
            <h3>Capital (Helwan) University</h3>
            <p>
              Faculty of Engineering
              <br />
              B.Eng. in Computer and Communication Engineering
            </p>
            <span className="small-note">
              2022–July 2027 · Expected graduation
            </span>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.credentials}`}
          aria-labelledby="credentials-title"
        >
          <div>
            <span className="eyebrow">Selected learning</span>
            <h2 id="credentials-title">Credentials & training.</h2>
            <ul>
              <li>
                <strong>AWS Certified Cloud Practitioner</strong>
                <span>
                  Certificate issued 5 October 2024 · Printed expiry 5 October
                  2027
                </span>
              </li>
              <li>
                <strong>Machine Learning Engineer training — DEPI</strong>
                <span>
                  June–December 2025 · Training in ML, deep learning, NLP, and
                  computer vision
                </span>
              </li>
              <li>
                <strong>NVIDIA DLI Generative AI Summer Training — ITI</strong>
                <span>
                  35 hours · August–September 2025 · Python, generative AI, LLM
                  applications, and RAG
                </span>
              </li>
            </ul>
          </div>
          <div>
            <span className="eyebrow">Languages</span>
            <h2>Communication.</h2>
            <ul>
              <li>
                <strong>Arabic</strong>
                <span>Native</span>
              </li>
              <li>
                <strong>English</strong>
                <span>
                  EF SET 73/100 · C2 Proficient
                  <br />
                  Reading/listening assessment · 3 September 2024
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
