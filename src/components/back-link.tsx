"use client";

import Link from "next/link";

import { backShortcut } from "@/config/links";
import { useModeStore } from "@/state/mode-store";

export function BackLink() {
  const currentSequence = useModeStore((state) => state.currentSequence);
  const isMatching = currentSequence !== "" && backShortcut.startsWith(currentSequence);

  return (
    <Link
      href="/"
      className="flex items-center gap-3 justify-self-start p-2 text-sm whitespace-nowrap hover:bg-[#313346] focus:bg-[#313346] focus:outline-none sm:text-base lg:text-[22px]"
    >
      ← back
      <span className="text-foreground/50">
        (
        {backShortcut.split("").map((char, i) => (
          <span
            key={i}
            className={
              isMatching && i < currentSequence.length ? "bg-foreground text-background" : ""
            }
          >
            {char}
          </span>
        ))}
        )
      </span>
    </Link>
  );
}
