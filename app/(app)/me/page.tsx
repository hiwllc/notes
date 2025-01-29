import { NoteCard } from "@/components/note";
import { prisma } from "@/lib/prisma";
import { requireAuthenticatedUser } from "@/lib/utils";
import Link from "next/link";

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

			{notes.length <= 0 ? (
				<div className="gap-6 pb-24 lg:pb-6">
					<h3 className="text-md font-medium text-foreground/80">
						Você ainda não criou nenhuma nota...
					</h3>
					<p className="text-sm text-muted-foreground">
						Ainda não temos nenhuma nota cadastrada, que tal{" "}
						<Link href="/create" className="text-blue-700 underline">
							criar sua primeira nota?
						</Link>
					</p>
				</div>
			) : null}

			<div className="columns-[280px] gap-6 md:columns-xs lg:columns-md pb-6">
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} isOwner />
				))}
			</div>
		</section>
	);
}
