import { generatePageMetadata } from "@/config/seo";

export const metadata = generatePageMetadata("home");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
