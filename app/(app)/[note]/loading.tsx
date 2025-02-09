import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default async function NotePage() {
	return (
		<section className="space-y-10">
			<div className="gap-6 pb-24 lg:pb-6">
				<Card className="mb-6 overflow-hidden">
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="w-full flex items-start justify-between">
							<section className="space-y-1">
								<CardTitle>
									<Skeleton className="w-40 h-4" />
								</CardTitle>
								<CardDescription>
									<Link href="#" className="hover:underline">
										<Skeleton className="w-20 h-2" />
									</Link>
								</CardDescription>
							</section>
						</div>

						<p className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
							<Skeleton className="w-40 h-3" />
						</p>
					</CardHeader>

					<CardContent className="space-y-1">
						<Skeleton className="w-full h-3" />
						<Skeleton className="w-64 h-3" />
						<Skeleton className="w-52 h-3" />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
