import Link from "next/link";
import { pageMeta } from "@/content/site";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ContactCTA } from "@/components/layout/Footer";
import styles from "./work.module.css";
export const metadata = pageMeta(
  "Selected work",
  "Three engineering case studies: reliable Olist data pipelines, FPL-Intel RAG integration, and Sawakli analytical foundations. Plus team frontend work on So3ratk.",
  "/work/",
  "work",
);
export default function Work() {
  return (
    <>
      <div className="container">
        <header className="page-intro">
          <span className="eyebrow">Selected work / 01—03</span>
          <h1>
            How I turn a problem
            <br />
            into a working system<span className="accent">.</span>
          </h1>
          <p className="lede">
            The data, the decisions, and my part in the work. Three deeper case
            studies, with small examples you can explore.
          </p>
        </header>
        <div className={styles.projects}>
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
        </div>
        <section
          className={styles.supporting}
          aria-labelledby="supporting-title"
        >
          <span className="eyebrow">Also built / Team frontend</span>
          <div>
            <h2 id="supporting-title">So3ratk</h2>
            <p>
              A team Egyptian-food detection application using YOLOv8, an
              inference API, and an image-upload interface. I developed the
              frontend for uploads and visualizing annotated predictions.
            </p>
            <p className="small-note">
              Food detection · Model work credited to the team
            </p>
            <a
              href="https://github.com/MoBahgat010/So3ratk"
              className="text-link"
            >
              Team repository <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
