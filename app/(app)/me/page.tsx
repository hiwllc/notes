import { NoteCard } from "@/components/note";
import { prisma } from "@/lib/prisma";
import { requireAuthenticatedUser } from "@/lib/utils";

async function getAllNotesFromUser(user: string) {
	return prisma.note.findMany({
		where: {
			userId: user,
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

export default async function ProfilePage() {
	const { id } = await requireAuthenticatedUser();
	const notes = await getAllNotesFromUser(id as string);

	return (
		<section className="space-y-10">
			<h2 className="text-xl font-black text-foreground/80">Suas Notas</h2>

			<div className="columns-[280px] gap-6 md:columns-xs lg:columns-md pb-6">
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} isOwner />
				))}
			</div>
		</section>
	);
}
