import { Skeleton } from "@/components/ui/skeleton";

export default function LoaderForm() {
	return (
		<section className="space-y-10">
			<h2 className="text-xl font-black text-foreground/80 inline-flex gap-3 items-center">
				Editando nota: <Skeleton className="w-48 h-8" />
			</h2>
		</section>
	);
}
