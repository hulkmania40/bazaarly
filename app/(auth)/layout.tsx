import { Providers } from "../providers";
import { Toaster } from "@/components/ui/toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        {children}
      </div>
      <Toaster />
    </Providers>
  );
}
