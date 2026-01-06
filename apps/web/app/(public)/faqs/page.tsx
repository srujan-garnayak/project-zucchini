import FAQ from "@/components/faqs";
import { generatePageMetadata } from "@/config/seo";

export const metadata = generatePageMetadata("faqs");
export default function page() {
  return (
    <main className="reg-bg-image py-20">
      <FAQ />
    </main>
  );
}
