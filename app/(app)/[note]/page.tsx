import { NoteCard } from "@/components/note";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
	params: {
		note: string;
	};
};

async function getNote(id: string, user?: string) {
	return await prisma.note.findFirst({
		where: {
			id,
			OR: [{ visibility: "PUBLIC", status: "PUBLISHED" }, { userId: user }],
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
			<div className="columns-[280px] gap-6 md:columns-xs lg:columns-md pb-24 lg:pb-6">
				<NoteCard note={note} isOwner={session?.user?.id === note.userId} />
			</div>
		</section>
	);
}
