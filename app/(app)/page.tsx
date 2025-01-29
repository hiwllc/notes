import { NoteCard } from "@/components/note";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getAllNotes(user?: string) {
	return prisma.note.findMany({
		where: {
			OR: [{ visibility: "PUBLIC", status: "PUBLISHED" }, { userId: user }],
		},
		include: {
			user: {
				select: {
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

			<div className="columns-[280px] gap-6 md:columns-xs lg:columns-md pb-24 lg:pb-6">
				{notes.map((note) => (
					<NoteCard
						key={note.id}
						note={note}
						isOwner={session?.user?.id === note.userId}
					/>
				))}
			</div>
		</section>
	);
}
