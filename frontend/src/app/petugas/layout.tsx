import { PetugasLayout } from "@/components/layout/PetugasLayout";

export default function PetugasRootLayout({ children }: { children: React.ReactNode }) {
  return <PetugasLayout>{children}</PetugasLayout>;
}
