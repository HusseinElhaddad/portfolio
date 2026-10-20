import origins from "./origins.json";
export const site = {
  name: "Hussein Elhaddad",
  fullName: "Hussein Mohamed Elhaddad",
  headline: "AI Engineer — Applied ML, RAG & Data Systems",
  email: "hussein.elhaddad@outlook.com",
  github: "https://github.com/HusseinElhaddad",
  linkedin: "https://www.linkedin.com/in/husseinelhaddad/",
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN || origins.canonicalOrigin,
  // Assigned to the Git-connected Cloudflare Pages project.
  freeOrigin: process.env.NEXT_PUBLIC_FREE_ORIGIN || origins.freeOrigin,
  cv: "/Hussein_Elhaddad_AI_Engineer_CV.pdf",
} as const;
export const routes = [
  "/",
  "/work/",
  "/work/olist/",
  "/work/fpl-intel/",
  "/work/sawakli-ai/",
  "/about/",
  "/contact/",
] as const;
export function pageMeta(
  title: string,
  description: string,
  path: string,
  image = "home",
) {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: `${site.origin}${path}` },
    openGraph: {
      title: fullTitle,
      description,
      url: `${site.origin}${path}`,
      type: "website" as const,
      siteName: site.name,
      images: [
        {
          url: `${site.origin}/social/${image}.png`,
          width: 1200,
          height: 630,
          alt: `${title} — Hussein Elhaddad`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
      images: [`${site.origin}/social/${image}.png`],
    },
  };
}
