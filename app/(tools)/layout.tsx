import { Suspense } from "react";
import LoadingSpinner from "./loading";

export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </main>
  );
}
