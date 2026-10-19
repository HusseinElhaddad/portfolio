import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";
import { ContactCTA } from "@/components/layout/Footer";
import styles from "./CaseStudy.module.css";
export function CaseStudy({
  slug,
  children,
  intro,
}: {
  slug: Project["slug"];
  children: React.ReactNode;
  intro: string;
}) {
  const p = projects.find((p) => p.slug === slug)!;
  return (
    <>
      <div className="container">
        <header className={styles.hero}>
          <Link prefetch={false} href="/work/" className={styles.back}>
            ← All work
          </Link>
          <div className={styles.caseLabel}>
            <span className="eyebrow">
              {p.index} / {p.field}
            </span>
            <span className="status">{p.status}</span>
          </div>
          <h1>
            {p.name}
            <span className="accent">.</span>
          </h1>
          <p className={styles.intro}>{intro}</p>
          <div className={styles.facts}>
            <div>
              <span>MY ROLE</span>
              <p>{p.role}</p>
            </div>
            <div>
              <span>PROJECT CONTEXT</span>
              <p>
                {slug === "olist"
                  ? "Atos internship · Jul–Sep 2026"
                  : slug === "fpl-intel"
                    ? "University team project · April 2026"
                    : "Graduation project · In development"}
              </p>
            </div>
            <div>
              <span>CORE STACK</span>
              <p>{p.stack.join(" / ")}</p>
            </div>
          </div>
        </header>
        <div className={styles.caseLayout}>
          <aside className={styles.contents}>
            <span className="eyebrow">Inside the work</span>
            <nav aria-label="Case study sections">
              <a href="#problem">The problem</a>
              <a href="#contribution">My contribution</a>
              <a href="#architecture">Architecture</a>
              <a href="#decisions">Engineering decisions</a>
              <a href="#evaluation">Evaluation & boundaries</a>
              <a href="#demo">Explore an example</a>
              <a href="#links">Project links</a>
            </nav>
          </aside>
          <div className={styles.body}>
            <ProjectVisual type={slug} />
            {children}
            <section id="links" className={styles.section}>
              <span className="eyebrow">Continue exploring</span>
              <h2>Project links</h2>
              {p.repo ? (
                <a className="text-link" href={p.repo}>
                  View the team repository <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p>
                  The source repository is private. This public case study
                  explains the implementation without exposing the project’s
                  source code.
                </p>
              )}
              <div className={styles.bottomLinks}>
                <Link prefetch={false} href="/work/">
                  ← Back to all work
                </Link>
                <Link
                  prefetch={false}
                  href={`/work/${projects[(projects.indexOf(p) + 1) % 3].slug}/`}
                >
                  Next case study →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
export function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children}
    </section>
  );
}
export function Architecture({
  steps,
  note,
}: {
  steps: string[];
  note: string;
}) {
  return (
    <figure className={styles.architecture}>
      <ol>
        {steps.map((s, i) => (
          <li key={s}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {s}
          </li>
        ))}
      </ol>
      <figcaption>{note}</figcaption>
    </figure>
  );
}
export function Decision({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.decision}>
      <h3>{title}</h3>
      {children}
    </article>
  );
}
