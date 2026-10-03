import type { Metadata } from "next";
import { connection } from "next/server";
import { videoContent } from "@/content/video";
import { getVideoConfig } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { signedStreamEmbedUrl } from "@/lib/stream";
import { getVideoPrice } from "@/lib/stripe";
import { hasVideoAccess } from "@/lib/video-access";
import { KitComingSoon } from "@/components/sections/KitComingSoon";
import { PageHero } from "@/components/sections/PageHero";
import { VideoPaywall } from "@/components/sections/VideoPaywall";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { Section } from "@/components/ui/Section";

const { title, description } = videoContent;

export const metadata: Metadata = buildMetadata({
  title: "At-Home Spray Tan Kit",
  description,
  path: "/video",
});

function noticeFrom(params: { sent?: string | string[]; error?: string | string[] }) {
  if (params.error) return "error" as const;
  if (params.sent === "1") return "sent" as const;
  if (params.sent === "invalid") return "invalid" as const;
  return null;
}

/** The at-home kit and its video tutorial: coming soon until checkout is set up. */
export default async function VideoPage({ searchParams }: PageProps<"/video">) {
  // Env vars are read at request time: never prerender this page, or a build
  // made without keys would be stuck showing the coming-soon state.
  await connection();
  const config = getVideoConfig();
  const unlocked = config ? await hasVideoAccess(config) : false;

  let content;
  if (!config) {
    content = <KitComingSoon />;
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
        eyebrow={unlocked ? "Your video" : config ? "At-home kit" : "Coming soon"}
        title={title}
        lead={description}
      />
      <Section>{content}</Section>
    </>
  );
}
