import { NoteCard } from "@/components/note";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getAllNotes(user?: string) {
  return prisma.note.findMany({
    where: {
      OR: [{ visibility: "PUBLIC", status: "PUBLISHED" }, { userId: user }],
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      status: true,
      visibility: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function Home() {
  const session = await auth();
  const notes = await getAllNotes(session?.user?.id);

  return (
    <section className="space-y-10">
      <h2 className="text-xl font-black text-foreground/80">Últimas Notas</h2>

      {notes.length <= 0 ? (
        <div className="gap-6 pb-24 lg:pb-6">
          <h3 className="text-md font-medium text-foreground/80">
            Nenhuma nota por aqui ainda.
          </h3>

          <p className="text-sm text-muted-foreground">
            Ainda não temos nenhuma nota cadastrada, que tal{" "}
            <Link href="/create" className="text-blue-700 underline">
              criar sua primeira nota?
            </Link>
          </p>
        </div>
      ) : null}
      <div className="columns-[280px] gap-6 md:columns-xs lg:columns-md pb-24 lg:pb-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isOwner={session?.user?.id === note.user.id}
          />
        ))}
      </div>
    </section>
  );
}
