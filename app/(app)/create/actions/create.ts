"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const noteSchema = z.object({
	title: z.string().min(1, "Sua nota precisa de um nome"),
	content: z.string(),
	visibility: z.boolean(),
});

export async function createNoteAction(payload: z.infer<typeof noteSchema>) {
	const parse = noteSchema.safeParse(payload);
	const sessions = await auth();

	if (!sessions?.user?.id) {
		throw new Error("Unauthorized");
	}

	if (parse.error) {
		throw new Error("Invalid Payload");
	}

	const { data } = parse;

	const { id } = await prisma.note.create({
		data: {
			content: data.content,
			title: data.title,
			visibility: data.visibility ? "PUBLIC" : "PRIVATE",
			userId: sessions.user.id,
			status: "PUBLISHED",
		},
	});

	redirect(`/${id}`);
}
