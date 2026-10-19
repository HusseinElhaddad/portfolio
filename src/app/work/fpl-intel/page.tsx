import { pageMeta } from "@/content/site";
import {
  CaseStudy,
  CaseSection,
  Architecture,
  Decision,
} from "@/components/projects/CaseStudy";
import { FplDemo } from "@/components/demos/Demos";
export const metadata = pageMeta(
  "FPL-Intel — contextual AI integration",
  "Team-built Fantasy Premier League analytics. Hussein led six members, implemented RAG, integrated the app, and deployed Streamlit. Honest evaluation of a constructed scoring target.",
  "/work/fpl-intel/",
  "fpl-intel",
);
export default function Fpl() {
  return (
    <CaseStudy
      slug="fpl-intel"
      intro="Player statistics tell part of the story. Retrieval brings the surrounding context."
    >
      <CaseSection
        id="problem"
        eyebrow="01 / The problem"
        title="Make football information easier to explore."
      >
        <p>
          Fantasy Premier League managers need both numerical player context and
          news that can change how those numbers should be interpreted.
          FPL-Intel combines data ingestion, feature engineering, player
          scoring, retrieval, and a conversational interface.
        </p>
        <p>
          This was a <strong>six-member university team project</strong>. The
          inspected saved database contains 826 players, 20 teams, 380 fixtures,
          and 20 news articles. These are historical snapshot counts, not a
          current football feed.
        </p>
      </CaseSection>
      <CaseSection
        id="contribution"
        eyebrow="02 / My contribution"
        title="The connective work between data and an answer."
      >
        <p>
          I led the team,{" "}
          <strong>
            implemented the RAG component, integrated the application, and
            deployed the Streamlit app
          </strong>
          . Source history also supports deployment fixes, scoring-target
          redesign, advice logic, and documentation.
        </p>
        <p>
          The ingestion, feature engineering, model, and interface work belong
          to the wider team system. My central technical story is how retrieval
          and application integration connect those components.
        </p>
      </CaseSection>
      <CaseSection
        id="architecture"
        eyebrow="03 / Architecture"
        title="Retrieve context before generating a response."
      >
        <Architecture
          steps={[
            "Official FPL data + news ingestion",
            "SQLite → features + player scoring",
            "Hugging Face embeddings → Chroma",
            "Rule-based query routing + retrieved context",
            "Groq / Llama → Streamlit response",
          ]}
          note="Team stack: Python / pandas / NumPy / scikit-learn / XGBoost / SQLite / Streamlit / Plotly / ChromaDB / LangChain integrations. Inspected generation configuration: llama-3.3-70b-versatile."
        />
        <p>
          The runtime router uses explicit rules. Calling the application an
          autonomous agent would overstate how requests are dispatched.
        </p>
      </CaseSection>
      <CaseSection
        id="decisions"
        eyebrow="04 / Engineering decisions"
        title="Connect the signals without merging their meaning."
      >
        <Decision title="Retrieval supplies context, not certainty.">
          <p>
            Embeddings and Chroma retrieval bring relevant news into the
            language-model context. News can qualify numerical advice, but a
            retrieved report is still a source with its own date and
            uncertainty.
          </p>
        </Decision>
        <Decision title="Keep scoring and generation distinguishable.">
          <p>
            The model approximates a formula-derived expected-points score. The
            language layer explains player context around those scores. Neither
            step establishes a verified prediction of future match outcomes.
          </p>
        </Decision>
        <Decision title="Integrate for a usable application.">
          <p>
            Application integration and deployment exposed practical dependency
            and configuration issues. I worked on deployment fixes and
            documentation alongside the RAG path, so the project could be
            explored through Streamlit.
          </p>
        </Decision>
      </CaseSection>
      <CaseSection
        id="evaluation"
        eyebrow="05 / Evaluation & boundaries"
        title="A strong fit to a constructed target."
      >
        <p>
          The active saved model report covers{" "}
          <strong>524 modeled players and 22 features</strong>. Its target is:
        </p>
        <p>
          <code>
            xP = points_per_90 × average_minutes_per_gameweek / 90 ×
            fixture_ease_factor
          </code>
        </p>
        <p>
          The score is adjusted for availability and clipped to 0–15. Saved
          XGBoost results are <strong>MAE 0.2373 / R² 0.9376</strong>; Random
          Forest results are <strong>MAE 0.3440 / R² 0.8759</strong>. These
          measure approximation of that constructed target, not prediction of
          independently observed future gameweek points.
        </p>
        <p>
          The report identifies imputation before the split and a random player
          split rather than temporal validation. An improvement would fit
          preprocessing only on training data and evaluate against genuinely
          future outcomes with time-aware splits.
        </p>
        <p className="callout">
          Historical saved results; training and evaluation were not rerun for
          this portfolio. The original project was inspected read-only.
        </p>
      </CaseSection>
      <CaseSection
        id="demo"
        eyebrow="06 / Try the idea"
        title="Look inside a contextual answer."
      >
        <p>
          Choose a prepared question to inspect player context, source
          references, and an explanation. These are authored examples, not
          recovered historical model outputs.
        </p>
        <FplDemo />
        <p className="small-note">
          The{" "}
          <a href="https://fpl-intel.streamlit.app/">
            documented Streamlit deployment
          </a>{" "}
          redirects through Streamlit authentication in the launch check. Live
          application functionality is unverified; this embedded walkthrough is
          independent of that service.
        </p>
      </CaseSection>
    </CaseStudy>
  );
}
