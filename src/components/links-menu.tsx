"use client";

import type { CSSProperties } from "react";

import { links } from "@/config/links";
import { useModeStore } from "@/state/mode-store";

export function LinksMenu() {
  const currentSequence = useModeStore((state) => state.currentSequence);
  const setFocusedIndex = useModeStore((state) => state.setFocusedIndex);

  return (
    <ul id="links" className="flex w-full flex-col gap-2 text-base lg:text-[22px]">
      {links.map(({ label, href, shortcut, icon: Icon, color }, index) => {
        const isExternal = !href.startsWith("/") && !href.startsWith("mailto:");
        const isMatching = currentSequence !== "" && shortcut.startsWith(currentSequence);

        return (
          <li key={shortcut}>
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onFocus={() => setFocusedIndex(index)}
              style={{ "--brand": color } as CSSProperties}
              className="group flex items-center justify-between gap-2 p-2 hover:bg-[#313346] focus:bg-[#313346] focus:outline-none"
            >
              <span className="flex items-center gap-4">
                <Icon className="group-hover:text-(--brand) group-focus:text-(--brand)" />
                {label}
              </span>

              <span>
                {shortcut.split("").map((char, i) => (
                  <span
                    key={i}
                    className={
                      isMatching && i < currentSequence.length
                        ? "bg-foreground text-background"
                        : ""
                    }
                  >
                    {char}
                  </span>
                ))}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
