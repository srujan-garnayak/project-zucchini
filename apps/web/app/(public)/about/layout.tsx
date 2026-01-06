import { generatePageMetadata } from "@/config/seo";

export const metadata = generatePageMetadata("about");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
