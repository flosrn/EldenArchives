import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeleteProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-10 w-24" />
      </CardContent>
    </Card>
  );
}
