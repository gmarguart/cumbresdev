import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["600", "700"], display: "swap" });

const title = "CumbresDev | Desarrollo de páginas web y software a medida en Chile";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CumbresDev: páginas web y software a medida" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#08132b",
  width: "device-width",
  initialScale: 1,
};

/** Datos estructurados: solo información verificable, sin dirección ni teléfono inventados. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/cumbresdev-logo.png`,
  description: siteConfig.description,
  areaServed: { "@type": "Country", name: "Chile" },
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  ...(siteConfig.social.linkedin ? { sameAs: [siteConfig.social.linkedin] } : {}),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de desarrollo",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo de páginas web profesionales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo de software a medida" } },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL" data-scroll-behavior="smooth" className={`${inter.variable} ${sora.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
