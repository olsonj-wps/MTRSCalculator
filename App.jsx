  const { useState, useEffect, useRef } = React;

const TIER1_AGES = Array.from({ length: 20 }, (_, i) => 46 + i);
const TIER2_AGES = Array.from({ length: 8 }, (_, i) => 60 + i);

const T1 = {
  10:{55:15,56:16,57:17,58:18,59:19,60:20,61:21,62:22,63:23,64:24,65:25},
  11:{55:16.5,56:17.6,57:18.7,58:19.8,59:20.9,60:22,61:23.1,62:24.2,63:25.3,64:26.4,65:27.5},
  12:{55:18,56:19.2,57:20.4,58:21.6,59:22.8,60:24,61:25.2,62:26.4,63:27.6,64:28.8,65:30},
  13:{55:19.5,56:20.8,57:22.1,58:23.4,59:24.7,60:26,61:27.3,62:28.6,63:29.9,64:31.2,65:32.5},
  14:{55:21,56:22.4,57:23.8,58:25.2,59:26.6,60:28,61:29.4,62:30.8,63:32.2,64:33.6,65:35},
  15:{55:22.5,56:24,57:25.5,58:27,59:28.5,60:30,61:31.5,62:33,63:34.5,64:36,65:37.5},
  16:{55:24,56:25.6,57:27.2,58:28.8,59:30.4,60:32,61:33.6,62:35.2,63:36.8,64:38.4,65:40},
  17:{55:25.5,56:27.2,57:28.9,58:30.6,59:32.3,60:34,61:35.7,62:37.4,63:39.1,64:40.8,65:42.5},
  18:{55:27,56:28.8,57:30.6,58:32.4,59:34.2,60:36,61:37.8,62:39.6,63:41.4,64:43.2,65:45},
  19:{55:28.5,56:30.4,57:32.3,58:34.2,59:36.1,60:38,61:39.9,62:41.8,63:43.7,64:45.6,65:47.5},
  20:{46:12,47:14,48:16,49:18,50:20,51:22,52:24,53:26,54:28,55:30,56:32,57:34,58:36,59:38,60:40,61:42,62:44,63:46,64:48,65:50},
  21:{46:12.6,47:14.7,48:16.8,49:18.9,50:21,51:23.1,52:25.2,53:27.3,54:29.4,55:31.5,56:33.6,57:35.7,58:37.8,59:39.9,60:42,61:44.1,62:46.2,63:48.3,64:50.4,65:52.5},
  22:{46:13.2,47:15.4,48:17.6,49:19.8,50:22,51:24.2,52:26.4,53:28.6,54:30.8,55:33,56:35.2,57:37.4,58:39.6,59:41.8,60:44,61:46.2,62:48.4,63:50.6,64:52.8,65:55},
  23:{46:13.8,47:16.1,48:18.4,49:20.7,50:23,51:25.3,52:27.6,53:29.9,54:32.2,55:34.5,56:36.8,57:39.1,58:41.4,59:43.7,60:46,61:48.3,62:50.6,63:52.9,64:55.2,65:57.5},
  24:{46:14.4,47:16.8,48:19.2,49:21.6,50:24,51:26.4,52:28.8,53:31.2,54:33.6,55:36,56:38.4,57:40.8,58:43.2,59:45.6,60:48,61:50.4,62:52.8,63:55.2,64:57.6,65:60},
  25:{46:15,47:17.5,48:20,49:22.5,50:25,51:27.5,52:30,53:32.5,54:35,55:37.5,56:40,57:42.5,58:45,59:47.5,60:50,61:52.5,62:55,63:57.5,64:60,65:62.5},
  26:{46:15.6,47:18.2,48:20.8,49:23.4,50:26,51:28.6,52:31.2,53:33.8,54:36.4,55:39,56:41.6,57:44.2,58:46.8,59:49.4,60:52,61:54.6,62:57.2,63:59.8,64:62.4,65:65},
  27:{47:18.9,48:21.6,49:24.3,50:27,51:29.7,52:32.4,53:35.1,54:37.8,55:40.5,56:43.2,57:45.9,58:48.6,59:51.3,60:54,61:56.7,62:59.4,63:62.1,64:64.8,65:67.5},
  28:{48:22.4,49:25.2,50:28,51:30.8,52:33.6,53:36.4,54:39.2,55:42,56:44.8,57:47.6,58:50.4,59:53.2,60:56,61:58.8,62:61.6,63:64.4,64:67.2,65:70},
  29:{49:26.1,50:29,51:31.9,52:34.8,53:37.7,54:40.6,55:43.5,56:46.4,57:49.3,58:52.2,59:55.1,60:58,61:60.9,62:63.8,63:66.7,64:69.6,65:72.5},
  30:{50:30,51:33,52:36,53:39,54:42,55:45,56:48,57:51,58:54,59:57,60:60,61:63,62:66,63:69,64:72,65:75},
  31:{50:34.1,51:37.2,52:40.3,53:43.4,54:46.5,55:49.6,56:52.7,57:55.8,58:58.9,59:62,60:65.1,61:68.2,62:71.3,63:74.4,64:77.5},
  32:{50:38.4,51:41.6,52:44.8,53:48,54:51.2,55:54.4,56:57.6,57:60.8,58:64,59:67.2,60:70.4,61:73.6,62:76.8,63:80},
  33:{50:42.9,51:46.2,52:49.5,53:52.8,54:56.1,55:59.4,56:62.7,57:66,58:69.3,59:72.6,60:75.9,61:79.2,62:80},
  34:{50:47.6,51:51,52:54.4,53:57.8,54:61.2,55:64.6,56:68,57:71.4,58:74.8,59:78.2,60:80,61:80},
  35:{50:52.5,51:56,52:59.5,53:63,54:66.5,55:70,56:73.5,57:77,58:80,59:80,60:80},
  36:{50:57.6,51:61.2,52:64.8,53:68.4,54:72,55:75.6,56:79.2,57:80,58:80,59:80},
  37:{50:62.9,51:66.6,52:70.3,53:74,54:77.7,55:80,56:80,57:80,58:80},
  38:{50:68.4,51:72.2,52:76,53:79.8,54:80,55:80,56:80,57:80},
  39:{50:74.1,51:78,52:80,53:80,54:80,55:80,56:80},
  40:{50:80,51:80,52:80,53:80,54:80,55:80},
};

