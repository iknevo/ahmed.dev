"use client";

import { usePathname } from "next/navigation";
import { SiHtml5 } from "react-icons/si";

import { useModeStore } from "@/state/mode-store";

export function StatusLine() {
  const mode = useModeStore((state) => state.mode);
  const focusedIndex = useModeStore((state) => state.focusedIndex);
  const pathname = usePathname();
  const fileName = pathname === "/" ? "index" : pathname.slice(1);

  return (
    <div
      id="status-line"
      className="flex w-full flex-row items-center bg-mist-950 text-base lg:text-[22px]"
    >
      <span className="bg-mode-color text-background h-full px-0.5 font-bold sm:px-2">{mode}</span>

      <span className="pl-2">~/{fileName}.html</span>

      <span className="grow"></span>

      <span className="flex flex-row items-center justify-end gap-2 px-1 sm:pr-4">
        <span className="relative inline-flex">
          <span className="absolute inset-0 bg-white [clip-path:polygon(15%_10%,85%_10%,78%_85%,50%_93%,22%_85%)]" />
          <SiHtml5 size={20} className="fill-html relative" />
        </span>
        HTML
      </span>

      <span className="text-mode-color bg-[#313346] px-1 sm:pr-3 sm:pl-7">Top</span>

      <span className="bg-mode-color text-background px-1 sm:pr-3 sm:pl-10">
        {(focusedIndex ?? 0) + 1}:1
      </span>
    </div>
  );
}
