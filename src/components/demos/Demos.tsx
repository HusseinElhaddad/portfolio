"use client";
import { useState } from "react";
import {
  historyAt,
  snapshots,
  retrievalExamples,
  campaignDays,
  rates,
} from "@/content/demo-logic";
import styles from "./Demos.module.css";
export function OlistDemo() {
  const [step, setStep] = useState(0);
  const rows = historyAt(step);
  return (
    <div className={styles.demo}>
      <div className={styles.demoTop}>
        <span className="eyebrow">Explore / product history</span>
        <span className="status">Synthetic records</span>
      </div>
      <p className={styles.provenance}>
        Illustrative example — no live database connection. Product P-001, with
        three prepared snapshots.
      </p>
      <div className={styles.steps} aria-label="Choose a product snapshot">
        {snapshots.map((s, i) => (
          <button
            key={s.date}
            aria-pressed={step === i}
            onClick={() => setStep(i)}
          >
            <span>
              0{i + 1} / {s.date}
            </span>
            {s.label}
          </button>
        ))}
      </div>
      <div className={styles.input}>
        <span className="eyebrow">Incoming attributes</span>
        <strong>
          {snapshots[step].category} · {snapshots[step].weight}g
        </strong>
      </div>
      <div
        className={styles.tableWrap}
        tabIndex={0}
        role="region"
        aria-label="Product version table, scroll if needed"
      >
        <table>
          <caption>Product P-001 — history after selected snapshot</caption>
          <thead>
            <tr>
              <th>Version</th>
              <th>Category</th>
              <th>Weight</th>
              <th>Valid from</th>
              <th>Valid until</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.version}>
                <td>0{r.version}</td>
                <td>{r.category}</td>
                <td>{r.weight}g</td>
                <td>{r.from}</td>
                <td>{r.to || "Open"}</td>
                <td className={r.current ? styles.current : ""}>
                  {r.current ? "Current" : "Historical"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.explanation} aria-live="polite">
        {step === 0
          ? "The first snapshot creates one current product version."
          : step === 1
            ? "The business attributes are unchanged. No extra version is created."
            : "Changed category and weight close the old version and create a new current version. The end timestamp is exclusive."}
      </p>
      <button className={styles.reset} onClick={() => setStep(0)}>
        Reset example ↺
      </button>
    </div>
  );
}
export function FplDemo() {
  const [selected, setSelected] = useState(0);
  const example = retrievalExamples[selected];
  return (
    <div className={styles.demo}>
      <div className={styles.demoTop}>
        <span className="eyebrow">Explore / retrieval walkthrough</span>
        <span className="status">Prepared example</span>
      </div>
      <p className={styles.provenance}>
        Illustrative retrieval walkthrough. All players, scores, news notes, and
        answers below are authored synthetic fixtures. Dated April 2026 for
        historical context; no live AI or football advice.
      </p>
      <label className={styles.selectLabel}>
        Choose a question
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {retrievalExamples.map((e, i) => (
            <option key={e.question} value={i}>
              {e.question}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.retrievalGrid} aria-live="polite">
        <div>
          <span className="eyebrow">01 / Player context</span>
          <h3>{example.player}</h3>
          <p>{example.stats}</p>
        </div>
        <div>
          <span className="eyebrow">02 / Source reference</span>
          <h3>{example.source}</h3>
          <p>{example.evidence}</p>
        </div>
        <div className={styles.answer}>
          <span className="eyebrow">03 / Prepared explanation</span>
          <p>{example.answer}</p>
        </div>
      </div>
      <p className="small-note">
        In the original application: a rule-based router selects a path;
        retrieval supplies context to an LLM. This local example explains that
        boundary without executing it.
      </p>
      <button className={styles.reset} onClick={() => setSelected(0)}>
        Reset example ↺
      </button>
    </div>
  );
}
export function SawakliDemo() {
  const [selected, setSelected] = useState(0);
  const day = campaignDays[selected];
  const current = rates(day);
  return (
    <div className={styles.demo}>
      <div className={styles.demoTop}>
        <span className="eyebrow">Explore / campaign observations</span>
        <span className="status">Synthetic timeline</span>
      </div>
      <p className={styles.provenance}>
        Prepared synthetic campaign observations, scoped to one fictional
        organization. No model ensemble runs here. Select an observation to
        inspect the values and their interpretation.
      </p>
      <div
        className={styles.timeline}
        aria-label="Choose a campaign observation"
      >
        {campaignDays.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span
              className={styles.bar}
              style={{
                height: `${d.impressions ? 20 + (rates(d).ctr || 0) * 36 : 5}px`,
              }}
            />
            <span>{d.day}</span>
            <strong>
              {rates(d).ctr === null ? "N/A" : `${rates(d).ctr?.toFixed(2)}%`}
            </strong>
          </button>
        ))}
      </div>
      <div className={styles.dayDetail} aria-live="polite">
        <span className="eyebrow">
          {day.day} / {day.context}
        </span>
        <div className={styles.metrics}>
          <div>
            <span>CTR</span>
            <strong>
              {current.ctr === null
                ? "Unavailable"
                : `${current.ctr.toFixed(2)}%`}
            </strong>
          </div>
          <div>
            <span>CPC · sample currency</span>
            <strong>
              {current.cpc === null ? "Unavailable" : current.cpc.toFixed(2)}
            </strong>
          </div>
        </div>
        <p>{day.explanation}</p>
      </div>
      <div
        className={styles.tableWrap}
        tabIndex={0}
        role="region"
        aria-label="Campaign data table, scroll if needed"
      >
        <table>
          <caption>Text equivalent — complete synthetic input</caption>
          <thead>
            <tr>
              <th>Observation</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Spend</th>
            </tr>
          </thead>
          <tbody>
            {campaignDays.map((d) => (
              <tr key={d.day}>
                <th scope="row">{d.day}</th>
                <td>{d.impressions.toLocaleString("en-US")}</td>
                <td>{d.clicks}</td>
                <td>{d.spend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className={styles.reset} onClick={() => setSelected(0)}>
        Reset example ↺
      </button>
    </div>
  );
}