const T1R = {
  30:{p:12,d:{50:42,51:45,52:48,53:51,54:54,55:57,56:60,57:63,58:66,59:69,60:72,61:75,62:78,63:80,64:80,65:80}},
  31:{p:14,d:{50:48.1,51:51.2,52:54.3,53:57.4,54:60.5,55:63.6,56:66.7,57:69.8,58:72.9,59:76,60:79.1,61:80,62:80,63:80,64:80}},
  32:{p:16,d:{50:54.4,51:57.6,52:60.8,53:64,54:67.2,55:70.4,56:73.6,57:76.8,58:80,59:80,60:80,61:80,62:80,63:80}},
  33:{p:18,d:{50:60.9,51:64.2,52:67.5,53:70.8,54:74.1,55:77.4,56:80,57:80,58:80,59:80,60:80,61:80,62:80}},
  34:{p:20,d:{50:67.6,51:71,52:74.4,53:77.8,54:80,55:80,56:80,57:80,58:80,59:80,60:80,61:80}},
  35:{p:22,d:{50:74.5,51:78,52:80,53:80,54:80,55:80,56:80,57:80,58:80,59:80,60:80}},
  36:{p:24,d:{50:80,51:80,52:80,53:80,54:80,55:80,56:80,57:80,58:80,59:80}},
  37:{p:26,d:{50:80,51:80,52:80,53:80,54:80,55:80,56:80,57:80,58:80}},
  38:{p:28,d:{50:80,51:80,52:80,53:80,54:80,55:80,56:80,57:80}},
  39:{p:30,d:{50:80,51:80,52:80,53:80,54:80,55:80,56:80}},
  40:{p:32,d:{50:80,51:80,52:80,53:80,54:80,55:80}},
};

