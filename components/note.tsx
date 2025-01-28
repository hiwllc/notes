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
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";

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
					<Avatar className="size-6">
						<AvatarImage src={note.owner.image.src} />
						<AvatarFallback>{note.owner.name.at(0)}</AvatarFallback>
					</Avatar>

					<p>{note.owner.name}</p>
				</Link>
			</CardHeader>

			<CardContent>
				<p>{note.content}</p>
			</CardContent>

			<CardFooter>
				<Button size="sm" variant="ghost">
					<HeartIcon className="size-4" /> 18
				</Button>
			</CardFooter>
		</Card>
	);
}
