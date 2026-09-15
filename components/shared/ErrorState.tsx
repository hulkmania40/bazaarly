import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <AlertTriangle className="size-8 text-destructive" />
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {message && <p className="text-sm text-muted-foreground mt-1">{message}</p>}
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="size-3.5 mr-1.5" />
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
