import type { Metadata } from "next";
import { Inclusive_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shlok Jadhav - Portfolio",
  description: "A portfolio for Shlok Jadhav.",
};

const themeScript = `
  (() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      const theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

const inclusiveSans = Inclusive_Sans({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inclusive-sans",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inclusiveSans.variable} ${playfairDisplay.variable} h-full`} data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
