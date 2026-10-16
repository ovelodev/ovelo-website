import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Ovelo — Useful technology. Thoughtfully built.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #ffffff 0%, #f3f0ff 60%, #e9e3ff 100%)",
          color: "#0a0f2e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="g" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2f6bff" />
                <stop offset="0.55" stopColor="#7b5cff" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path d="M24 6a18 18 0 1 0 17.3 13" fill="none" stroke="url(#g)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="35.6" cy="10.2" r="4.6" fill="url(#g)" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>Ovelo</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>Useful technology.</span>
          <span
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              backgroundImage: "linear-gradient(110deg, #2a5cf0, #6d4af0, #9333ea)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Thoughtfully built.
          </span>
        </div>
        <span style={{ fontSize: 28, color: "#4a5174" }}>
          Practical software, AI-powered experiences and digital tools.
        </span>
      </div>
    ),
    size,
  );
}
