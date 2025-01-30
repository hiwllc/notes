import { requireAuthenticatedUser } from "@/lib/utils";
import { CreateNoteForm } from "./components/create-note-form";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Nova nota | Overnote",
};

async function getLatestDraft(user: string) {
  return await prisma.note.findFirst({
    where: {
      userId: user,
      status: "DRAFT",
    },
    orderBy: {
      updatedAt: "desc",
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
}

export default async function CreateNotePage() {
  const { id } = await requireAuthenticatedUser();
  const latest = await getLatestDraft(id as string);

  return (
    <section className="space-y-10">
      <h2 className="text-xl font-black text-foreground/80">Nova Nota</h2>
      <CreateNoteForm draft={latest} />
    </section>
  );
}
