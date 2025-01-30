"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const noteSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Sua nota precisa de um nome"),
  content: z.string(),
  visibility: z.boolean(),
  status: z.enum(["PUBLISHED", "DRAFT"]),
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

  const note = await prisma.note.upsert({
    create: {
      content: data.content,
      title: data.title,
      visibility: data.visibility ? "PUBLIC" : "PRIVATE",
      userId: sessions.user.id,
      status: data.status,
    },
    update: {
      title: data.title,
      content: data.content,
      visibility: data.visibility ? "PUBLIC" : "PRIVATE",
      status: data.status,
      updatedAt: new Date(),
    },
    where: {
      id: data.id,
      userId: sessions.user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      visibility: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  if (data.status === "PUBLISHED") {
    return redirect(`/${note.id}`);
  }

  return { data: note };
}
