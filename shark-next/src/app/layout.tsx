import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SharkAuth — Open-Source Identity Platform for AI Agents",
  description: "One ~29 MB Go binary. Zero dependencies. OAuth 2.1, OIDC, RFC 8693 Token Exchange, and DPoP for secure agent delegation. Self-host free forever.",
  keywords: ["identity platform", "AI agent auth", "OAuth 2.1", "OIDC", "RFC 8693", "DPoP", "self-hosted auth", "open source IAM", "agent delegation", "token exchange"],
  authors: [{ name: "SharkAuth" }],
  creator: "SharkAuth",
  metadataBase: new URL("https://sharkauth.com"),
  openGraph: {
    title: "SharkAuth — Open-Source Identity Platform for AI Agents",
    description: "One ~29 MB Go binary. Zero dependencies. OAuth 2.1, OIDC, RFC 8693 Token Exchange, and DPoP for secure agent delegation. Self-host free forever.",
    url: "https://sharkauth.com",
    siteName: "SharkAuth",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "SharkAuth — Auth for the Agent Era",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SharkAuth — Open-Source Identity Platform for AI Agents",
    description: "One ~29 MB Go binary. Zero dependencies. OAuth 2.1, OIDC, RFC 8693 Token Exchange, and DPoP for secure agent delegation. Self-host free forever.",
    images: ["/assets/og-image.png"],
    creator: "@raulgooo",
  },
  icons: {
    icon: "/assets/sharky-glyph.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "SharkAuth",
                  "url": "https://sharkauth.com",
                  "logo": "https://sharkauth.com/assets/sharky-glyph.png",
                  "sameAs": [
                    "https://github.com/shark-auth/shark",
                    "https://twitter.com/raulgooo",
                    "https://discord.gg/sharkauth"
                  ]
                },
                {
                  "@type": "WebSite",
                  "name": "SharkAuth",
                  "url": "https://sharkauth.com",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://sharkauth.com/docs?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "SharkAuth",
                  "description": "Open-source identity platform for AI agents. Single ~29 MB Go binary with OAuth 2.1, OIDC, RFC 8693 Token Exchange, and RFC 9449 DPoP.",
                  "applicationCategory": "SecurityApplication",
                  "operatingSystem": "Linux, macOS, Windows, ARM",
                  "softwareVersion": "0.1.0",
                  "programmingLanguage": "Go",
                  "license": "https://opensource.org/licenses/MIT",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is may_act_grants and how does delegation work?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "SharkAuth expresses delegation policy as structured data. Every grant is scoped to specific actions, resources, and time windows, and can be revoked or expired automatically when conditions change."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does DPoP protect against token theft?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Every access token is cryptographically bound to the agent's private key via RFC 9449 DPoP. A stolen token is useless without the key, making replay attacks impossible by design."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is act chain depth and why does it matter?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "SharkAuth preserves the complete delegation chain across every agent hop. When agent A delegates to B who calls API C, the full provenance is surfaced in token introspection, eliminating 'the agent did it' dead ends."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How fast is cascade revocation?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Revoke any grant and every downstream token invalidates automatically. The change is indexed by grant_id and propagated through introspection in under 12 ms p99."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can SharkAuth run offline or on edge devices?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. It ships as a single static Go binary with embedded SQLite WAL. Deploy it next to your app, in a container, on a corporate VM, or an air-gapped edge. Or drop it on a $5 VPS. Backup is a single file copy."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What audit capabilities does SharkAuth provide?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Structured JSON audit logs, indexed by grant_id, subject, actor, and grant. Stream directly to your SIEM via events websocket. Compliance-ready out of the box."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
