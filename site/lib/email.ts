import "server-only";
import { siteConfig } from "@/config/site";
import { videoContent } from "@/content/video";
import type { VideoConfig } from "./env";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/** Sends the buyer their personal access link via the Resend REST API. */
export async function sendAccessEmail(
  config: VideoConfig,
  to: string,
  accessUrl: string,
) {
  const title = videoContent.title ?? "your video";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.emailFrom,
      to,
      subject: `Your access link: ${title}`,
      text: [
        `Thanks for your purchase from ${siteConfig.name}.`,
        "",
        `Watch ${title} any time with your personal link:`,
        accessUrl,
        "",
        "Keep this email. The link works on any device. Please don't share it.",
      ].join("\n"),
      html: `<p>Thanks for your purchase from ${escapeHtml(siteConfig.name)}.</p>
<p><a href="${escapeHtml(accessUrl)}">Watch ${escapeHtml(title)}</a></p>
<p>Keep this email. The link works on any device. Please don't share it.</p>`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed: ${response.status} ${await response.text()}`);
  }
}
