import test from "node:test";
import assert from "node:assert/strict";
import { historyAt, rates, validTheme } from "../src/content/demo-logic.ts";
test("unchanged snapshots preserve a single version; changed attributes expire history", () => {
  assert.equal(historyAt(0).length, 1);
  assert.deepEqual(historyAt(1), historyAt(0));
  const changed = historyAt(2);
  assert.equal(changed.length, 2);
  assert.equal(changed[0].current, false);
  assert.equal(changed[0].to, changed[1].from);
  assert.equal(changed[1].current, true);
  assert.equal(changed[1].to, null);
  assert.equal(changed.filter((x) => x.current).length, 1);
});
test("reset reconstructs clean history without mutating previous results", () => {
  const before = historyAt(0);
  historyAt(2);
  assert.deepEqual(historyAt(0), before);
  assert.equal(historyAt(0)[0].category, "Home");
});
test("rates keep zero denominators unavailable; valid zero numerator is zero", () => {
  assert.deepEqual(rates({ impressions: 0, clicks: 0, spend: 0 }), {
    ctr: null,
    cpc: null,
  });
  assert.deepEqual(rates({ impressions: 100, clicks: 0, spend: 10 }), {
    ctr: 0,
    cpc: null,
  });
  assert.deepEqual(rates({ impressions: 10000, clicks: 200, spend: 100 }), {
    ctr: 2,
    cpc: 0.5,
  });
});
test("invalid or unavailable stored preferences resolve to system", () => {
  for (const invalid of [undefined, null, "broken", "", {}])
    assert.equal(validTheme(invalid), "system");
  assert.equal(validTheme("dark"), "dark");
  assert.equal(validTheme("light"), "light");
});
