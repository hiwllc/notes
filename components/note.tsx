import type { notes } from "@/app/mock";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { HeartIcon, PenIcon, TrashIcon } from "lucide-react";

type Props = {
	note: (typeof notes)[number];
};

export function NoteCard({ note }: Props) {
	return (
		<Card className="mb-6 overflow-hidden">
			<CardHeader className="flex flex-row items-start justify-between">
				<div>
					<CardTitle>{note.title}</CardTitle>
					<CardDescription>
						{note.updatedAt.toLocaleDateString("pt-BR", {
							dateStyle: "short",
						})}
					</CardDescription>
				</div>

				<Link href="/users/wllc" className="flex items-center gap-2">
					<p>{note.owner.name}</p>
				</Link>
			</CardHeader>

			<CardContent>
				<p>{note.content}</p>
			</CardContent>

			<CardFooter className="justify-between">
				<Button size="sm" variant="ghost">
					<HeartIcon className="size-4" /> 18
				</Button>

				<div className="flex gap-2">
					<Button size="icon" className="size-8 p-0" variant="ghost" asChild>
						<Link href="/id/edit">
							<PenIcon className="size-4" />
							<span className="sr-only">Editar Nora</span>
						</Link>
					</Button>

					<Button size="icon" className="size-8 p-0" variant="ghost" asChild>
						<Link href="/id/edit">
							<TrashIcon className="size-4" />
							<span className="sr-only">Excluir Nora</span>
						</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
