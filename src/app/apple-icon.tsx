import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 48 48">
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
      </div>
    ),
    size,
  );
}
