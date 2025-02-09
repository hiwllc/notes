import { SquareXIcon } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-3 flex items-center gap-3 h-20">
      <SquareXIcon className="size-6 stroke-foreground/80" />
      <p className="text-sm font-medium text-foreground/80">
        Parece que a página que você está buscando não existe.
      </p>
    </section>
  );
}
