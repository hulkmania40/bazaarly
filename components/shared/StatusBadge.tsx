import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    status: {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      approved: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
      paid: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      accepted: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
      out_for_delivery: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

type StatusBadgeProps = {
  status: string;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variantStatus = status as StatusBadgeProps["status"] & VariantProps<typeof statusVariants>["status"];
  return (
    <span className={cn(statusVariants({ status: variantStatus }), className)}>
      {status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
    </span>
  );
}
