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
import { useEffect, useRef, useState } from "react";
import { CheckIcon, LoaderIcon } from "lucide-react";
import { intlFormatDistance } from "date-fns";

const noteFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Sua nota precisa de um nome"),
  content: z.string(),
  visibility: z.boolean(),
});

export function CreateNoteForm() {
  const [saving, setSaving] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const form = useForm<z.infer<typeof noteFormSchema>>({
    defaultValues: {
      id: "",
      title: "",
      content: "",
      visibility: true,
    },
    resolver: zodResolver(noteFormSchema),
  });

  const latestSaved = useRef(form.getValues());

  const submit = (data: z.infer<typeof noteFormSchema>) => {
    createNoteAction({ ...data, status: "PUBLISHED" });
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const values = form.getValues();

      if (
        !values.title.length ||
        values.content === latestSaved.current.content
      ) {
        return;
      }

      setSaving(true);

      const debounce = new Promise((resolve) => setTimeout(resolve, 3000));
      const { data } = await createNoteAction({ ...values, status: "DRAFT" });

      // // Setamos o id aqui para o próximo auto save
      form.setValue("id", data.id);
      form.setValue("title", data.title);
      form.setValue("content", data.content);

      await debounce;
      setSaving(false);

      setUpdatedAt(data.updatedAt ?? data.createdAt);

      latestSaved.current = {
        ...data,
        visibility: data.visibility === "PUBLIC",
      };
    }, 5000);

    return () => clearInterval(interval);
  }, [form]);

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
              <div className="h-4  flex justify-between items-center">
                <FormLabel>Conteúdo</FormLabel>
                <div>
                  {saving ? (
                    <small className="inline-flex items-center gap-2 text-muted-foreground">
                      <LoaderIcon className="size-4 animate-spin" /> Salvando...
                    </small>
                  ) : null}

                  {!saving && updatedAt ? (
                    <small className="inline-flex items-center gap-2 text-muted-foreground">
                      <CheckIcon className="size-4" /> Salvo{" "}
                      {intlFormatDistance(updatedAt, new Date(), {
                        locale: "pt-BR",
                      })}
                    </small>
                  ) : null}
                </div>
              </div>
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
