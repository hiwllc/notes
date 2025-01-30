import { requireAuthenticatedUser } from "@/lib/utils";
import { CreateNoteForm } from "./components/create-note-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nova nota | Overnote",
};

export default async function CreateNotePage() {
	await requireAuthenticatedUser();

	return (
		<section className="space-y-10">
			<h2 className="text-xl font-black text-foreground/80">Nova Nota</h2>
			<CreateNoteForm />
		</section>
	);
}
