"use client";

import { Editor } from "@/components/editor";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Note } from "@prisma/client";
import { updateNoteAction } from "@/actions/update-note";
import { StatusButton } from "@/components/status-button";

/** @todo make the schema unique to avoid duplication in actions */
const noteSchema = z.object({
	id: z.string(),
	title: z.string().min(1, "Sua nota precisa de um nome"),
	content: z.string(),
	visibility: z.boolean(),
});

type Props = {
	note: Pick<Note, "id" | "title" | "content" | "visibility">;
};

export function EditNoteForm({ note }: Props) {
	const form = useForm<z.infer<typeof noteSchema>>({
		defaultValues: {
			id: note.id,
			title: note.title,
			content: note.content,
			visibility: note.visibility === "PUBLIC",
		},
		resolver: zodResolver(noteSchema),
	});

	const submit = (data: z.infer<typeof noteSchema>) => {
		updateNoteAction(data);
	};

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="visibility"
					render={({ field }) => (
						<FormItem className="space-y-0 gap-2 flex items-center">
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>{field.value ? "Pública" : "Privada"}</FormLabel>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Conteúdo</FormLabel>
							<FormControl>
								<Editor onChange={field.onChange} value={field.value} />
							</FormControl>
						</FormItem>
					)}
				/>

				<StatusButton className="w-full">Salvar e Publicar</StatusButton>
			</form>
		</Form>
	);
}
