"use client";
import { useState } from "react";
import { LazyMotion, m, useReducedMotion } from "motion/react";
import styles from "./Visuals.module.css";
const stages = [
  {
    name: "Reliable data",
    project: "Olist",
    slug: "olist",
    detail:
      "Validate the input. Preserve history. Make analytical tables worth trusting.",
  },
  {
    name: "Contextual AI",
    project: "FPL-Intel",
    slug: "fpl-intel",
    detail:
      "Connect player statistics with retrieved evidence, and make uncertainty visible.",
  },
  {
    name: "Explainable analytics",
    project: "Sawakli AI",
    slug: "sawakli-ai",
    detail:
      "Turn organization-scoped campaign data into interpretable analytical features.",
  },
];
export function SystemIllustration() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  return (
    <LazyMotion
      features={() => import("./motion-features").then((mod) => mod.default)}
      strict
    >
      <div className={styles.system}>
        <div className={styles.visualLabel}>
          <span>ENGINEERING / THREE PERSPECTIVES</span>
          <span aria-hidden="true">↗</span>
        </div>
        <svg
          viewBox="0 0 520 330"
          role="img"
          aria-labelledby="system-title system-desc"
          className={styles.systemSvg}
        >
          <title id="system-title">Signal to system</title>
          <desc id="system-desc">
            Three independent project stories connect raw inputs to useful
            systems: reliable data, contextual AI, and explainable analytics.
            Choose a perspective below.
          </desc>
          <defs>
            <pattern
              id="grid"
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity=".14" />
            </pattern>
          </defs>
          <rect width="520" height="330" fill="url(#grid)" />
          <g fill="none" stroke="var(--line-strong)" strokeWidth="1.2">
            <path d="M70 82H165L225 160H335" />
            <path d="M70 165H335" />
            <path d="M70 248H165L225 170H335" />
            <path d="M395 165H485" />
            <path d="M365 40V103M365 226V296" strokeDasharray="4 6" />
          </g>
          <m.path
            key={selected}
            d={
              [
                "M70 82H165L225 160H335",
                "M70 165H335",
                "M70 248H165L225 170H335",
              ][selected]
            }
            fill="none"
            stroke={selected === 1 ? "var(--teal)" : "var(--amber)"}
            strokeWidth="2.5"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
          />
          {[82, 165, 248].map((y, i) => (
            <g key={y}>
              <rect
                x="34"
                y={y - 20}
                width="42"
                height="40"
                rx="5"
                fill="var(--surface)"
                stroke={selected === i ? "var(--amber)" : "var(--line-strong)"}
              />
              <text
                x="55"
                y={y + 5}
                textAnchor="middle"
                fill="var(--text)"
                fontSize="12"
                fontFamily="monospace"
              >
                0{i + 1}
              </text>
            </g>
          ))}
          <g transform="translate(303 103)">
            <rect
              width="124"
              height="124"
              rx="12"
              fill="var(--surface)"
              stroke="var(--line-strong)"
            />
            <rect
              x="12"
              y="12"
              width="100"
              height="100"
              rx="6"
              fill="none"
              stroke="var(--line)"
            />
            <path
              d="M38 46V78M62 36V88M86 46V78M31 62H93"
              stroke="var(--amber)"
              strokeWidth="3"
            />
            <circle
              cx="62"
              cy="62"
              r="8"
              fill="var(--surface)"
              stroke="var(--teal)"
              strokeWidth="3"
            />
          </g>
          <circle cx="484" cy="165" r="5" fill="var(--teal)" />
          <g fill="var(--muted)" fontSize="10" fontFamily="monospace">
            <text x="30" y="32">
              SIGNALS IN
            </text>
            <text x="310" y="32">
              SYSTEMS OUT
            </text>
            <text x="112" y="73">
              DATA
            </text>
            <text x="112" y="156">
              CONTEXT
            </text>
            <text x="112" y="239">
              REASONING
            </text>
            <text x="303" y="317">
              BUILT WITH INTENT.
            </text>
          </g>
        </svg>
        <div
          className={styles.stageControls}
          aria-label="Explore engineering perspectives"
        >
          {stages.map((s, i) => (
            <button
              key={s.slug}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {s.name}
            </button>
          ))}
        </div>
        <div className={styles.stageDetail} aria-live="polite">
          <p>{stages[selected].detail}</p>
          <a href={`#${stages[selected].slug}`}>
            Explore {stages[selected].project} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </LazyMotion>
  );
}
