import { NoteCard } from "@/components/note";
import { prisma } from "@/lib/prisma";
import { requireAuthenticatedUser } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

async function getAllNotesFromUser(user: string) {
	return prisma.note.findMany({
		where: {
			userId: user,
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

export async function generateMetadata(): Promise<Metadata> {
	const { id } = await requireAuthenticatedUser();

	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			name: true,
		},
	});

	return {
		title: `${user?.name} | Overnote`,
		description: "Crie e compartilhe suas notas",
	};
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
