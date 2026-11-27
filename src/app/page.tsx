import { LinksMenu } from "@/components/links-menu";

export default function Home() {
  return (
    <main className="mt-5 mb-8 flex w-3/4 flex-col items-center gap-8 lg:w-1/2">
      <p className="bg-mode-color text-background p-3 text-center text-xl lg:text-3xl">
        software engineer
      </p>

      <LinksMenu />

      <p className="text-foreground/50 hidden self-start px-2 text-sm md:block">
        &quot; j/k move · enter open · type a shortcut to jump · esc cancel
      </p>
    </main>
  );
}
