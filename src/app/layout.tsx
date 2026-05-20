import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickGig ⚡ — Find work. Earn today.",
  description: "Hyperlocal part-time and daily wage job marketplace for Chennai. Find delivery, retail, events, kitchen, and more jobs near you. Apply in seconds and earn same day.",
  keywords: "jobs chennai, part time jobs, daily wage, quickgig, hyperlocal jobs, temp work chennai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#2563EB" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
