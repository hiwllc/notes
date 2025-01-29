"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";

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
	});

	return (
		<Form {...form}>
			<form className="space-y-4">
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

				<Button type="submit" size="sm" className="w-full">
					Criar Nota
				</Button>
			</form>
		</Form>
	);
}
