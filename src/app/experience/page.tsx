import {
  differenceInCalendarMonths,
  format,
  formatDuration as formatDurationText,
  isValid,
  parse,
} from "date-fns";
import type { Metadata } from "next";

import { type Experience, getExperience } from "@/lib/portfolio-api";

import { LoadError, PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Ahmed · Experience",
};

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <main className="mt-5 mb-8 flex w-full flex-col gap-8 px-4 lg:w-3/4">
      <PageHeader title="experience" />

      {experience ? (
        <ol className="relative flex flex-col gap-6 border-l border-[#313346] pl-6 md:pl-8">
          {experience.map((item) => (
            <ExperienceItem key={item._id} item={item} />
          ))}
        </ol>
      ) : (
        <LoadError what="experience" />
      )}
    </main>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  const { title, company, startDate, endDate } = item;
  const isCurrent = endDate.trim().toLowerCase() === "present";
  const duration = formatDuration(startDate, endDate);

  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute top-5 -left-7.25 size-2.5 md:-left-9.25 ${
          isCurrent ? "bg-insert" : "bg-[#4a4d66]"
        }`}
      />

      <article className="flex flex-col gap-3 border border-[#313346] p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-lg font-bold lg:text-xl">{title}</h2>
          <p className="text-normal text-sm lg:text-base">@ {company}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-1 text-sm sm:items-end">
          <span className="text-foreground/80 whitespace-nowrap">
            {formatMonth(startDate)} — {isCurrent ? "Present" : formatMonth(endDate)}
          </span>
          <span className="text-foreground/50 flex items-center gap-2 whitespace-nowrap">
            {isCurrent && <span className="text-insert">● current</span>}
            {duration}
          </span>
        </div>
      </article>
    </li>
  );
}

function parseMonth(value: string) {
  if (value.trim().toLowerCase() === "present") return new Date();
  const date = parse(value.trim(), "MM/yyyy", new Date());
  return isValid(date) ? date : null;
}

function formatMonth(value: string) {
  const date = parseMonth(value);
  return date ? format(date, "MMM yyyy") : value;
}

function formatDuration(start: string, end: string) {
  const from = parseMonth(start);
  const to = parseMonth(end);
  if (!from || !to) return "";

  const total = differenceInCalendarMonths(to, from) + 1;
  if (total < 1) return "";

  return formatDurationText({ years: Math.floor(total / 12), months: total % 12 });
}