const T2 = {
  10:{60:14.5,61:16,62:17.5,63:19,64:20.5,65:22,66:23.5,67:25},
  11:{60:15.95,61:17.6,62:19.25,63:20.9,64:22.55,65:24.2,66:25.85,67:27.5},
  12:{60:17.4,61:19.2,62:21,63:22.8,64:24.6,65:26.4,66:28.2,67:30},
  13:{60:18.85,61:20.8,62:22.75,63:24.7,64:26.65,65:28.6,66:30.55,67:32.5},
  14:{60:20.3,61:22.4,62:24.5,63:26.6,64:28.7,65:30.8,66:32.9,67:35},
  15:{60:21.75,61:24,62:26.25,63:28.5,64:30.75,65:33,66:35.25,67:37.5},
  16:{60:23.2,61:25.6,62:28,63:30.4,64:32.8,65:35.2,66:37.6,67:40},
  17:{60:24.65,61:27.2,62:29.75,63:32.3,64:34.85,65:37.4,66:39.95,67:42.5},
  18:{60:26.1,61:28.8,62:31.5,63:34.2,64:36.9,65:39.6,66:42.3,67:45},
  19:{60:27.55,61:30.4,62:33.25,63:36.1,64:38.95,65:41.8,66:44.65,67:47.5},
  20:{60:29,61:32,62:35,63:38,64:41,65:44,66:47,67:50},
  21:{60:30.45,61:33.6,62:36.75,63:39.9,64:43.05,65:46.2,66:49.35,67:52.5},
  22:{60:31.9,61:35.2,62:38.5,63:41.8,64:45.1,65:48.4,66:51.7,67:55},
  23:{60:33.35,61:36.8,62:40.25,63:43.7,64:47.15,65:50.6,66:54.05,67:57.5},
  24:{60:34.8,61:38.4,62:42,63:45.6,64:49.2,65:52.8,66:56.4,67:60},
  25:{60:36.25,61:40,62:43.75,63:47.5,64:51.25,65:55,66:58.75,67:62.5},
  26:{60:37.7,61:41.6,62:45.5,63:49.4,64:53.3,65:57.2,66:61.1,67:65},
  27:{60:39.15,61:43.2,62:47.25,63:51.3,64:55.35,65:59.4,66:63.45,67:67.5},
  28:{60:40.6,61:44.8,62:49,63:53.2,64:57.4,65:61.6,66:65.8,67:70},
  29:{60:42.05,61:46.4,62:50.75,63:55.1,64:59.45,65:63.8,66:68.15,67:72.5},
  30:{60:48.75,61:52.5,62:56.25,63:60,64:63.75,65:67.5,66:71.25,67:75},
  31:{60:50.37,61:54.25,62:58.12,63:62,64:65.87,65:69.75,66:73.62,67:77.5},
  32:{60:52,61:56,62:60,63:64,64:68,65:72,66:76,67:80},
  33:{60:53.62,61:57.75,62:61.87,63:66,64:70.12,65:74.25,66:78.37,67:80},
  34:{60:55.25,61:59.5,62:63.75,63:68,64:72.25,65:76.5,66:80,67:80},
  35:{60:56.87,61:61.25,62:65.62,63:70,64:74.37,65:78.75,66:80,67:80},
};

const T2R = {
  30:{p:14,d:{60:62.75,61:66.5,62:70.25,63:74,64:77.75,65:80,66:80,67:80}},
  31:{p:16,d:{60:66.37,61:70.25,62:74.12,63:78,64:80,65:80,66:80,67:80}},
  32:{p:18,d:{60:70,61:74,62:78,63:80,64:80,65:80,66:80,67:80}},
  33:{p:20,d:{60:73.62,61:77.75,62:80,63:80,64:80,65:80,66:80,67:80}},
  34:{p:22,d:{60:77.25,61:80,62:80,63:80,64:80,65:80,66:80,67:80}},
  35:{p:24,d:{60:80,61:80,62:80,63:80,64:80,65:80,66:80,67:80}},
};

