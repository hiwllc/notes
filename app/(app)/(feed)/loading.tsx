import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMe() {
  return (
    <section className="space-y-10">
      <h2 className="text-xl font-black text-foreground/80">Últimas Notas</h2>

      <div className="columns-[280px] gap-6 md:columns-xs lg:columns-md pb-24 lg:pb-6">
        {[1, 2, 3, 4].map((note) => (
          <Card key={note} className="mb-6 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="w-full flex items-start justify-between">
                <section className="space-y-1">
                  <CardTitle>
                    <Skeleton className="w-40 h-4" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="w-20 h-2" />
                  </CardDescription>
                </section>
              </div>

              <Skeleton className="w-40 h-3" />
            </CardHeader>

            <CardContent className="space-y-1">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-64 h-3" />
              <Skeleton className="w-52 h-3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
