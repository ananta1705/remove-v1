import { LupaSandiPage } from "@/components/features/auth/LupaSandiPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi - ReMove",
  description: "Halaman pemulihan kata sandi ReMove",
};

export default function LupaSandi() {
  return <LupaSandiPage />;
}
