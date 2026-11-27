"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { links } from "@/config/links";
import { useModeStore } from "@/state/mode-store";

function getLinkElements() {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>("#links a"));
}

export function KeyHandler() {
  const router = useRouter();

  useEffect(() => {
    function openLink(href: string) {
      if (href.startsWith("/")) router.push(href);
      else if (href.startsWith("mailto:")) window.location.href = href;
      else window.open(href, "_blank", "noopener,noreferrer");
    }

    function exitInsert() {
      const store = useModeStore.getState();
      store.setMode("NORMAL");
      if (store.focusedIndex !== undefined) getLinkElements()[store.focusedIndex]?.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const store = useModeStore.getState();
      const key = event.key.toLowerCase();
      const isLetter = /^[a-z]$/.test(key);

      if (store.mode === "NORMAL") {
        if (event.key === "Escape") {
          (document.activeElement as HTMLElement | null)?.blur();
          store.setFocusedIndex(undefined);
          return;
        }

        if (key === "j" || key === "k") {
          event.preventDefault();
          const items = getLinkElements();
          if (items.length === 0) return;

          const current = store.focusedIndex;
          const next =
            current === undefined
              ? 0
              : Math.min(Math.max(current + (key === "j" ? 1 : -1), 0), items.length - 1);

          items[next]?.focus();
          store.setFocusedIndex(next);
          return;
        }

        if (isLetter && links.some((link) => link.shortcut.startsWith(key))) {
          event.preventDefault();
          (document.activeElement as HTMLElement | null)?.blur();
          store.setMode("INSERT");
          store.resetShortcutSequence();
          typeChar(key);
        }
        return;
      }

      event.preventDefault();

      if (event.key === "Escape") {
        exitInsert();
        return;
      }

      if (event.key === "Backspace") {
        store.removeLastShortcutChar();
        if (useModeStore.getState().currentSequence === "") exitInsert();
        return;
      }

      if (isLetter) typeChar(key);
    }

    function typeChar(key: string) {
      const store = useModeStore.getState();
      const sequence = store.currentSequence + key;
      if (!links.some((link) => link.shortcut.startsWith(sequence))) return;

      store.updateShortcutSequence(key);

      const match = links.find((link) => link.shortcut === sequence);
      if (match) {
        exitInsert();
        openLink(match.href);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
