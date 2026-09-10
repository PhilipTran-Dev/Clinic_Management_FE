import type { ReactNode } from "react";

interface WorkspaceSplitViewProps {
  left: ReactNode;
  right: ReactNode;
}

export default function WorkspaceSplitView({
  left,
  right,
}: WorkspaceSplitViewProps) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-12">
      <section className="col-span-5 flex min-h-0 flex-col border-r border-slate-200/80 bg-white">
        {left}
      </section>
      <section className="col-span-7 flex min-h-0 flex-col bg-surface-light">
        {right}
      </section>
    </div>
  );
}