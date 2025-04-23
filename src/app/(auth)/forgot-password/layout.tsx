import type React from "react";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function resetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" size={24} />}>
      <main>{children}</main>
    </Suspense>
  );
}
