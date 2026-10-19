export type Version = {
  version: number;
  category: string;
  weight: number;
  from: string;
  to: string | null;
  current: boolean;
};
export const snapshots = [
  {
    date: "2026-01-01",
    category: "Home",
    weight: 500,
    label: "Initial snapshot",
  },
  {
    date: "2026-01-02",
    category: "Home",
    weight: 500,
    label: "Unchanged snapshot",
  },
  {
    date: "2026-01-03",
    category: "Office",
    weight: 650,
    label: "Changed attributes",
  },
] as const;
export function historyAt(step: number): Version[] {
  const rows: Version[] = [];
  for (const s of snapshots.slice(0, Math.max(0, Math.min(2, step)) + 1)) {
    const previous = rows.at(-1);
    if (
      previous &&
      previous.category === s.category &&
      previous.weight === s.weight
    )
      continue;
    if (previous) {
      previous.current = false;
      previous.to = s.date;
    }
    rows.push({
      version: rows.length + 1,
      category: s.category,
      weight: s.weight,
      from: s.date,
      to: null,
      current: true,
    });
  }
  return rows;
}
export const retrievalExamples = [
  {
    question: "Why is context useful beside a score?",
    player: "Illustrative player A",
    stats: "Prepared score 6.2 / 15 · 74 average minutes",
    source: "Synthetic news note A · 15 April 2026",
    evidence:
      "The player returned to team training. Selection for the next match is still uncertain.",
    answer:
      "A score is only one signal. This prepared example highlights uncertain minutes beside the scoring context; a return to training does not confirm a starting place.",
  },
  {
    question: "What if the sources disagree?",
    player: "Illustrative player B",
    stats: "Prepared score 5.8 / 15 · 81 average minutes",
    source: "Synthetic news notes B + C · 15 April 2026",
    evidence:
      "One note reports a knock; another describes a possible return. Neither confirms availability.",
    answer:
      "The available context conflicts. This example preserves that uncertainty instead of turning two tentative reports into a confident recommendation.",
  },
  {
    question: "What if retrieval finds no evidence?",
    player: "Illustrative player C",
    stats: "Prepared score 4.1 / 15 · 62 average minutes",
    source: "No matching synthetic news note",
    evidence: "No relevant news evidence is included in this fixture.",
    answer:
      "There is no supporting news in this example. The numerical context can be shown, but an injury or selection explanation would be unsupported.",
  },
] as const;
export const campaignDays = [
  {
    day: "Day 01",
    impressions: 10000,
    clicks: 200,
    spend: 100,
    context: "Reference day",
    explanation:
      "CTR is 2.00%; CPC is 0.50. This is one synthetic observation, not a complete rolling reference window.",
  },
  {
    day: "Day 02",
    impressions: 10000,
    clicks: 190,
    spend: 100,
    context: "Similar performance",
    explanation:
      "CTR is 1.90%; CPC is 0.53 after rounding. A small daily change alone does not establish an anomaly.",
  },
  {
    day: "Day 03",
    impressions: 10000,
    clicks: 70,
    spend: 100,
    context: "Prepared review example",
    explanation:
      "CTR drops to 0.70% and CPC rises to 1.43. Compared with the prepared 2.00% reference, this merits investigation. It is not a model prediction or a calibrated probability.",
  },
  {
    day: "Day 04",
    impressions: 0,
    clicks: 0,
    spend: 0,
    context: "Missing denominator",
    explanation:
      "With zero impressions and clicks, CTR and CPC are unavailable. Missing rates remain missing; they are not evidence of perfect performance or a measured zero rate.",
  },
] as const;
export function rates(d: {
  impressions: number;
  clicks: number;
  spend: number;
}) {
  return {
    ctr: d.impressions > 0 ? (d.clicks / d.impressions) * 100 : null,
    cpc: d.clicks > 0 ? d.spend / d.clicks : null,
  };
}
export type Theme = "system" | "light" | "dark";
export function validTheme(value: unknown): Theme {
  return value === "light" || value === "dark" ? value : "system";
}