function pctColor(v) {
  if (v == null) return "transparent";
  const t = Math.min(v / 80, 1);
  if (t < 0.5) {
    const s = t / 0.5;
    const r = Math.round(61 + (61 - 61) * s);
    const g = Math.round(31 + (53 - 31) * s);
    const b = Math.round(31 + (32 - 31) * s);
    return `rgb(${r},${g},${b})`;
  }
  const s = (t - 0.5) / 0.5;
  const r = Math.round(61 + (27 - 61) * s);
  const g = Math.round(53 + (67 - 53) * s);
  const b = Math.round(32 + (50 - 32) * s);
  return `rgb(${r},${g},${b})`;
}

function Slider({ label, value, onChange, min, max, step = 1 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#666" }}>{label}</span>
        <span style={{ fontSize: 22, fontWeight: 200, color: "#e0e0e0", fontFamily: "'Cormorant Garamond', serif" }}>{label === "SALARY AVERAGE" ? `$${value.toLocaleString()}` : value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#4a6a8a", height: 2, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#444" }}>
        <span>{label === "SALARY AVERAGE" ? `$${min.toLocaleString()}` : min}</span>
        <span>{label === "SALARY AVERAGE" ? `$${max.toLocaleString()}` : max}</span>
      </div>
    </div>
  );
}

function Grid({ ages, regular, rplus, age, yos, maxAge }) {
  const constant = age - yos;
  const allYears = Object.keys(regular).map(Number).sort((a, b) => a - b);
  const gridRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (targetRef.current && gridRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  }, [age, yos]);

  const rows = [];
  for (const yr of allYears) {
    const regData = regular[yr] || {};
    const rpData = rplus[yr];

    rows.push({ type: "reg", yr, data: regData, rpLabel: null });
    if (rpData) {
      rows.push({ type: "rp", yr, data: rpData.d, rpLabel: `R+ ${rpData.p}%` });
    }
  }

  return (
    <div ref={gridRef} style={{
      overflowX: "auto", overflowY: "auto", maxHeight: "60vh",
      borderRadius: 2, border: "1px solid #1a1a1a",
      scrollbarWidth: "thin", scrollbarColor: "#333 #111"
    }}>
      <table style={{ borderCollapse: "collapse", fontSize: 11, fontFamily: "'Cormorant Garamond', serif", minWidth: "100%" }}>
        <thead>
          <tr style={{ position: "sticky", top: 0, zIndex: 10 }}>
            <th style={{ ...thStyle, position: "sticky", left: 0, zIndex: 20, minWidth: 44 }}>YRS</th>
            <th style={{ ...thStyle, position: "sticky", left: 44, zIndex: 20, minWidth: 56 }}>TYPE</th>
            {ages.map(a => (
              <th key={a} style={{
                ...thStyle,
                minWidth: 52,
                color: a === Math.min(age, maxAge) ? "#88b4d8" : "#555",
                borderBottom: a === Math.min(age, maxAge) ? "2px solid #4a6a8a" : "1px solid #1a1a1a",
              }}>
                {a === maxAge ? `${a}+` : a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const isTarget = row.yr === yos;
            const isRp = row.type === "rp";
            return (
              <tr key={`${row.yr}-${row.type}`}>
                <td style={{
                  ...tdStyle,
                  position: "sticky", left: 0, zIndex: 5,
                  background: isTarget ? "#1a2a3a" : "#111",
                  color: isTarget ? "#88b4d8" : "#555",
                  fontWeight: isTarget ? 400 : 200,
                  borderRight: "1px solid #1a1a1a",
                }}>
                  {row.yr}
                </td>
                <td style={{
                  ...tdStyle,
                  position: "sticky", left: 44, zIndex: 5,
                  background: isTarget ? "#1a2a3a" : "#111",
                  color: isRp ? "#7b6b9b" : "#444",
                  fontSize: 9,
                  letterSpacing: 1,
                  borderRight: "1px solid #222",
                }}>
                  {isRp ? row.rpLabel : "REG"}
                </td>
                {ages.map(a => {
                  const clampedAge = Math.min(a, maxAge);
                  const val = row.data[clampedAge] != null ? row.data[clampedAge] : row.data[a];
                  const onDiag = (a - row.yr) === constant && val != null;
                  const isExact = row.yr === yos && a === Math.min(age, maxAge) && val != null;
                  const isExactRp = isExact && isRp;

                  return (
                    <td
                      key={a}
                      ref={isExact && !isRp ? targetRef : undefined}
                      style={{
                        ...tdStyle,
                        background: isExact
                          ? (isRp ? "rgba(100,80,140,0.5)" : "rgba(74,144,217,0.55)")
                          : onDiag
                            ? (isRp ? "rgba(70,55,100,0.25)" : "rgba(42,58,74,0.6)")
                            : val != null ? pctColor(val) : "transparent",
                        color: isExact
                          ? "#fff"
                          : onDiag
                            ? (isRp ? "#a090c0" : "#aaccee")
                            : val != null
                              ? (val >= 75 ? "#c0e0c0" : "#888")
                              : "#222",
                        fontWeight: isExact ? 400 : 200,
                        fontSize: isExact ? 13 : 11,
                        borderLeft: onDiag ? "1px solid rgba(74,106,138,0.4)" : "1px solid #151515",
                        borderRight: onDiag ? "1px solid rgba(74,106,138,0.4)" : "1px solid #151515",
                        transition: "all 0.3s ease",
                        boxShadow: isExact ? "inset 0 0 12px rgba(74,144,217,0.3)" : "none",
                      }}
                    >
                      {val != null ? `${val.toFixed(1)}` : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "8px 6px",
  textAlign: "center",
  background: "#0d0d0d",
  color: "#555",
  fontWeight: 300,
  fontSize: 10,
  letterSpacing: 1,
  textTransform: "uppercase",
  borderBottom: "1px solid #1a1a1a",
  borderRight: "1px solid #151515",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "5px 6px",
  textAlign: "center",
  borderBottom: "1px solid #111",
  borderRight: "1px solid #151515",
  whiteSpace: "nowrap",
  fontWeight: 200,
};

  function App() {
  const [tier, setTier] = useState(1);
  const [age, setAge] = useState(62);
  const [yos, setYos] = useState(30);
  const [salary, setSalary] = useState(85000);
  const [rpEnabled, setRpEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const ages = tier === 1 ? TIER1_AGES : TIER2_AGES;
  const regular = tier === 1 ? T1 : T2;
  const rplusData = tier === 1 ? T1R : T2R;
  const maxAge = ages[ages.length - 1];

  const clampedAge = Math.min(age, maxAge);
  const regPct = regular[yos]?.[clampedAge] ?? null;
  const rpPct = rplusData[yos]?.d?.[clampedAge] ?? null;
  const bestPct = rpEnabled && rpPct != null ? rpPct : regPct;
  const annual = bestPct != null ? (bestPct / 100) * salary : null;
  const monthly = annual != null ? annual / 12 : null;

  const minAge = tier === 1 ? 46 : 60;
  const maxAgeSlider = tier === 1 ? 65 : 67;
  const minYos = 10;
  const maxYos = tier === 1 ? 40 : 35;

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      background: "#0a0a0a",
      color: "#d0d0d0",
      minHeight: "100vh",
      padding: "24px 16px",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "none" : "translateY(8px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@200;300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        input[type=range] { -webkit-appearance: none; appearance: none; background: #222; border-radius: 0; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #4a6a8a; cursor: pointer; border: none; }
        input[type=range]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #4a6a8a; cursor: pointer; border: none; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
        table { font-variant-numeric: tabular-nums; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#444", textTransform: "uppercase", marginBottom: 8 }}>
            MASSACHUSETTS TEACHERS RETIREMENT SYSTEM
          </div>
          <div style={{ fontSize: 28, fontWeight: 200, color: "#e0e0e0", lineHeight: 1.2 }}>
            Retirement Calculator
          </div>
        </div>

        {/* Tier toggle */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28 }}>
          {[1, 2].map(t => (
            <button key={t} onClick={() => { setTier(t); if (t === 2 && age < 60) setAge(60); if (t === 2 && yos > 35) setYos(35); }}
              style={{
                padding: "10px 24px",
                background: tier === t ? "#1a1a1a" : "transparent",
                border: `1px solid ${tier === t ? "#333" : "#1a1a1a"}`,
                color: tier === t ? "#d0d0d0" : "#444",
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.3s",
                borderBottom: tier === t ? "1px solid #4a6a8a" : "1px solid #1a1a1a",
              }}
            >
              TIER {t}
            </button>
          ))}
          <div style={{ marginLeft: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 9, letterSpacing: 2, color: "#444", textTransform: "uppercase" }}>
              {tier === 1 ? "Before April 2, 2012" : "On or after April 2, 2012"}
            </span>
          </div>
        </div>

        {/* Controls + Results */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 24, marginBottom: 28, alignItems: "start" }}>
          {/* Sliders */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Slider label="RETIREMENT AGE" value={age} onChange={setAge} min={minAge} max={maxAgeSlider} />
            <Slider label="YEARS OF SERVICE" value={yos} onChange={setYos} min={minYos} max={maxYos} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Slider label="SALARY AVERAGE" value={salary} onChange={setSalary} min={30000} max={200000} step={1000} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#666" }}>RETIREMENTPLUS</span>
              <button
                onClick={() => setRpEnabled(!rpEnabled)}
                style={{
                  padding: "8px 16px",
                  background: rpEnabled ? "rgba(74,106,138,0.15)" : "transparent",
                  border: `1px solid ${rpEnabled ? "#4a6a8a" : "#222"}`,
                  color: rpEnabled ? "#88b4d8" : "#444",
                  fontSize: 11,
                  letterSpacing: 2,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.3s",
                  textAlign: "left",
                }}
              >
                {rpEnabled ? "ENABLED" : "DISABLED"}
              </button>
            </div>
          </div>

          {/* Results */}
          <div style={{
            background: "#111",
            border: "1px solid #1a1a1a",
            padding: "20px 28px",
            minWidth: 200,
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", textTransform: "uppercase" }}>
                {rpEnabled && rpPct != null ? "RETIREMENTPLUS %" : "REGULAR %"}
              </div>
              <div style={{
                fontSize: 44, fontWeight: 200, color: bestPct != null ? (bestPct >= 80 ? "#5a9a6a" : "#e0e0e0") : "#333",
                lineHeight: 1.1,
              }}>
                {bestPct != null ? `${bestPct.toFixed(1)}%` : "--"}
              </div>
              {rpEnabled && rpPct != null && regPct != null && (
                <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>
                  Regular: {regPct.toFixed(1)}% / R+: {rpPct.toFixed(1)}%
                </div>
              )}
            </div>
            <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 12, display: "flex", gap: 24 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", textTransform: "uppercase" }}>ANNUAL</div>
                <div style={{ fontSize: 20, fontWeight: 200, color: annual != null ? "#e0e0e0" : "#333" }}>
                  {annual != null ? `$${Math.round(annual).toLocaleString()}` : "--"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", textTransform: "uppercase" }}>MONTHLY</div>
                <div style={{ fontSize: 20, fontWeight: 200, color: monthly != null ? "#e0e0e0" : "#333" }}>
                  {monthly != null ? `$${Math.round(monthly).toLocaleString()}` : "--"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginBottom: 12, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, background: "rgba(74,144,217,0.55)", borderRadius: 1 }} />
            <span style={{ fontSize: 9, letterSpacing: 1, color: "#555", textTransform: "uppercase" }}>YOUR RETIREMENT POINT</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, background: "rgba(42,58,74,0.6)", borderRadius: 1 }} />
            <span style={{ fontSize: 9, letterSpacing: 1, color: "#555", textTransform: "uppercase" }}>CAREER PATH</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, background: pctColor(80), borderRadius: 1 }} />
            <span style={{ fontSize: 9, letterSpacing: 1, color: "#555", textTransform: "uppercase" }}>80% CAP</span>
          </div>
        </div>

        {/* Grid */}
        <Grid ages={ages} regular={regular} rplus={rplusData} age={age} yos={yos} maxAge={maxAge} />

        {/* Footer */}
        <div style={{ marginTop: 16, fontSize: 9, color: "#333", letterSpacing: 1 }}>
          DATA SOURCE: MTRS RETIREMENT PERCENTAGE CHARTS, TIER 1 AND TIER 2. MAX BENEFIT 80% OF SALARY AVERAGE.
        </div>
      </div>
    </div>
  );
}
 ReactDOM.createRoot(document.getElementById("root")).render(<App />);
