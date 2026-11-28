import type { Metadata } from "next";
import Image from "next/image";

import { getStack } from "@/lib/portfolio-api";

import { LoadError, PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Ahmed · Skills",
};

export default async function SkillsPage() {
  const groups = await getStack();

  return (
    <main className="mt-5 mb-8 flex w-full flex-col gap-8 px-4 lg:w-3/4">
      <PageHeader title="skills" />

      {groups ? (
        groups.map(({ type, items }) => (
          <section key={type} className="flex flex-col gap-3">
            <h2 className="text-base lg:text-[22px]">
              <span className="text-normal"># {type}</span>{" "}
              <span className="text-foreground/50 text-sm">({items.length})</span>
            </h2>

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {items.map(({ _id, name, icon }) => (
                <li
                  key={_id}
                  title={cleanName(name)}
                  className="flex min-w-0 items-center gap-3 border border-[#313346] p-2"
                >
                  <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 shrink-0 object-contain"
                  />
                  <span className="truncate text-sm lg:text-base">{cleanName(name)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <LoadError what="skills" />
      )}
    </main>
  );
}

function cleanName(name: string) {
  return name.replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").replace(/\s+/g, " ").trim();
}
