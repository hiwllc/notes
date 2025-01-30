import { useCallback, useState } from "react";

type CopiedValue = string | null;

type Copy = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): { copied: CopiedValue; copy: Copy } {
  const [copied, setCopied] = useState<CopiedValue>(null);

  const copy: Copy = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopied(null);
      return false;
    }
  }, []);

  return { copy, copied };
}
