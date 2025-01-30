import { prisma } from "@/lib/prisma";
import { requireAuthenticatedUser } from "@/lib/utils";
import { notFound } from "next/navigation";
import { EditNoteForm } from "./components/edit-form";
import type { Metadata } from "next";

type Props = {
	params: {
		note: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await requireAuthenticatedUser();

	const note = await prisma.note.findUnique({
		where: { id: params.note, userId: id },
		select: {
			title: true,
		},
	});

	return {
		title: `Editando ${note?.title} | Overnote`,
	};
}

async function getNote(id: string, user: string) {
	return await prisma.note.findFirst({
		where: {
			id,
			userId: user,
		},
		select: {
			id: true,
			title: true,
			content: true,
			visibility: true,
		},
	});
}

export default async function EditNotePage({ params }: Props) {
	const { id } = await requireAuthenticatedUser();
	const note = await getNote(params.note, id as string);

	if (!note) {
		return notFound();
	}

	return (
		<section className="space-y-10">
			<h2 className="text-xl font-black text-foreground/80">
				Editando nota: {note.title}
			</h2>
			<EditNoteForm note={note} />
		</section>
	);
}
