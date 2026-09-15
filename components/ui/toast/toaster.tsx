"use client";

import { useToast } from "@/components/ui/toast/use-toast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-md px-4 py-2 text-sm shadow-lg border ${
            t.variant === "destructive"
              ? "bg-destructive text-white border-destructive"
              : "bg-background border-border"
          }`}
        >
          {t.title && <p className="font-medium">{t.title}</p>}
          {t.description && <p className="text-xs opacity-80">{t.description}</p>}
        </div>
      ))}
    </div>
  );
}
