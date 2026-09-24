import type { Metadata } from "next";
import { connection } from "next/server";
import { videoContent } from "@/content/video";
import { getVideoConfig } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { signedStreamEmbedUrl } from "@/lib/stream";
import { getVideoPrice } from "@/lib/stripe";
import { hasVideoAccess } from "@/lib/video-access";
import { PageHero } from "@/components/sections/PageHero";
import { VideoPaywall } from "@/components/sections/VideoPaywall";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";

const title = videoContent.title ?? "Video";

export const metadata: Metadata = buildMetadata({
  title,
  description:
    videoContent.description ??
    "Buy lifetime access to Jenna's video from Spray Tan By Jenna, then watch any time on any device.",
  path: "/video",
});

function noticeFrom(params: { sent?: string | string[]; error?: string | string[] }) {
  if (params.error) return "error" as const;
  if (params.sent === "1") return "sent" as const;
  if (params.sent === "invalid") return "invalid" as const;
  return null;
}

export default async function VideoPage({ searchParams }: PageProps<"/video">) {
  // Env vars are read at request time: never prerender this page, or a build
  // made without keys would be stuck showing the "not set up" state.
  await connection();
  const config = getVideoConfig();
  const unlocked = config ? await hasVideoAccess(config) : false;

  let content;
  if (!config) {
    content = (
      <Placeholder>
        <p>
          The paid video isn&apos;t set up yet. It needs Stripe, Cloudflare
          Stream and Resend accounts plus the video itself. See
          CONTENT-CHECKLIST.md.
        </p>
      </Placeholder>
    );
  } else if (unlocked) {
    content = (
      <VideoPlayer src={signedStreamEmbedUrl(config)} title={title} />
    );
  } else {
    const price = await getVideoPrice(config).catch(() => null);
    content = (
      <VideoPaywall price={price} notice={noticeFrom(await searchParams)} />
    );
  }

  return (
    <>
      <PageHero
        eyebrow={unlocked ? "Your video" : "Video"}
        title={title}
        lead={
          videoContent.description ?? (
            <Placeholder inline>video description</Placeholder>
          )
        }
      />
      <Section>{content}</Section>
    </>
  );
}
