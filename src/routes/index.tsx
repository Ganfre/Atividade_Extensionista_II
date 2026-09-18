import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/AppHeader";
import {
  alertas,
  consumoDiario,
  consumoMensal,
  formatarNumero,
  resumo,
  setores,
} from "@/lib/water-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel Hídrico — Monitoramento de consumo de água" },
      {
        name: "description",
        content:
          "Painel de monitoramento do consumo de água da instituição: consumo diário, uso por setor, alertas de vazamento e status dos sensores.",
      },
      { property: "og:title", content: "Painel Hídrico — Monitoramento de consumo de água" },
      {
        property: "og:description",
        content:
          "Acompanhe o consumo de água em tempo real, identifique desperdícios e monitore os sensores da instituição.",
      },
    ],
  }),
  component: Painel,
});

function Painel() {
  const [periodo, setPeriodo] = useState<"dia" | "mes">("dia");
  const serie = periodo === "dia" ? consumoDiario : consumoMensal;
  const maximo = Math.max(...serie.map((p) => p.litros));

  return (
    <PageShell>
      <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi
          rotulo="Consumo hoje"
          valor={formatarNumero(resumo.consumoHoje)}
          unidade="L"
          nota={`▲ ${resumo.variacaoOntem}% vs ontem`}
          notaClasse="text-accent"
        />
        <Kpi
          rotulo="Média mensal"
          valor={String(resumo.mediaMensalM3)}
          unidade="m³"
          nota={`Meta: ${resumo.metaMensalM3} m³`}
          notaClasse="text-frost/50"
        />
        <Kpi
          rotulo="Desperdício estimado"
          valor={String(resumo.desperdicioPercentual)}
          unidade="%"
          valorClasse="text-warn"
          nota={`≈ ${formatarNumero(resumo.desperdicioLitrosDia)} L/dia`}
          notaClasse="text-warn/80"
        />
        <Kpi
          rotulo="Alertas ativos"
          valor={String(resumo.alertasAtivos)}
          valorClasse="text-crit"
          nota="2 vazamentos · 1 pressão"
          notaClasse="text-frost/50"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="tile rounded-3xl p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-[15px] font-semibold">
                {periodo === "dia"
                  ? "Consumo por dia — últimos 14 dias"
                  : "Consumo por mês — últimos 7 meses"}
              </p>
              <p className="mt-0.5 text-[12px] text-frost/50">
                Volume medido pelos sensores (litros)
              </p>
            </div>
            <div className="flex gap-2 text-[11px] font-medium">
              <button
                onClick={() => setPeriodo("dia")}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  periodo === "dia" ? "bg-brand/20 text-brand" : "bg-frost/5 text-frost/60"
                }`}
              >
                Diário
              </button>
              <button
                onClick={() => setPeriodo("mes")}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  periodo === "mes" ? "bg-brand/20 text-brand" : "bg-frost/5 text-frost/60"
                }`}
              >
                Mensal
              </button>
            </div>
          </div>
          <div className="flex h-52 items-end justify-between gap-2">
            {serie.map((ponto, i) => (
              <div
                key={ponto.dia}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  title={`${formatarNumero(ponto.litros)} L`}
                  className={`bar-rise w-full rounded-lg bg-gradient-to-t from-brand/70 ${
                    ponto.anomalia ? "to-warn/80" : "to-accent/80"
                  } ${i === serie.length - 1 ? "ring-2 ring-frost/25" : ""}`}
                  style={{
                    height: `${Math.round((ponto.litros / maximo) * 88)}%`,
                    animationDelay: `${i * 35}ms`,
                  }}
                />

                <span
                  className={`text-[10px] ${
                    i === serie.length - 1 ? "font-semibold text-frost/70" : "text-frost/40"
                  }`}
                >
                  {ponto.dia}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="tile rounded-3xl p-6">
          <p className="font-display mb-1 text-[15px] font-semibold">Uso por setor</p>
          <p className="mb-5 text-[12px] text-frost/50">Distribuição do consumo atual</p>
          <div className="space-y-4">
            {setores.map((setor) => (
              <div key={setor.nome}>
                <div className="mb-1.5 flex justify-between text-[12px]">
                  <span className="font-medium">{setor.nome}</span>
                  <span className="text-frost/50">{formatarNumero(setor.litros)} L</span>
                </div>
                <div className="h-2 rounded-full bg-frost/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-700"
                    style={{ width: `${setor.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="tile rounded-3xl p-6 lg:col-span-2">
          <p className="font-display mb-4 text-[15px] font-semibold">
            Desperdícios e alertas detectados
          </p>
          <div className="space-y-3">
            {alertas.map((alerta) => {
              const critico = alerta.severidade === "critico";
              return (
                <div
                  key={alerta.id}
                  className="flex items-center gap-4 rounded-2xl border border-frost/10 bg-frost/[0.04] p-3.5"
                >
                  <div
                    className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                      critico ? "bg-crit/15 text-crit" : "bg-warn/15 text-warn"
                    }`}
                  >
                    {alerta.icone}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold">{alerta.titulo}</p>
                    <p className="text-[12px] text-frost/50">
                      {alerta.detalhe} · perda estimada{" "}
                      {formatarNumero(alerta.perdaLitrosDia)} L/dia
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      critico ? "bg-crit/15 text-crit" : "bg-warn/15 text-warn"
                    }`}
                  >
                    {critico ? "Crítico" : "Atenção"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="tile rounded-3xl p-6">
          <p className="font-display mb-1 text-[15px] font-semibold">Status dos sensores</p>
          <p className="mb-5 text-[12px] text-frost/50">
            {resumo.sensoresTotal} pontos de medição
          </p>
          <div className="flex items-center justify-center gap-6">
            <div
              className="relative grid size-28 place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--color-brand) 0 ${Math.round(
                  (resumo.sensoresOnline / resumo.sensoresTotal) * 100,
                )}%, rgba(238,246,251,.10) 0 100%)`,
              }}
            >
              <div className="absolute inset-2.5 grid place-items-center rounded-full bg-background">
                <span className="font-display text-2xl font-bold">{resumo.sensoresOnline}</span>
                <span className="text-[10px] text-frost/50">de {resumo.sensoresTotal}</span>
              </div>
            </div>
            <div className="space-y-2 text-[12px]">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" />
                Online
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-warn" />
                Sem sinal
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-crit" />
                Bateria baixa
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-frost/10 pt-4">
            <Link to="/sensores" className="text-[12px] text-frost/50 hover:text-frost">
              Ver todos os sensores
            </Link>
            <span className="text-[12px] font-semibold text-accent">próxima leitura 00:42</span>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function Kpi({
  rotulo,
  valor,
  unidade,
  nota,
  notaClasse,
  valorClasse,
}: {
  rotulo: string;
  valor: string;
  unidade?: string;
  nota: string;
  notaClasse: string;
  valorClasse?: string;
}) {
  return (
    <div className="tile rounded-3xl p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-frost/50">
        {rotulo}
      </p>
      <p className={`font-display mt-2 text-4xl font-bold tracking-tight ${valorClasse ?? ""}`}>
        {valor}
        {unidade ? <span className="text-base font-medium text-frost/40"> {unidade}</span> : null}
      </p>
      <p className={`mt-2 text-[12px] font-medium ${notaClasse}`}>{nota}</p>
    </div>
  );
}
