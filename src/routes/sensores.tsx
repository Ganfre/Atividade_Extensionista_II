import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/AppHeader";
import { sensores, type SensorStatus } from "@/lib/water-data";

export const Route = createFileRoute("/sensores")({
  head: () => ({
    meta: [
      { title: "Sensores — Monitoramento Hídrico" },
      {
        name: "description",
        content:
          "Lista dos pontos de medição da instituição com leitura em tempo real, status de conexão e nível de bateria.",
      },
      { property: "og:title", content: "Sensores — Monitoramento Hídrico" },
      {
        property: "og:description",
        content: "Status, leitura e bateria de cada sensor de água instalado na instituição.",
      },
    ],
  }),
  component: Sensores,
});

const rotulos: Record<SensorStatus, string> = {
  online: "Online",
  "sem-sinal": "Sem sinal",
  bateria: "Bateria baixa",
};

const cores: Record<SensorStatus, string> = {
  online: "bg-accent/15 text-accent",
  "sem-sinal": "bg-warn/15 text-warn",
  bateria: "bg-crit/15 text-crit",
};

const filtros = ["todos", "online", "sem-sinal", "bateria"] as const;

function Sensores() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("todos");
  const [busca, setBusca] = useState("");

  const lista = useMemo(
    () =>
      sensores.filter(
        (s) =>
          (filtro === "todos" || s.status === filtro) &&
          (s.local.toLowerCase().includes(busca.toLowerCase()) ||
            s.id.toLowerCase().includes(busca.toLowerCase()) ||
            s.setor.toLowerCase().includes(busca.toLowerCase())),
      ),
    [filtro, busca],
  );

  return (
    <PageShell>
      <div className="tile rounded-3xl p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-[15px] font-semibold">Pontos de medição</p>
            <p className="mt-0.5 text-[12px] text-frost/50">
              {lista.length} de {sensores.length} sensores exibidos
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar local, setor ou ID"
              className="rounded-full border border-frost/12 bg-frost/[0.06] px-3.5 py-2 text-[12px] text-frost placeholder:text-frost/40 focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  filtro === f ? "bg-brand/20 text-brand" : "bg-frost/5 text-frost/60"
                }`}
              >
                {f === "todos" ? "Todos" : rotulos[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-12 gap-3 px-3 pb-2 text-[10px] uppercase tracking-[0.14em] text-frost/40 md:grid">
          <span className="col-span-2">ID</span>
          <span className="col-span-4">Local</span>
          <span className="col-span-2">Tipo</span>
          <span className="col-span-2">Leitura</span>
          <span className="col-span-2 text-right">Status</span>
        </div>

        <div className="space-y-2">
          {lista.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-2 items-center gap-3 rounded-2xl border border-frost/10 bg-frost/[0.04] px-3 py-3 text-[13px] md:grid-cols-12"
            >
              <span className="col-span-1 font-medium text-frost/70 md:col-span-2">{s.id}</span>
              <span className="col-span-1 truncate md:col-span-4">
                {s.local}
                <span className="block text-[11px] text-frost/40">{s.setor}</span>
              </span>
              <span className="col-span-1 text-frost/60 md:col-span-2">{s.tipo}</span>
              <span className="col-span-1 md:col-span-2">
                {s.leitura}
                <span className="block text-[11px] text-frost/40">
                  {s.atualizado} · bateria {s.bateria}%
                </span>
              </span>
              <span className="col-span-2 flex justify-end md:col-span-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${cores[s.status]}`}
                >
                  {rotulos[s.status]}
                </span>
              </span>
            </div>
          ))}
          {lista.length === 0 && (
            <p className="py-10 text-center text-[13px] text-frost/40">
              Nenhum sensor encontrado com esses filtros.
            </p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
