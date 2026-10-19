import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Layout.module.css";
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <Link prefetch={false} href="/" className={styles.footerName}>
            Hussein Elhaddad<span className="accent">.</span>
          </Link>
          <p>AI engineering, with the reasoning left in.</p>
          <div className={styles.social}>
            <a href={site.github}>GitHub ↗</a>
            <a href={site.linkedin}>LinkedIn ↗</a>
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Hussein Elhaddad</span>
          <span>
            Cairo, Egypt <span aria-hidden="true">↗</span>
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
export function ContactCTA() {
  return (
    <section
      className="contact-cta container"
      aria-labelledby="contact-heading"
    >
      <span className="eyebrow">The next useful system</span>
      <h2 id="contact-heading">
        Let’s start with
        <br />a good problem<span className="accent">.</span>
      </h2>
      <div>
        <p>
          Questions about the work, an engineering opportunity, or an idea to
          explore? I’d like to hear it.
        </p>
        <Link prefetch={false} className="button primary" href="/contact/">
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
