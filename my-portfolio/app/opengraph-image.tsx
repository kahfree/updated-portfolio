import { ImageResponse } from "next/og";

export const dynamic = 'force-static';

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#064e3b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ color: "#f4f4f5", fontSize: 80, fontWeight: 600, lineHeight: 1.1 }}>
          Ethan Caffrey
        </div>
        <div style={{ color: "#6ee7b7", fontSize: 36, marginTop: 24 }}>
          Fullstack Engineer
        </div>
        <div style={{ color: "#71717a", fontSize: 24, marginTop: 16 }}>
          caffrey.dev
        </div>
      </div>
    ),
    size
  );
}
