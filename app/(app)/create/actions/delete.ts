"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteNoteAction(_: unknown, formData: FormData) {
	const id = formData.get("id") as string;
	const sessions = await auth();

	if (!id) {
		throw new Error("Invalid note id");
	}

	if (!sessions?.user?.id) {
		throw new Error("Unauthorized");
	}

	await prisma.note.delete({
		where: {
			id,
			userId: sessions.user.id,
		},
	});

	redirect("/");
}
