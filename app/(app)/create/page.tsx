import { CreateNoteForm } from "./components/create-note-form";

/**
 * Uma nota vai ter:
 *
 * 1. Titulo
 * 2. Conteúdo
 * 3. Privado ou Público
 * 4. Status
 *
 * 4. Salvar automático (as draft)
 */

// requires auth
export default function CreateNotePage() {
	return (
		<section className="space-y-10">
			<h2 className="text-xl font-black text-foreground/80">Nova Nota</h2>
			<CreateNoteForm />
		</section>
	);
}
