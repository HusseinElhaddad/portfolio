import { pageMeta } from "@/content/site";
import {
  CaseStudy,
  CaseSection,
  Architecture,
  Decision,
} from "@/components/projects/CaseStudy";
import { OlistDemo } from "@/components/demos/Demos";
export const metadata = pageMeta(
  "Olist — reliable data systems",
  "An individual Atos internship capstone: validated Python and SQL Server pipelines, change-aware loading, product history, audit logs, and Power BI.",
  "/work/olist/",
  "olist",
);
export default function Olist() {
  return (
    <CaseStudy
      slug="olist"
      intro="A reliable analytical foundation for a messy public e-commerce dataset."
    >
      <CaseSection
        id="problem"
        eyebrow="01 / The problem"
        title="A dashboard is only as useful as its inputs."
      >
        <p>
          The public Brazilian Olist dataset spans orders, products, payments,
          reviews, and locations. Those files need consistent types, trustworthy
          relationships, and traceable transformations before they can support
          useful reporting.
        </p>
        <p>
          I built this{" "}
          <strong>
            individual data engineering capstone during my Atos internship
          </strong>
          . It processes CSV files and locally exposed paginated API feeds into
          SQL Server analytical tables, product history, and reporting views.
        </p>
        <p>
          The geolocation source alone contains{" "}
          <strong>1,000,163 raw rows, including 261,831 duplicates</strong> in
          the inspected report. That scale describes input records, not unique
          customers or trusted output rows.
        </p>
      </CaseSection>
      <CaseSection
        id="contribution"
        eyebrow="02 / My contribution"
        title="From ingestion to reporting."
      >
        <p>
          I implemented the capstone’s entity pipelines, SQL loading logic,
          product history, API consumer, scheduler, audit/data-quality
          persistence, tests, and a populated four-page Power BI report.
        </p>
        <ul>
          <li>
            Separate staging, trusted, data-quality, and audit concerns, with
            run identifiers and source-row lineage.
          </li>
          <li>
            Load related entities in dependency order and normalize Python
            values before binding SQL parameters.
          </li>
          <li>
            Track product changes with SCD Type 2, plus snapshot soft deletion
            and reactivation under a complete-snapshot assumption.
          </li>
          <li>
            Expose analytical views and consider fact grain before building
            report joins.
          </li>
        </ul>
      </CaseSection>
      <CaseSection
        id="architecture"
        eyebrow="03 / Architecture"
        title="Keep the path to a number visible."
      >
        <Architecture
          steps={[
            "CSV files + local paginated APIs",
            "Raw staging + source lineage",
            "Validation + transformation",
            "SQL Server tables + product history",
            "Analytical views → Power BI",
          ]}
          note="Python / pandas / SQL Server / T-SQL / pyodbc / FastAPI / Requests / APScheduler / automated tests / Power BI"
        />
        <p>
          The API feeds serve supplied payments/reviews data locally. They
          demonstrate pagination and ingestion behavior; they are not a live
          commerce-provider integration.
        </p>
      </CaseSection>
      <CaseSection
        id="decisions"
        eyebrow="04 / Engineering decisions"
        title="Reliability lives in the details."
      >
        <Decision title="Change-aware loads, not repeated rewrites.">
          <p>
            Set-based SQL compares business attributes before updating.
            Normalizing pandas/NumPy values into suitable Python/SQL parameters
            avoids mismatched nulls and types at the loading boundary.
          </p>
        </Decision>
        <Decision title="History is part of the model.">
          <p>
            When product attributes change, the old version expires and a new
            current version is created. Missing products may be soft-deleted
            only because master-entity inputs are treated as complete snapshots;
            partial feeds would need a different policy.
          </p>
        </Decision>
        <Decision title="A failed load should leave an explanation.">
          <p>
            Each pipeline has a business transaction, while audit and
            data-quality logging use separate persistence. A rollback can
            therefore preserve the diagnostic record explaining the failure.
          </p>
        </Decision>
        <Decision title="Bound the integrations.">
          <p>
            API ingestion uses pagination, timeouts, and bounded retries.
            Scheduling controls are process-local; they are not a distributed
            scheduling guarantee.
          </p>
        </Decision>
        <Decision title="Respect the analytical grain.">
          <p>
            Order items and payments can each contain multiple rows per order.
            Joining both directly can multiply facts. Reporting requires an
            explicit grain and suitable aggregation before combining those
            relationships.
          </p>
        </Decision>
      </CaseSection>
      <CaseSection
        id="evaluation"
        eyebrow="05 / Evidence & boundaries"
        title="What the project demonstrates."
      >
        <p>
          The source and saved artifacts support implemented pipelines, history
          tracking, transaction handling, and a four-page Power BI report.
          Existing tests cover change detection, parameter normalization, API
          behavior, scheduling, and transaction failures.
        </p>
        <p>
          <strong>
            The portfolio review did not rerun SQL Server pipelines, refresh
            Power BI, or execute the original test suite.
          </strong>{" "}
          Historical reports and the CV contain different test counts, so no
          exact passing count is published here. Numerical speedup claims are
          also omitted because their benchmark context was not reproduced.
        </p>
        <p>
          This is internship/capstone work using a public dataset. It is not a
          production customer deployment, and dataset sales totals are not
          commercial revenue I generated.
        </p>
      </CaseSection>
      <CaseSection
        id="demo"
        eyebrow="06 / Try the idea"
        title="A product changes. Its past doesn’t."
      >
        <p>
          Select a snapshot to see why unchanged inputs preserve the same
          version and changed business attributes create history. The table
          remains available as a text equivalent.
        </p>
        <OlistDemo />
      </CaseSection>
    </CaseStudy>
  );
}
