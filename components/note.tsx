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
import type { Note } from "@prisma/client";

type Props = {
	note: Note;
	isOwner?: boolean;
};

export function NoteCard({ note, isOwner }: Props) {
	return (
		<Card className="mb-6 overflow-hidden">
			<CardHeader className="flex flex-row items-start justify-between">
				<div>
					<CardTitle>{note.title}</CardTitle>
					<CardDescription>
						{(note.updatedAt || note.createdAt).toLocaleDateString("pt-BR", {
							dateStyle: "short",
						})}
					</CardDescription>
				</div>

				{/* <Link href="/users/wllc" className="flex items-center gap-2">
						<p>{note.owner.name}</p>
					</Link> */}
			</CardHeader>

			<CardContent>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<div dangerouslySetInnerHTML={{ __html: note.content }} />
			</CardContent>

			<CardFooter className="justify-between">
				{/* @todo implement likes */}
				{/* <Button size="sm" variant="ghost">
					<HeartIcon className="size-4" /> 18
				</Button> */}

				{isOwner ? (
					<div className="flex gap-2">
						<Button size="icon" className="size-8 p-0" variant="ghost" asChild>
							<Link href="/id/edit">
								<PenIcon className="size-4" />
								<span className="sr-only">Editar Nota</span>
							</Link>
						</Button>

						<Button size="icon" className="size-8 p-0" variant="ghost" asChild>
							<Link href="/id/edit">
								<TrashIcon className="size-4" />
								<span className="sr-only">Excluir Nota</span>
							</Link>
						</Button>
					</div>
				) : null}
			</CardFooter>
		</Card>
	);
}
