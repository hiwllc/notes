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
import { createNoteAction } from "@/actions/create-note";
import { StatusButton } from "@/components/status-button";

/** @todo make the schema unique to avoid duplication in actions */
const noteSchema = z.object({
	title: z.string().min(1, "Sua nota precisa de um nome"),
	content: z.string(),
	visibility: z.boolean(),
});

export function CreateNoteForm() {
	const form = useForm<z.infer<typeof noteSchema>>({
		defaultValues: {
			title: "",
			content: "",
			visibility: true,
		},
		resolver: zodResolver(noteSchema),
	});

  const submit = (data: z.infer<typeof noteSchema>) => {
			createNoteAction(data);
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

				<StatusButton className="w-full">Criar Nota</StatusButton>
			</form>
		</Form>
	);
}
