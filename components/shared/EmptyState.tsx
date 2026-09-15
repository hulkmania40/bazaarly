import { PackageX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <PackageX className="size-10 text-muted-foreground/50" />
        <div>
          <p className="font-medium text-lg">{title}</p>
          {description && <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>}
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
