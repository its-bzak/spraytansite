import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Temporary monogram favicon until the client supplies a logo. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#0a0a0a",
          color: "#f8d7e2",
          fontSize: 44,
          fontWeight: 700,
        }}
      >
        J
      </div>
    ),
    size,
  );
}
