import { pageMeta } from "@/content/site";
import {
  CaseStudy,
  CaseSection,
  Architecture,
  Decision,
} from "@/components/projects/CaseStudy";
import { SawakliDemo } from "@/components/demos/Demos";
export const metadata = pageMeta(
  "Sawakli AI — explainable analytical engineering",
  "An in-development graduation project. Hussein leads six members and implements organization-scoped data loaders, typed analytical inputs, and deterministic campaign features.",
  "/work/sawakli-ai/",
  "sawakli-ai",
);
export default function Sawakli() {
  return (
    <CaseStudy
      slug="sawakli-ai"
      intro="Building interpretable campaign analytics, starting with a trustworthy analytical boundary."
    >
      <CaseSection
        id="problem"
        eyebrow="01 / The problem"
        title="Help smaller businesses understand the change."
      >
        <p>
          Sawakli AI aims to explain campaign performance through interpretable
          metrics, anomaly detection, forecasts, and recommendations. Before
          those modules can be useful, their inputs need consistent meaning and
          explicit organization scope.
        </p>
        <p>
          This is a{" "}
          <strong>six-member graduation project, in development</strong>.
          Analytical modules and application infrastructure exist, while
          complete orchestration, persistence, and dashboard integration remain
          unfinished.
        </p>
      </CaseSection>
      <CaseSection
        id="contribution"
        eyebrow="02 / My contribution"
        title="A shared foundation for analytical modules."
      >
        <p>
          I lead the team and coordinate the AI track. My strongest implemented
          contribution is the{" "}
          <strong>
            organization-scoped PostgreSQL/CSV loading and feature pipeline
          </strong>
          :
        </p>
        <ul>
          <li>
            Shared typed input contracts so downstream modules consume
            consistent analytical data.
          </li>
          <li>
            Deterministic efficiency metrics, 7-/14-day rolling CTR/CPC, and
            daily trends.
          </li>
          <li>
            Explicit missing-data and denominator handling, organization
            isolation, and CSV/database equivalence validation using{" "}
            <strong>360 campaign-day records</strong>.
          </li>
          <li>
            Subsequent isolation/evaluation fixes and analytical coordination.
          </li>
        </ul>
        <p>
          Original anomaly detection and other analytical implementations are
          team work. They are not presented as my sole implementation.
        </p>
      </CaseSection>
      <CaseSection
        id="architecture"
        eyebrow="03 / Architecture"
        title="Make the boundary explicit."
      >
        <Architecture
          steps={[
            "Organization-scoped CSV / PostgreSQL inputs",
            "Validated, typed analytical data",
            "Deterministic + historical features",
            "Anomaly / forecast / recommendation modules",
            "Orchestration + dashboard integration: unfinished",
          ]}
          note="Team architecture: modular monolith, Next.js web app, FastAPI backend, Python Worker, PostgreSQL, and internal analytical modules."
        />
        <p>
          In the inspected revision, analytical frontend services still return
          mock data, the Worker executor is simulated, and the AI orchestration
          entry point is empty. Implemented modules should not be mistaken for a
          complete end-to-end product.
        </p>
      </CaseSection>
      <CaseSection
        id="decisions"
        eyebrow="04 / Engineering decisions"
        title="Interpretability starts before the model."
      >
        <Decision title="Organization scope is an input invariant.">
          <p>
            Loaders require explicit organization boundaries. Analytical data
            for one business must not leak into another business’s features or
            reference context. Cross-organization validation makes that boundary
            testable.
          </p>
        </Decision>
        <Decision title="Missing does not mean zero.">
          <p>
            Zero denominators, incomplete windows, and date gaps need explicit
            handling. An unavailable rate should remain unavailable rather than
            silently becoming evidence of good or bad performance.
          </p>
        </Decision>
        <Decision title="One input meaning across two loading paths.">
          <p>
            CSV and database inputs share a typed contract. Equivalence
            validation checks that choosing a source does not change the
            analytical meaning of the same records.
          </p>
        </Decision>
        <Decision title="Team methods should expose their assumptions.">
          <p>
            The team’s anomaly ensemble combines robust Z-score, IQR, and
            Isolation Forest. Forecasting uses Random Forest, linear regression,
            and moving-average fallbacks, with rolling-origin backtests.
            Recommendation rules connect explanations to evidence.
          </p>
        </Decision>
      </CaseSection>
      <CaseSection
        id="evaluation"
        eyebrow="05 / Evaluation & boundaries"
        title="Keep the evidence at the right scale."
      >
        <p>
          The 360-record validation describes my feature-pipeline work. It is
          separate from the team’s synthetic anomaly benchmark and is not a
          production dataset or proof of business impact.
        </p>
        <p>
          The saved team benchmark uses 60 campaigns across three organizations
          over 90 days: 5,400 observations per seed. At critical-alert threshold
          0.80, the reserved-seed report records 144/152 anomalous days detected
          and 59/5,248 clean days flagged.
        </p>
        <p>
          Those are <strong>controlled synthetic results</strong>. Retrospective
          forest fitting and the synthetic distribution limit their
          interpretation. They are not prospectively validated production
          accuracy, and the threshold is not a calibrated probability.
        </p>
        <p className="callout">
          Status verified against the inspected October 2026 source snapshot. No
          model training, database mutation, original project tests, or full
          application execution was performed for this portfolio.
        </p>
      </CaseSection>
      <CaseSection
        id="demo"
        eyebrow="06 / Try the idea"
        title="A change should come with context."
      >
        <p>
          Select a synthetic observation. Inspect the numerator, denominator,
          prepared reference, and explanation—including a day where the rates
          cannot be calculated.
        </p>
        <SawakliDemo />
      </CaseSection>
    </CaseStudy>
  );
}
