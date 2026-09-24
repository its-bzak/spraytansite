import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Text-only brand card until the client supplies a logo/photo. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#f8d7e2",
          color: "#0a0a0a",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 28, fontSize: 40 }}>
          Studio and mobile spray tanning in Easton, MA
        </div>
      </div>
    ),
    size,
  );
}
