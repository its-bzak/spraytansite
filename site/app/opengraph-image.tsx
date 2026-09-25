import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: Jenna holding an airbrush spray tan gun`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PHOTO_WIDTH = 480;
// Hero photo is 2:3; at 480px wide it is 720px tall, so the 630px frame
// crops the bottom and keeps her face in view.
const photoData = await readFile(
  join(process.cwd(), "public/professional-airbrush-tanning-technician-jenna-crossley.jpeg"),
  "base64",
);
const photoSrc = `data:image/jpeg;base64,${photoData}`;

/** Brand card: name and tagline beside the hero photo. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f8d7e2",
          color: "#0a0a0a",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 72,
          }}
        >
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            {siteConfig.name}
          </div>
          <div style={{ marginTop: 28, fontSize: 36 }}>
            Studio and mobile spray tanning in Easton, MA
          </div>
        </div>
        <div style={{ width: PHOTO_WIDTH, height: "100%", display: "flex", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={photoSrc} alt="" width={PHOTO_WIDTH} height={720} />
        </div>
      </div>
    ),
    size,
  );
}
