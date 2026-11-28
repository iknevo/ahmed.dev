import { BackLink } from "@/components/back-link";

type PageHeaderProps = {
  title: string;
  count?: number;
  hint?: string;
};

export function PageHeader({
  title,
  count,
  hint = "j/k or mouse wheel to scroll · gb to go back",
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <BackLink />

        <p className="bg-mode-color text-background p-3 text-center text-xl lg:text-3xl">
          {title}
          {count !== undefined && <span className="opacity-60"> ({count})</span>}
        </p>
      </div>

      <p className="text-foreground/50 hidden px-2 text-center text-sm md:block">&quot; {hint}</p>
    </div>
  );
}

export function LoadError({ what }: { what: string }) {
  return (
    <p className="self-center px-2 text-base text-red-400 lg:text-[22px]">
      Can&apos;t load {what}. Try again later.
    </p>
  );
}
