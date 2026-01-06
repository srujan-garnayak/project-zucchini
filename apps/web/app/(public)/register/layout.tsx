import { generatePageMetadata } from "@/config/seo";

export const metadata = generatePageMetadata("register");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
