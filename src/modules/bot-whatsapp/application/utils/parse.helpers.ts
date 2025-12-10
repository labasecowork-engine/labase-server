export function parseTimeLoose(input: string): string | null {
  const t = input.trim().toLowerCase();

  if (/(doce)\s+y\s+(media)/.test(t)) return "12:30";
  if (/^\d{1,2}$/.test(t)) {
    const hh = String(Number(t)).padStart(2, "0");
    if (Number(hh) <= 23) return `${hh}:00`;
  }
  // 12h
  const m12 = t.match(/^([1-9]|1[0-2])[:\.]?([0-5]\d)?\s*([ap]\.?m\.?)$/i);
  if (m12) {
    let hh = Number(m12[1]);
    const mm = m12[2] ? m12[2] : "00";
    const ampm = m12[3][0].toLowerCase();
    if (ampm === "p" && hh < 12) hh += 12;
    if (ampm === "a" && hh === 12) hh = 0;
    return `${String(hh).padStart(2, "0")}:${mm}`;
  }
  // 24h
  const m24 = t.match(/^([01]?\d|2[0-3])[:\.]([0-5]\d)$/);
  if (m24) return `${m24[1].padStart(2, "0")}:${m24[2]}`;
  return null;
}

export function parseDateLoose(input: string): string | null {
  const t = input.trim();
  // YYYY-M-D
  const m = t.match(/^(\d{4})[-\/\.](\d{1,2})[-\/\.](\d{1,2})$/);
  if (m) {
    const y = m[1];
    const mo = String(Number(m[2])).padStart(2, "0");
    const d = String(Number(m[3])).padStart(2, "0");
    return `${y}-${mo}-${d}`;
  }
  // DD/MM
  const m2 = t.match(/^(\d{1,2})[-\/\.](\d{1,2})$/);
  if (m2) {
    const y = new Date().getFullYear();
    const d = String(Number(m2[1])).padStart(2, "0");
    const mo = String(Number(m2[2])).padStart(2, "0");
    return `${y}-${mo}-${d}`;
  }
  return null;
}

export function fuzzySpace(input: string, candidates: string[]): string | null {
  const t = input.toLowerCase().trim();
  for (const c of candidates) {
    if (t === c || t.includes(c)) return c;
  }
  for (const c of candidates) {
    if (levenshtein(t, c) <= 1) return c;
  }
  return null;
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    [i].concat(Array(b.length).fill(0))
  );
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[a.length][b.length];
}
