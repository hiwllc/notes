"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Button } from "./ui/button";
import { forwardRef, useImperativeHandle } from "react";

type Props = {
  onChange?: (value: string) => void;
  value?: string;
};

export type EditorRef = {
  update: (value: string) => void;
};

export const Editor = forwardRef<EditorRef, Props>(
  ({ onChange, value = "" }, ref) => {
    const editor = useEditor({
      extensions: [StarterKit, Underline],
      content: value,
      onUpdate({ editor }) {
        if (onChange) {
          onChange(editor.getHTML());
        }
      },
      immediatelyRender: false,
    });

    useImperativeHandle(ref, () => ({
      update: (value: string) => {
        editor?.commands.setContent(value);
      },
    }));

    return (
      <div className="flex flex-col justify-start items-start min-h-32 rounded-md border border-input bg-transparent text-base shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [&_.tiptap]:p-3 [&_.tiptap]:outline-none [&_.tiptap]:min-h-32 [&>div]:w-full [&_.tiptap]:w-full">
        <div className="border-b p-1">
          <section className="flex gap-1">
            <Button
              type="button"
              className="size-8"
              size="icon"
              variant={editor?.isActive("bold") ? "default" : "ghost"}
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <BoldIcon />
            </Button>

            <Button
              type="button"
              className="size-8"
              size="icon"
              variant={editor?.isActive("italic") ? "default" : "ghost"}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              <ItalicIcon />
            </Button>

            <Button
              type="button"
              className="size-8"
              size="icon"
              variant={editor?.isActive("underline") ? "default" : "ghost"}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon />
            </Button>
          </section>
        </div>

        <EditorContent editor={editor} />
      </div>
    );
  },
);

Editor.displayName = "Editor";
