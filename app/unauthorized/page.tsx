import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <ShieldX className="size-10 text-destructive mx-auto mb-2" />
          <CardTitle>Unauthorized</CardTitle>
          <CardDescription>You don&apos;t have permission to view this page.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
