"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const noteSchema = z.object({
	id: z.string(),
	title: z.string().min(1, "Sua nota precisa de um nome"),
	content: z.string(),
	visibility: z.boolean(),
});

export async function updateNoteAction(payload: z.infer<typeof noteSchema>) {
	const parse = noteSchema.safeParse(payload);
	const sessions = await auth();

	if (!sessions?.user?.id) {
		throw new Error("Unauthorized");
	}

	if (parse.error) {
		throw new Error("Invalid Payload");
	}

	const { data } = parse;

	const { id } = await prisma.note.update({
		data: {
			content: data.content,
			visibility: data.visibility ? "PUBLIC" : "PRIVATE",
			title: data.title,
			status: "PUBLISHED",
			updatedAt: new Date(),
		},
		where: {
			id: data.id,
			userId: sessions.user.id,
		},
	});

	redirect(`/${id}`);
}
