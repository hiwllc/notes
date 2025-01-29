"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function publishNoteAction(_: unknown, formData: FormData) {
	const id = formData.get("id") as string;
	const sessions = await auth();

	if (!sessions?.user?.id) {
		throw new Error("Unauthorized");
	}

	if (!id) {
		throw new Error("Invalid Payload");
	}

	await prisma.note.update({
		data: {
			status: "PUBLISHED",
			updatedAt: new Date(),
		},
		where: {
			id,
			userId: sessions.user.id,
		},
	});

	redirect(`/${id}`);
}
