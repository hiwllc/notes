"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  CopyCheckIcon,
  CopyIcon,
  PenIcon,
  SendIcon,
  TrashIcon,
} from "lucide-react";
import type { Note } from "@prisma/client";
import { Badge } from "./ui/badge";
import type { User } from "next-auth";
import { deleteNoteAction } from "@/actions/delete-note";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
import {
  ConfirmDialog,
  ConfirmDialogClose,
  ConfirmDialogContent,
  ConfirmDialogDescription,
  ConfirmDialogFooter,
  ConfirmDialogHeader,
  ConfirmDialogTitle,
  ConfirmDialogTrigger,
} from "./confirm";
import { publishNoteAction } from "@/actions/publish-note";
import { createNoteLinkAction } from "@/actions/create-note-link";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useState, useEffect } from "react";

type Props = {
  note: Pick<
    Note,
    "id" | "title" | "content" | "createdAt" | "status" | "visibility"
  > & { user: Pick<User, "id" | "email" | "name"> };
  isOwner?: boolean;
};

export function NoteCard({ note, isOwner }: Props) {
  const { copied, copy } = useCopyToClipboard();
  const [copyDialog, setCopyDialog] = useState(false);
  const [, deleteAction] = useFormState(deleteNoteAction, undefined);
  const [, publishAction] = useFormState(publishNoteAction, undefined);
  const [state, createLinkAction] = useFormState(createNoteLinkAction, {
    data: {
      token: null,
    },
  });

  useEffect(() => {
    if (state.data.token) {
      setCopyDialog(true);
    }
  }, [state]);

  return (
    <>
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="w-full flex items-start justify-between">
            <section>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>
                <Link href={`/${note.id}`} className="hover:underline">
                  {note.createdAt.toLocaleDateString("pt-BR", {
                    dateStyle: "short",
                  })}
                </Link>
              </CardDescription>
            </section>
          </div>

          {note.user ? (
            <p className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
              {note.user.name ?? note.user.email?.split("@").at(0)}
            </p>
          ) : null}
        </CardHeader>

        <CardContent>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </CardContent>

        <CardFooter className="justify-between">
          {isOwner ? (
            <div className="flex justify-between items-center w-full">
              <div className="space-x-1">
                <Badge variant="outline">
                  {note.visibility === "PRIVATE" ? "Privada" : "Pública"}
                </Badge>
                <Badge variant="outline">
                  {note.status === "DRAFT" ? "Rascunho" : "Publicada"}
                </Badge>
              </div>

              <div className="flex gap-2">
                {note.status === "DRAFT" ? (
                  <form action={publishAction}>
                    <input name="id" value={note.id} hidden readOnly />

                    <SubmitButton size="sm" className="w-24">
                      Publicar
                    </SubmitButton>
                  </form>
                ) : null}

                <form action={createLinkAction}>
                  <input name="id" value={note.id} hidden readOnly />

                  <SubmitButton
                    size="icon"
                    className="size-8 p-0"
                    variant="ghost"
                  >
                    <SendIcon className="size-4" />
                    <span className="sr-only">Compartilhar esta nota</span>
                  </SubmitButton>
                </form>

                <Button
                  size="icon"
                  className="size-8 p-0"
                  variant="ghost"
                  asChild
                >
                  <Link href={`/${note.id}/edit`}>
                    <PenIcon className="size-4" />
                    <span className="sr-only">Editar Nota</span>
                  </Link>
                </Button>

                <ConfirmDialog>
                  <ConfirmDialogTrigger>
                    <Button size="icon" className="size-8 p-0" variant="ghost">
                      <TrashIcon className="size-4" />
                      <span className="sr-only">Excluir Nota</span>
                    </Button>
                  </ConfirmDialogTrigger>

                  <ConfirmDialogContent>
                    <ConfirmDialogHeader>
                      <ConfirmDialogTitle>Excluir nota</ConfirmDialogTitle>
                      <ConfirmDialogDescription>
                        Você está excluindo a nota {note.title} essa ação não
                        pode ser desfeita, tem certeza que deseja excluir?
                      </ConfirmDialogDescription>
                    </ConfirmDialogHeader>

                    <ConfirmDialogFooter>
                      <ConfirmDialogClose>
                        <Button variant="secondary" size="sm">
                          Não quero excluir
                        </Button>
                      </ConfirmDialogClose>

                      <form action={deleteAction}>
                        <input name="id" value={note.id} hidden readOnly />

                        <SubmitButton
                          variant="destructive"
                          size="sm"
                          className="w-full lg:w-28"
                        >
                          Excluir
                        </SubmitButton>
                      </form>
                    </ConfirmDialogFooter>
                  </ConfirmDialogContent>
                </ConfirmDialog>
              </div>
            </div>
          ) : null}
        </CardFooter>
      </Card>

      <ConfirmDialog open={copyDialog} onOpenChange={setCopyDialog}>
        <ConfirmDialogContent>
          <ConfirmDialogHeader>
            <ConfirmDialogTitle>Link de compartilhamento.</ConfirmDialogTitle>
          </ConfirmDialogHeader>

          <ConfirmDialogDescription>
            O seu link de compartilhamento foi gerado com sucesso, sua nota pode
            ser acessada no seguinte link:
            <code className="inline-flex bg-muted-foreground/5 p-1 rounded-md my-2">
              http://localhost:3000/shared/{state.data.token}
            </code>
          </ConfirmDialogDescription>

          <ConfirmDialogFooter>
            <Button
              size="sm"
              onClick={() => copy(state.data.token as string)}
              disabled={Boolean(copied)}
            >
              {copied ? (
                <>
                  <CopyCheckIcon className="size-4" /> Link Copiado!
                </>
              ) : (
                <>
                  <CopyIcon className="size-4" /> Copiar Link
                </>
              )}
            </Button>
          </ConfirmDialogFooter>
        </ConfirmDialogContent>
      </ConfirmDialog>
    </>
  );
}
