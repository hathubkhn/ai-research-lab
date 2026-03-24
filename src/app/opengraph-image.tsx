import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "AppliedAI-Lab — AI for Bioinformatics, Time Series & Materials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "200px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Logo / Brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#e2e8f0",
              letterSpacing: "-0.5px",
            }}
          >
            AppliedAI-Lab
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "58px",
            fontWeight: "800",
            color: "#f8fafc",
            lineHeight: 1.1,
            marginBottom: "28px",
            maxWidth: "900px",
            letterSpacing: "-1.5px",
          }}
        >
          AI for Science &amp;{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Discovery
          </span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            maxWidth: "780px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}
        >
          Applying state-of-the-art AI to bioinformatics, time series analysis, and materials design.
        </div>

        {/* Pill tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Bioinformatics", "Time Series", "Materials Science"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                border: "1px solid rgba(99,102,241,0.4)",
                background: "rgba(99,102,241,0.1)",
                color: "#a5b4fc",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
