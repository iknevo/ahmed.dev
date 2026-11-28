"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { backShortcut, links } from "@/config/links";
import { useModeStore } from "@/state/mode-store";

const SCROLL_STEP_PX = 100;

type Shortcut = { shortcut: string; run: () => void };

function getLinkElements() {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-nav-item]"));
}

export function KeyHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    useModeStore.getState().setFocusedIndex(undefined);
  }, [pathname]);

  useEffect(() => {
    function openLink(href: string) {
      if (href.startsWith("/")) return router.push(href);
      if (href.startsWith("mailto:")) return void (window.location.href = href);

      // Firefox-based browsers (Zen) block window.open from keydown handlers.
      // Omit "noopener" so we can detect the block, then clear opener manually.
      const win = window.open(href, "_blank");
      if (win) win.opener = null;
      else window.location.href = href;
    }

    // A shortcut runs as soon as it's complete, so on sub-pages "gb" (back) wins over
    // "gbl" (blog); the blog shortcut still works from the home page.
    const shortcuts: Shortcut[] = [
      ...(pathname !== "/" ? [{ shortcut: backShortcut, run: () => router.push("/") }] : []),
      ...links.map(({ shortcut, href }) => ({ shortcut, run: () => openLink(href) })),
    ];

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
          const direction = key === "j" ? 1 : -1;
          const items = getLinkElements();

          // Pages without selectable items (skills, experience) scroll instead.
          if (items.length === 0) {
            document.getElementById("scroll-container")?.scrollBy({
              top: direction * SCROLL_STEP_PX,
              behavior: event.repeat ? "auto" : "smooth",
            });
            return;
          }

          const current = store.focusedIndex;
          const next =
            current === undefined
              ? 0
              : Math.min(Math.max(current + direction, 0), items.length - 1);

          const item = items[next];
          if (item) {
            item.focus({ preventScroll: true });
            // Keep the whole row in view, not just the focused control inside it.
            (item.closest("li") ?? item).scrollIntoView({ block: "nearest", behavior: "smooth" });
          }
          store.setFocusedIndex(next);
          return;
        }

        if (isLetter && shortcuts.some(({ shortcut }) => shortcut.startsWith(key))) {
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
      if (!shortcuts.some(({ shortcut }) => shortcut.startsWith(sequence))) return;

      store.updateShortcutSequence(key);

      const match = shortcuts.find(({ shortcut }) => shortcut === sequence);
      if (match) {
        exitInsert();
        match.run();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, pathname]);

  return null;
}
