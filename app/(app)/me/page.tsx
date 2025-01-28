import { notes } from "@/app/mock";
import { NoteCard } from "@/components/note";

export default function ProfilePage() {
	return (
		<section className="space-y-10">
			<h2 className="text-xl font-black text-foreground/80">Suas Notas</h2>

			<div className="columns-[280px] gap-6 md:columns-xs lg:columns-md pb-6">
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} />
				))}
			</div>
		</section>
	);
}
