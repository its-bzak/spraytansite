import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/services". */
  path: string;
};

/**
 * Per-page metadata. Page-level `openGraph` replaces the layout's object
 * (it is not deep-merged), so shared fields are repeated here.
 */
export function buildMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  // The file-based app/opengraph-image only attaches to the root segment, so
  // every other page references the same generated image explicitly.
  const images = [
    { url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name },
  ];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      title: fullTitle,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
