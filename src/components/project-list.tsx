"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";

import type { Project } from "@/lib/portfolio-api";

import { useModeStore } from "@/state/mode-store";

export function ProjectList({ projects }: { projects: Project[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="flex flex-col gap-4">
      {projects.map((project, index) => (
        <ProjectRow
          key={project._id}
          project={project}
          index={index}
          isOpen={openId === project._id}
          onToggle={() => setOpenId((id) => (id === project._id ? null : project._id))}
        />
      ))}
    </ul>
  );
}

type ProjectRowProps = {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function ProjectRow({ project, index, isOpen, onToggle }: ProjectRowProps) {
  const { _id, name, year, description, features, techStack, thumbnail, liveUrl, sourceCode } =
    project;
  const detailsId = `project-${_id}-details`;
  const rowRef = useRef<HTMLLIElement>(null);
  const setFocusedIndex = useModeStore((state) => state.setFocusedIndex);

  // Opening a row closes the previous one, which shifts everything below it.
  // Runs after that layout change, so the row lands at its final position.
  useEffect(() => {
    if (!isOpen) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rowRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, [isOpen]);

  return (
    <li
      ref={rowRef}
      className={`focus-within:border-normal scroll-mt-4 border transition-colors ${isOpen ? "border-[#4a4d66]" : "border-[#313346]"}`}
    >
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-baseline gap-3">
          <span className="text-foreground/30 text-sm">{String(index + 1).padStart(2, "0")}</span>
          <h2 className="truncate text-lg font-bold lg:text-xl">{name}</h2>
          <span className="text-foreground/50 ml-auto shrink-0 text-sm">{year}</span>
        </div>

        <p
          className={`text-foreground/70 text-sm whitespace-pre-line ${isOpen ? "" : "line-clamp-2"}`}
        >
          {description}
        </p>

        <div className="flex items-center gap-4 pt-1">
          {/* One line only: overflowing tags fade out. Hidden while open, since the details pane lists them all. */}
          {!isOpen && (
            <TechTags
              techStack={techStack}
              className="min-w-0 flex-1 flex-nowrap overflow-hidden mask-[linear-gradient(to_right,black_80%,transparent)]"
            />
          )}

          <button
            type="button"
            data-nav-item
            onFocus={() => setFocusedIndex(index)}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={detailsId}
            className="text-foreground/60 hover:text-foreground ml-auto shrink-0 px-2 py-1 text-sm whitespace-nowrap hover:bg-[#313346] focus:bg-[#313346] focus:outline-none"
          >
            <span className={`inline-block transition-transform ${isOpen ? "rotate-90" : ""}`}>
              ▸
            </span>{" "}
            {isOpen ? "view less" : "view more"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id={detailsId} className="flex flex-col gap-5 border-t border-[#313346] p-4">
          <section className="flex flex-col gap-2 text-sm">
            <h3 className="text-normal"># stack</h3>
            <TechTags techStack={techStack} className="flex-wrap" />
          </section>

          {features.length > 0 && (
            <section className="flex flex-col gap-2 text-sm">
              <h3 className="text-normal"># features</h3>
              {/* CSS columns instead of a grid, so a long item doesn't stretch the one beside it. */}
              <ul className="text-foreground/80 gap-x-8 md:columns-2">
                {features.map((feature, i) => (
                  <li key={i} className="mb-1.5 flex break-inside-avoid gap-2">
                    <span className="text-normal">-</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-2 text-sm">
            {liveUrl && <ExternalLink href={liveUrl}>live ↗</ExternalLink>}
            {sourceCode && <ExternalLink href={sourceCode}>source ↗</ExternalLink>}
          </div>

          <Image
            src={thumbnail}
            alt={`${name} preview`}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 75vw, 100vw"
            className="h-auto w-full border border-[#313346]"
          />
        </div>
      )}
    </li>
  );
}

function TechTags({ techStack, className }: { techStack: string[]; className: string }) {
  return (
    <ul className={`flex gap-1.5 text-xs ${className}`}>
      {techStack.map((tech, i) => (
        <li key={i} className="text-normal shrink-0 bg-[#1f2130] px-1.5 py-0.5 whitespace-nowrap">
          {tech}
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-[#313346] px-2 py-1 hover:bg-[#313346] focus:bg-[#313346] focus:outline-none"
    >
      {children}
    </a>
  );
}
