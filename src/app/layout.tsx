import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import "@/styles/globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "Hussein Elhaddad — AI Engineer",
    template: "%s | Hussein Elhaddad",
  },
  description:
    "Applied ML, RAG, and reliable data systems. Explore Hussein Elhaddad’s engineering work, contributions, and decisions.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};
const themeInit = `(function(){var t='system';try{var s=localStorage.getItem('portfolio-theme');if(s==='light'||s==='dark')t=s;}catch(e){}document.documentElement.dataset.theme=t;document.documentElement.dataset.js='true';})();`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="system">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/space-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
