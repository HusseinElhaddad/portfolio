export const site = {
  name: "Hussein Elhaddad",
  fullName: "Hussein Mohamed Elhaddad",
  headline: "AI Engineer — Applied ML, RAG & Data Systems",
  email: "hussein.elhaddad@outlook.com",
  github: "https://github.com/HusseinElhaddad",
  linkedin: "https://www.linkedin.com/in/husseinelhaddad/",
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://husseinelhaddad.dev",
  // Set only after Cloudflare has assigned and verified the actual hostname.
  freeOrigin: process.env.NEXT_PUBLIC_FREE_ORIGIN || null,
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
  return {
    title,
    description,
    alternates: { canonical: `${site.origin}${path}` },
    openGraph: {
      title,
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
      title,
      description,
      images: [`${site.origin}/social/${image}.png`],
    },
  };
}
