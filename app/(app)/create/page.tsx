import { requireAuthenticatedUser } from "@/lib/utils";
import { CreateNoteForm } from "./components/create-note-form";

export default async function CreateNotePage() {
	await requireAuthenticatedUser();

	return (
		<section className="space-y-10">
			<h2 className="text-xl font-black text-foreground/80">Nova Nota</h2>
			<CreateNoteForm />
		</section>
	);
}
