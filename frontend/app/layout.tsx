import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Loudmouth",
  description: "Write your hottest take. Let AI be the judge. GenLayer Playverse 2026.",
  openGraph: {
    title: "Loudmouth",
    description: "Multiplayer hot-take battle. AI judges. Instant results.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
