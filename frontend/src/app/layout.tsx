import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "ReMove – Sistem Pengelolaan Sampah Terintegrasi",
  description:
    "ReMove adalah platform pengelolaan sampah terintegrasi untuk Admin DLH, Petugas Kebersihan, dan Warga/KSM.",
  keywords: ["sampah", "pengelolaan sampah", "TPS", "retribusi", "ReMove"],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
