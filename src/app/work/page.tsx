import Link from "next/link";
import { pageMeta } from "@/content/site";
import { projects, moreProjects } from "@/content/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ContactCTA } from "@/components/layout/Footer";
import styles from "./work.module.css";
export const metadata = pageMeta(
  "Selected work",
  "Explore Olist, FPL-Intel, and Sawakli case studies, plus So3ratk, Trip Planner, a Titanic classification learning prototype, and Football ETL.",
  "/work/",
  "work",
);
export default function Work() {
  return (
    <>
      <div className="container">
        <header className="page-intro">
          <span className="eyebrow">Selected work / Engineering collection</span>
          <h1>
            How I turn a problem
            <br />
            into a working system<span className="accent">.</span>
          </h1>
          <p className="lede">
            The data, the decisions, and my part in the work. Three deeper case
            studies with examples you can explore, followed by a small collection
            of supporting projects.
          </p>
        </header>
        <section className={styles.projects} aria-label="Featured case studies">
          {projects.map((p) => (
            <article className={styles.project} key={p.slug}>
              <div className={styles.summary}>
                <span className="eyebrow">
                  {p.index} / {p.field}
                </span>
                <h2>
                  <Link prefetch={false} href={`/work/${p.slug}/`}>
                    {p.name} <span aria-hidden="true">↗</span>
                  </Link>
                </h2>
                <span className="status">{p.status}</span>
                <p>{p.summary}</p>
                <p className="small-note">{p.role}</p>
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link
                  prefetch={false}
                  className="text-link"
                  href={`/work/${p.slug}/`}
                >
                  Read the case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <ProjectVisual type={p.slug} />
            </article>
          ))}
        </section>
        <section
          className={styles.supporting}
          aria-labelledby="more-projects-title"
        >
          <header className={styles.collectionIntro}>
            <span className="eyebrow">Beyond the case studies</span>
            <h2 id="more-projects-title">More Projects</h2>
            <p>
              Smaller projects, with a clear view of the problem and my role.
            </p>
          </header>
          <div className={styles.moreGrid}>
            {moreProjects.map((project) => (
              <article
                className={styles.moreCard}
                key={project.slug}
                aria-labelledby={`${project.slug}-title`}
              >
                <span className="eyebrow">{project.context}</span>
                <h3 id={`${project.slug}-title`}>{project.name}</h3>
                <span className="status">{project.status}</span>
                <p className={styles.problem}>{project.problem}</p>
                <dl className={styles.contribution}>
                  <dt>My contribution</dt>
                  <dd>{project.contribution}</dd>
                </dl>
                <ul className="tags" aria-label={`${project.name} stack`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={styles.scope}>{project.note}</p>
                {project.repository ? (
                  <a
                    href={project.repository}
                    className="text-link"
                    aria-label={`${project.name} ${project.repositoryLabel.toLowerCase()}`}
                  >
                    {project.repositoryLabel} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <p className={styles.sourceAvailability}>
                    {project.repositoryLabel}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
