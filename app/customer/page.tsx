import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/config";

export default async function CustomerPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "customer") {
    redirect("/login");
  }
  redirect("/customer/sellers");
}
