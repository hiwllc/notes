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
  EllipsisIcon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  note: Pick<
    Note,
    "id" | "title" | "content" | "createdAt" | "status" | "visibility"
  > & { user: Pick<User, "id" | "email" | "name"> };
  isOwner?: boolean;
};

const APP_DOMAIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://notes.iamwallace.dev/";

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

                <ConfirmDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" className="h-8 p-0" variant="outline">
                        <EllipsisIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <form action={createLinkAction}>
                        <input name="id" value={note.id} hidden readOnly />
                        <DropdownMenuItem className="p-0">
                          <SubmitButton
                            variant="ghost"
                            className="hover:ring-0 px-2 h-8"
                          >
                            <SendIcon className="size-4" />
                            Compartilhar
                          </SubmitButton>
                        </DropdownMenuItem>
                      </form>

                      <DropdownMenuItem asChild>
                        <Link
                          href={`/${note.id}/edit`}
                          className="text-xs cursor-pointer"
                        >
                          <PenIcon className="size-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <ConfirmDialogTrigger>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full h-8 px-2 justify-start"
                          >
                            <TrashIcon className="size-4" />
                            Excluir
                          </Button>
                        </ConfirmDialogTrigger>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
              {APP_DOMAIN}/shared/{state.data.token}
            </code>
          </ConfirmDialogDescription>

          <ConfirmDialogFooter>
            <Button
              size="sm"
              onClick={() =>
                copy(`${APP_DOMAIN}/shared/${state.data.token as string}`)
              }
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
