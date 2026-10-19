import Link from "next/link";
import styles from "./Visuals.module.css";
export function ProjectVisual({
  type,
}: {
  type: "olist" | "fpl-intel" | "sawakli-ai";
}) {
  if (type === "olist")
    return (
      <div className={`${styles.plate} ${styles.olist}`}>
        <div className={styles.visualLabel}>
          <span>PRODUCT HISTORY / SCD TYPE 2</span>
          <span>01</span>
        </div>
        <div className={styles.dataFlow}>
          <span>Raw input</span>
          <i aria-hidden="true">→</i>
          <span>Validate</span>
          <i aria-hidden="true">→</i>
          <span className={styles.trusted}>Trusted</span>
        </div>
        <div className={styles.historyRows}>
          <div>
            <span>PRODUCT / P-001</span>
            <span>VERSION</span>
            <span>STATE</span>
          </div>
          <div>
            <strong>Home · 500g</strong>
            <span>01</span>
            <span className={styles.old}>Historical</span>
          </div>
          <div>
            <strong>Office · 650g</strong>
            <span>02</span>
            <span className={styles.current}>Current ↗</span>
          </div>
        </div>
        <p className={styles.visualCaption}>
          Attributes change. The history stays.
        </p>
        <span className={styles.fixtureLabel}>Illustrative records</span>
      </div>
    );
  if (type === "fpl-intel")
    return (
      <div className={`${styles.plate} ${styles.fpl}`}>
        <div className={styles.visualLabel}>
          <span>RETRIEVAL / EVIDENCE → RESPONSE</span>
          <span>02</span>
        </div>
        <div className={styles.query}>“What’s behind the player score?”</div>
        <div className={styles.retrievalCards}>
          <div>
            <span className="eyebrow">01 / Player context</span>
            <strong>Statistics & scoring</strong>
            <div className={styles.miniBars}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div>
            <span className="eyebrow">02 / Retrieved context</span>
            <strong>News & uncertainty</strong>
            <p>Evidence gives the numbers a second dimension.</p>
          </div>
        </div>
        <div className={styles.response}>
          <span aria-hidden="true">↳</span> A response with its context
          attached.
        </div>
        <span className={styles.fixtureLabel}>Architecture illustration</span>
      </div>
    );
  return (
    <div className={`${styles.plate} ${styles.sawakli}`}>
      <div className={styles.visualLabel}>
        <span>CAMPAIGN / OBSERVE → EXPLAIN</span>
        <span>03</span>
      </div>
      <div className={styles.chartHeading}>
        <span>Click-through rate</span>
        <span className={styles.current}>Synthetic series</span>
      </div>
      <svg
        viewBox="0 0 480 205"
        role="img"
        aria-label="Illustrative campaign click-through rate: stable near 2 percent, falling to 0.7 percent, then recovering."
      >
        <g stroke="var(--line)" strokeDasharray="3 5">
          <path d="M30 40H460M30 95H460M30 150H460" />
        </g>
        <path
          d="M30 65L82 60L135 72L187 63L240 69L292 167L345 105L398 66L450 61"
          fill="none"
          stroke="var(--teal)"
          strokeWidth="2.5"
        />
        <circle
          cx="292"
          cy="167"
          r="7"
          fill="var(--bg)"
          stroke="var(--amber)"
          strokeWidth="3"
        />
        <path d="M292 157V28H375" fill="none" stroke="var(--amber)" />
        <text
          x="303"
          y="20"
          fill="var(--amber)"
          fontSize="11"
          fontFamily="monospace"
        >
          REVIEW THE CHANGE
        </text>
        <g fill="var(--muted)" fontSize="10" fontFamily="monospace">
          <text x="30" y="188">
            OBSERVATIONS →
          </text>
          <text x="4" y="44">
            3%
          </text>
          <text x="4" y="99">
            2%
          </text>
          <text x="4" y="154">
            1%
          </text>
        </g>
      </svg>
      <p className={styles.visualCaption}>
        A change is a starting point for a question.
      </p>
      <span className={styles.fixtureLabel}>
        Prepared example · no live analysis
      </span>
    </div>
  );
}
export function ProjectLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <Link prefetch={false} href={`/work/${slug}/`} className="text-link">
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}
