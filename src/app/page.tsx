import Link from "next/link";
import { projects } from "@/content/projects";
import { pageMeta, site } from "@/content/site";
import { SystemIllustration } from "@/components/projects/SystemIllustration";
import {
  ProjectVisual,
  ProjectLink,
} from "@/components/projects/ProjectVisual";
import { ContactCTA } from "@/components/layout/Footer";
import styles from "./page.module.css";
export const metadata = pageMeta(
  "AI Engineer — Applied ML, RAG & Data Systems",
  "Hussein Elhaddad builds useful AI applications on reliable data foundations. Explore Olist, FPL-Intel, and Sawakli AI.",
  "/",
);
export default function Home() {
  return (
    <>
      <section
        className={`${styles.hero} container`}
        aria-labelledby="hero-title"
      >
        <div className={styles.heroCopy}>
          <div className={styles.identity}>
            <span className={styles.dot} />
            <span>AI ENGINEER · CAIRO, EGYPT</span>
          </div>
          <h1 id="hero-title">
            From raw data
            <br />
            to useful
            <br />
            <span className={styles.heroAccent}>
              AI systems<span>.</span>
            </span>
          </h1>
          <p className={styles.heroDescription}>
            I’m Hussein Elhaddad. I build Python applications that connect
            reliable data, applied machine learning, and retrieval-augmented
            generation.
          </p>
          <p className={styles.specialism}>
            Applied ML <span>/</span> RAG <span>/</span> Data systems
          </p>
          <div className="actions">
            <Link prefetch={false} href="/work/" className="button primary">
              Explore my work <span aria-hidden="true">↗</span>
            </Link>
            <a href={site.cv} download className="button">
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className={styles.heroArt}>
          <SystemIllustration />
        </div>
        <div className={styles.heroFoot}>
          <span className="eyebrow">Signal → System</span>
          <p>Three projects. Three ways of making complexity useful.</p>
          <a href="#olist" aria-label="Scroll to Olist">
            Explore below <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div className={styles.work}>
        <div className="container">
          <div className={styles.workHeading}>
            <span className="eyebrow">Selected engineering work / 2026</span>
            <span className="small-note">Built → understood → explained</span>
          </div>
          {projects.map((p) => (
            <section
              key={p.slug}
              id={p.slug}
              className={`${styles.chapter} ${p.slug === "fpl-intel" ? styles.reverse : ""}`}
              aria-labelledby={`${p.slug}-heading`}
            >
              <div className={styles.chapterCopy}>
                <div className={styles.chapterIndex}>
                  <span>{p.index}</span>
                  <span>{p.field}</span>
                </div>
                <h2 id={`${p.slug}-heading`}>{p.title}</h2>
                <p>{p.summary}</p>
                <div className={styles.projectMeta}>
                  <strong>{p.name}</strong>
                  <span className="status">{p.status}</span>
                </div>
                <p className={styles.role}>{p.role}</p>
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <ProjectLink slug={p.slug}>Inside {p.name}</ProjectLink>
              </div>
              <ProjectVisual type={p.slug} />
            </section>
          ))}
        </div>
      </div>
      <section
        className={`${styles.experience} container`}
        aria-labelledby="experience-title"
      >
        <div>
          <span className="eyebrow">Beyond the implementation</span>
          <h2 id="experience-title">
            Build carefully.
            <br />
            Learn together.
          </h2>
          <p>
            Final-year Computer and Communication Engineering student. Practical
            experience through internships, university AI projects, and student
            learning communities.
          </p>
          <Link prefetch={false} href="/about/" className="text-link">
            More about me <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.experienceList}>
          <article>
            <span>01 / INDUSTRY</span>
            <h3>Atos</h3>
            <p>Data Engineering Intern · Jul–Sep 2026</p>
            <p>
              Individual Olist capstone, from ingestion to analytical reporting.
            </p>
          </article>
          <article>
            <span>02 / SOFTWARE</span>
            <h3>EJADA Systems Ltd.</h3>
            <p>Software Engineering Intern · Jul–Aug 2025</p>
            <p>
              ServiceNow training and internal service-management workflows.
            </p>
          </article>
          <article>
            <span>03 / COMMUNITY</span>
            <h3>Leadership & mentoring</h3>
            <p>HCC founding & leadership · FEHU-CPC mentor, then HR Head</p>
            <p>
              Organizing learning, coordinating people, and explaining the
              reasoning.
            </p>
          </article>
        </div>
      </section>
      <ContactCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${site.origin}/#person`,
                name: site.fullName,
                url: site.origin,
                jobTitle: "AI Engineer",
                sameAs: [site.github, site.linkedin],
              },
              {
                "@type": "WebSite",
                name: site.name,
                url: site.origin,
                inLanguage: "en",
                author: { "@id": `${site.origin}/#person` },
              },
            ],
          }),
        }}
      />
    </>
  );
}
