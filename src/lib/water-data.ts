export type Severity = "critico" | "atencao" | "info";
export type SensorStatus = "online" | "sem-sinal" | "bateria";

export const INSTITUICAO = "Escola Municipal Horizonte Verde";

export type DailyPoint = { dia: string; litros: number; anomalia?: boolean };

export const consumoDiario: DailyPoint[] = [
  { dia: "06", litros: 4380 },
  { dia: "07", litros: 5390 },
  { dia: "08", litros: 4040 },
  { dia: "09", litros: 5890 },
  { dia: "10", litros: 7410 },
  { dia: "11", litros: 8080 },
  { dia: "12", litros: 6570, anomalia: true },
  { dia: "13", litros: 5050 },
  { dia: "14", litros: 4630 },
  { dia: "15", litros: 5640 },
  { dia: "16", litros: 6060 },
  { dia: "17", litros: 7580, anomalia: true },
  { dia: "18", litros: 6900 },
  { dia: "19", litros: 8420 },
];

export const consumoMensal: DailyPoint[] = [
  { dia: "Mar", litros: 171000 },
  { dia: "Abr", litros: 183000 },
  { dia: "Mai", litros: 168000 },
  { dia: "Jun", litros: 190000 },
  { dia: "Jul", litros: 204000, anomalia: true },
  { dia: "Ago", litros: 188000 },
  { dia: "Set", litros: 196000 },
];

export type Setor = { nome: string; litros: number; percentual: number };

export const setores: Setor[] = [
  { nome: "Cozinha", litros: 2140, percentual: 82 },
  { nome: "Banheiros", litros: 1860, percentual: 71 },
  { nome: "Laboratórios", litros: 1120, percentual: 44 },
  { nome: "Jardins", litros: 940, percentual: 36 },
  { nome: "Bebedouros", litros: 360, percentual: 14 },
];

export type Alerta = {
  id: string;
  icone: string;
  titulo: string;
  detalhe: string;
  severidade: Severity;
  setor: string;
  perdaLitrosDia: number;
};

export const alertas: Alerta[] = [
  {
    id: "ALR-01",
    icone: "🚰",
    titulo: "Vazamento — banheiro bloco B",
    detalhe: "Fluxo contínuo de 0,9 L/min · sensor 07",
    severidade: "critico",
    setor: "Banheiros",
    perdaLitrosDia: 1296,
  },
  {
    id: "ALR-02",
    icone: "🚿",
    titulo: "Vazamento — torneira cozinha",
    detalhe: "Gotejamento noturno · sensor 03",
    severidade: "critico",
    setor: "Cozinha",
    perdaLitrosDia: 210,
  },
  {
    id: "ALR-03",
    icone: "📈",
    titulo: "Pico de consumo 06:40",
    detalhe: "Irrigação jardins fora do horário · sensor 11",
    severidade: "atencao",
    setor: "Jardins",
    perdaLitrosDia: 480,
  },
];

export type Sensor = {
  id: string;
  local: string;
  setor: string;
  tipo: string;
  leitura: string;
  status: SensorStatus;
  atualizado: string;
  bateria: number;
};

export const sensores: Sensor[] = [
  { id: "SNR-01", local: "Entrada principal", setor: "Geral", tipo: "Hidrômetro", leitura: "1,42 L/s", status: "online", atualizado: "há 12s", bateria: 92 },
  { id: "SNR-02", local: "Reservatório superior", setor: "Geral", tipo: "Nível", leitura: "78%", status: "online", atualizado: "há 20s", bateria: 88 },
  { id: "SNR-03", local: "Cozinha — torneira central", setor: "Cozinha", tipo: "Vazão", leitura: "0,61 L/s", status: "online", atualizado: "há 8s", bateria: 74 },
  { id: "SNR-04", local: "Cozinha — lavagem", setor: "Cozinha", tipo: "Volume", leitura: "0,34 L/s", status: "online", atualizado: "há 15s", bateria: 81 },
  { id: "SNR-05", local: "Banheiro bloco A", setor: "Banheiros", tipo: "Vazão", leitura: "0,22 L/s", status: "online", atualizado: "há 11s", bateria: 69 },
  { id: "SNR-06", local: "Banheiro bloco A — mictórios", setor: "Banheiros", tipo: "Vazão", leitura: "0,05 L/s", status: "bateria", atualizado: "há 3min", bateria: 12 },
  { id: "SNR-07", local: "Banheiro bloco B", setor: "Banheiros", tipo: "Vazão", leitura: "0,90 L/min", status: "online", atualizado: "há 9s", bateria: 77 },
  { id: "SNR-08", local: "Laboratório de ciências", setor: "Laboratórios", tipo: "Volume", leitura: "0,18 L/s", status: "online", atualizado: "há 25s", bateria: 84 },
  { id: "SNR-09", local: "Laboratório de química", setor: "Laboratórios", tipo: "Volume", leitura: "0,11 L/s", status: "online", atualizado: "há 30s", bateria: 80 },
  { id: "SNR-10", local: "Bebedouros pátio", setor: "Bebedouros", tipo: "Volume", leitura: "0,08 L/s", status: "online", atualizado: "há 14s", bateria: 90 },
  { id: "SNR-11", local: "Irrigação jardim norte", setor: "Jardins", tipo: "Vazão", leitura: "1,05 L/s", status: "online", atualizado: "há 10s", bateria: 66 },
  { id: "SNR-12", local: "Irrigação jardim sul", setor: "Jardins", tipo: "Vazão", leitura: "0,00 L/s", status: "sem-sinal", atualizado: "há 1h20", bateria: 41 },
  { id: "SNR-13", local: "Quadra poliesportiva", setor: "Geral", tipo: "Vazão", leitura: "0,00 L/s", status: "sem-sinal", atualizado: "há 42min", bateria: 58 },
  { id: "SNR-14", local: "Cisterna água de chuva", setor: "Geral", tipo: "Nível", leitura: "36%", status: "online", atualizado: "há 18s", bateria: 95 },
];

export type Relatorio = {
  id: string;
  titulo: string;
  periodo: string;
  formato: "PDF" | "CSV";
  tamanho: string;
  gerado: string;
};

export const relatorios: Relatorio[] = [
  { id: "REL-09", titulo: "Consumo mensal consolidado", periodo: "Setembro/2026", formato: "PDF", tamanho: "1,2 MB", gerado: "02/09/2026" },
  { id: "REL-08", titulo: "Leituras brutas dos sensores", periodo: "Últimos 30 dias", formato: "CSV", tamanho: "480 KB", gerado: "01/09/2026" },
  { id: "REL-07", titulo: "Auditoria de vazamentos", periodo: "Agosto/2026", formato: "PDF", tamanho: "860 KB", gerado: "05/08/2026" },
  { id: "REL-06", titulo: "Consumo por setor", periodo: "2º trimestre", formato: "CSV", tamanho: "312 KB", gerado: "12/07/2026" },
];

export const resumo = {
  consumoHoje: 8420,
  variacaoOntem: 6,
  mediaMensalM3: 196,
  metaMensalM3: 180,
  desperdicioPercentual: 12,
  desperdicioLitrosDia: 1010,
  alertasAtivos: alertas.length,
  sensoresOnline: sensores.filter((s) => s.status === "online").length,
  sensoresTotal: sensores.length,
};

export const formatarNumero = (valor: number) =>
  new Intl.NumberFormat("pt-BR").format(valor);
