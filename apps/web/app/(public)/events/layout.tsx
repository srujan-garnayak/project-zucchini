import { generatePageMetadata } from "@/config/seo";

export const metadata = generatePageMetadata("events");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
