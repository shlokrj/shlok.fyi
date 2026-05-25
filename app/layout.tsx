import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-theme="light" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
