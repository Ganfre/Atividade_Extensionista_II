import { Link } from "@tanstack/react-router";
import { INSTITUICAO, resumo } from "@/lib/water-data";

const navItems = [
  { to: "/", label: "Painel" },
  { to: "/sensores", label: "Sensores" },
] as const;

export function AppHeader() {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="tile grid size-11 place-items-center rounded-2xl text-xl">💧</div>
        <div>
          <p className="font-display text-[15px] font-bold leading-none tracking-tight">
            Plataforma de Gestão e Monitoramento Hídrico
          </p>
          <p className="mt-1 text-[12px] text-frost/50">{INSTITUICAO}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="tile hidden items-center gap-2 rounded-full px-3 py-2 text-[12px] font-medium sm:flex">
          <span className="size-2 animate-pulse rounded-full bg-accent" />
          Sistemas online · {resumo.sensoresTotal} sensores
        </div>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="tile rounded-full px-3 py-2 text-[12px] font-medium text-frost/70 transition-colors hover:text-frost"
              activeProps={{ className: "text-frost bg-brand/20" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-body text-frost antialiased">
      <div className="glow pointer-events-none fixed inset-0" />
      <div className="relative mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
        <AppHeader />
        {children}
      </div>
    </div>
  );
}
