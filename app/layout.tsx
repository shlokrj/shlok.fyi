import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shlok Jadhav - Portfolio",
  description: "A portfolio for Shlok Jadhav.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (() => {
      try {
        const savedTheme = window.localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        document.documentElement.dataset.theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;
      } catch {
        document.documentElement.dataset.theme = "dark";
      }
    })();
  `;

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
