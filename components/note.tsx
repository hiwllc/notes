"use client";

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
import { PenIcon, TrashIcon } from "lucide-react";
import type { Note } from "@prisma/client";
import { Badge } from "./ui/badge";
import type { User } from "next-auth";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { useActionState } from "react";
import { deleteNoteAction } from "@/app/(app)/create/actions/delete";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
import {
	ConfirmDialog,
	ConfirmDialogClose,
	ConfirmDialogContent,
	ConfirmDialogDescription,
	ConfirmDialogFooter,
	ConfirmDialogHeader,
	ConfirmDialogTitle,
	ConfirmDialogTrigger,
} from "./confirm";

type Props = {
	note: Note & { user: Pick<User, "email" | "name"> };
	isOwner?: boolean;
};

export function NoteCard({ note, isOwner }: Props) {
  const [_, action] = useFormState(deleteNoteAction, undefined);

	return (
		<Card className="mb-6 overflow-hidden">
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="w-full flex items-start justify-between">
					<section>
						<CardTitle>{note.title}</CardTitle>
						<CardDescription>
							<Link href={`/${note.id}`} className="hover:underline">
								{(note.updatedAt || note.createdAt).toLocaleDateString(
									"pt-BR",
									{
										dateStyle: "short",
									},
								)}
							</Link>
						</CardDescription>
					</section>
				</div>

				{note.user ? (
					<p className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
						{note.user.name ?? note.user.email?.split("@").at(0)}
					</p>
				) : null}
			</CardHeader>

			<CardContent>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<div dangerouslySetInnerHTML={{ __html: note.content }} />
			</CardContent>

			<CardFooter className="justify-between">
				{isOwner ? (
					<div className="flex justify-between items-center w-full">
						<div className="space-x-1">
							<Badge variant="outline">
								{note.visibility === "PRIVATE" ? "Privada" : "Pública"}
							</Badge>
							<Badge variant="outline">
								{note.status === "DRAFT" ? "Rascunho" : "Publicada"}
							</Badge>
						</div>

						<div className="flex gap-2">
							<Button
								size="icon"
								className="size-8 p-0"
								variant="ghost"
								asChild
							>
								<Link href={`/${note.id}/edit`}>
									<PenIcon className="size-4" />
									<span className="sr-only">Editar Nota</span>
								</Link>
							</Button>

							<ConfirmDialog>
								<ConfirmDialogTrigger>
									<Button size="icon" className="size-8 p-0" variant="ghost">
										<TrashIcon className="size-4" />
										<span className="sr-only">Excluir Nota</span>
									</Button>
								</ConfirmDialogTrigger>

								<ConfirmDialogContent>
									<ConfirmDialogHeader>
										<ConfirmDialogTitle>Excluir nota</ConfirmDialogTitle>
										<ConfirmDialogDescription>
											Você está excluindo a nota {note.title} essa ação não pode
											ser desfeita, tem certeza que deseja excluir?
										</ConfirmDialogDescription>
									</ConfirmDialogHeader>

									<ConfirmDialogFooter>
										<ConfirmDialogClose>
											<Button variant="secondary" size="sm">
												Não quero excluir
											</Button>
										</ConfirmDialogClose>

										<form action={action}>
											<input name="id" value={note.id} hidden readOnly />

											<SubmitButton
												variant="destructive"
												size="sm"
												className="w-full lg:w-28"
											>
												Excluir
											</SubmitButton>
										</form>
									</ConfirmDialogFooter>
								</ConfirmDialogContent>
							</ConfirmDialog>
						</div>
					</div>
				) : null}
			</CardFooter>
		</Card>
	);
}
