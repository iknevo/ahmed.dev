import type { Metadata } from "next";

import { getProjects } from "@/lib/portfolio-api";

import { LoadError, PageHeader } from "@/components/page-header";
import { ProjectList } from "@/components/project-list";

export const metadata: Metadata = {
  title: "Ahmed · Projects",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mt-5 mb-8 flex w-full flex-col gap-8 px-4 lg:w-3/4">
      <PageHeader
        title="projects"
        count={projects?.length}
        hint="j/k select · enter view more · mouse wheel to scroll · gb to go back"
      />

      {projects ? <ProjectList projects={projects} /> : <LoadError what="projects" />}
    </main>
  );
}
