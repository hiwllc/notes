import { NoteCard } from "@/components/note";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    note: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await auth();
  const note = await prisma.note.findUnique({
    where: {
      id: params.note,
      OR: [
        { visibility: "PUBLIC", status: "PUBLISHED" },
        { userId: session?.user?.id },
      ],
    },
    select: {
      title: true,
    },
  });

  if (!note) {
    return {
      title: "Nota não encontrada | Overnote",
    };
  }

  return {
    title: `${note?.title} | Overnote`,
  };
}

async function getNote(id: string, user?: string) {
  return await prisma.note.findFirst({
    where: {
      id,
      OR: [{ visibility: "PUBLIC", status: "PUBLISHED" }, { userId: user }],
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      status: true,
      visibility: true,
      token: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export default async function NotePage({ params }: Props) {
  const session = await auth();
  const note = await getNote(params.note, session?.user?.id);

  if (!note) {
    return notFound();
  }

  return (
    <section className="space-y-10">
      <div className="gap-6 pb-24 lg:pb-6">
        <NoteCard note={note} isOwner={session?.user?.id === note.user.id} />
      </div>
    </section>
  );
}
