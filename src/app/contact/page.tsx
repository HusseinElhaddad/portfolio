import { pageMeta, site } from "@/content/site";
import { CopyEmail } from "@/components/layout/CopyEmail";
import styles from "./contact.module.css";
export const metadata = pageMeta(
  "Contact",
  "Contact Hussein Elhaddad about AI engineering work, opportunities, or collaboration by email, LinkedIn, or GitHub.",
  "/contact/",
  "contact",
);
export default function Contact() {
  return (
    <div className={`container ${styles.contact}`}>
      <header className="page-intro">
        <span className="eyebrow">Contact / Let’s connect</span>
        <h1>
          A useful conversation
          <br />
          starts with hello<span className="accent">.</span>
        </h1>
        <p className="lede">
          An engineering opportunity, a question about a project, or an idea
          worth exploring. Tell me what you’re thinking.
        </p>
      </header>
      <div className={styles.grid}>
        <section aria-labelledby="email-title">
          <span className="eyebrow" id="email-title">
            Direct / Email
          </span>
          <a className={styles.email} href={`mailto:${site.email}`}>
            {site.email}
            <span aria-hidden="true">↗</span>
          </a>
          <div className="actions">
            <a className="button primary" href={`mailto:${site.email}`}>
              Write an email <span aria-hidden="true">↗</span>
            </a>
            <CopyEmail />
          </div>
          <p className="small-note">
            Prefer your own email app? The address above is selectable.
          </p>
        </section>
        <section className={styles.profiles} aria-labelledby="profiles-title">
          <span className="eyebrow" id="profiles-title">
            Elsewhere / Profiles
          </span>
          <a href={site.linkedin}>
            <span>
              LinkedIn<small>Professional background</small>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={site.github}>
            <span>
              GitHub<small>Code & project repositories</small>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
          <div className={styles.location}>
            <span className="eyebrow">Based in</span>
            <p>Cairo, Egypt</p>
          </div>
        </section>
      </div>
    </div>
  );
}
