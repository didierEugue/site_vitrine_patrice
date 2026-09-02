"use client";

import { useMemo, useState } from "react";

/**
 * Les deux calculateurs de l'ancien site (échéance d'emprunt et indemnité de
 * rupture), refaits côté navigateur.
 *
 * L'ancienne version appelait deux routes Express (`/api/calculators/loan` et
 * `/api/calculators/severance`) : un aller-retour réseau pour trois
 * multiplications, et une saisie salariale qui transitait par le serveur. Tout
 * est calculé ici, rien n'est transmis.
 *
 * Le barème d'indemnité a par ailleurs été corrigé : l'ancienne route appliquait
 * un quantième de 1/5e de mois par année pour la mise à la retraite — le taux
 * d'avant la réforme de 2017. Le barème légal en vigueur est de 1/4 de mois
 * jusqu'à dix ans d'ancienneté, 1/3 au-delà.
 */

const field =
  "w-full rounded-sm border border-paper-300 bg-paper-50 px-4 py-3 text-sm text-ink-900 placeholder:text-slate-400 transition-colors focus:border-brand-600 focus:outline-none numeric";

const labelCls = "label block text-slate-500";

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurPrecise = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Champ numérique contrôlé — la saisie reste une chaîne pour rester libre. */
function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
  step = "any",
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  step?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${field} ${suffix ? "pr-12" : ""}`}
        />
        {suffix ? (
          <span className="label pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
            {suffix}
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-2 text-xs leading-relaxed text-slate-500">{hint}</p> : null}
    </div>
  );
}

/** Ligne de résultat. La valeur mise en avant passe en grand corps. */
function Result({
  label,
  value,
  lead = false,
}: {
  label: string;
  value: string;
  lead?: boolean;
}) {
  return (
    <div className="border-paper-200 flex items-baseline justify-between gap-6 border-b py-4 last:border-b-0">
      <span className="label text-slate-500">{label}</span>
      <span
        className={
          lead
            ? "numeric text-brand-600 text-3xl sm:text-4xl"
            : "numeric text-ink-900 text-lg"
        }
      >
        {value}
      </span>
    </div>
  );
}

function num(v: string) {
  const n = Number.parseFloat(v.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

/* ------------------------------------------------------------------ Emprunt */

function LoanCalculator() {
  const [amount, setAmount] = useState("150000");
  const [rate, setRate] = useState("3.6");
  const [years, setYears] = useState("15");

  const result = useMemo(() => {
    const principal = num(amount);
    const annualRate = num(rate);
    const duration = num(years);

    if (principal <= 0 || duration <= 0) return null;

    const payments = Math.round(duration * 12);
    const monthlyRate = annualRate / 100 / 12;

    // Formule d'annuité constante : M = P × [r(1+r)^n] / [(1+r)^n − 1].
    // Le cas du taux nul est isolé, la formule y divise par zéro.
    const monthly =
      monthlyRate === 0
        ? principal / payments
        : (principal * (monthlyRate * Math.pow(1 + monthlyRate, payments))) /
          (Math.pow(1 + monthlyRate, payments) - 1);

    const total = monthly * payments;

    return { monthly, total, interest: total - principal, payments };
  }, [amount, rate, years]);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-5">
        <NumberField
          id="loan-amount"
          label="Montant emprunté"
          value={amount}
          onChange={setAmount}
          suffix="€"
          step="1000"
        />
        <NumberField
          id="loan-rate"
          label="Taux annuel"
          value={rate}
          onChange={setRate}
          suffix="%"
          step="0.05"
          hint="Taux nominal hors assurance emprunteur et frais de dossier."
        />
        <NumberField
          id="loan-years"
          label="Durée"
          value={years}
          onChange={setYears}
          suffix="ans"
          step="1"
        />
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        {result ? (
          <>
            <Result label="Mensualité" value={eurPrecise.format(result.monthly)} lead />
            <Result label="Coût total du crédit" value={eur.format(result.interest)} />
            <Result label="Total remboursé" value={eur.format(result.total)} />
            <Result label="Nombre d'échéances" value={String(result.payments)} />
          </>
        ) : (
          <p className="text-sm text-slate-500">
            Renseignez un montant et une durée pour obtenir la mensualité.
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Indemnités */

type RuptureKind = "licenciement" | "rupture-conventionnelle" | "mise-retraite" | "depart-retraite";

const KINDS: Array<{ value: RuptureKind; label: string; note: string }> = [
  {
    value: "licenciement",
    label: "Licenciement",
    note: "Indemnité légale de licenciement, hors faute grave ou lourde.",
  },
  {
    value: "rupture-conventionnelle",
    label: "Rupture conventionnelle",
    note: "L'indemnité de rupture conventionnelle ne peut pas être inférieure à l'indemnité légale de licenciement.",
  },
  {
    value: "mise-retraite",
    label: "Mise à la retraite",
    note: "À l'initiative de l'employeur : même barème que l'indemnité légale de licenciement.",
  },
  {
    value: "depart-retraite",
    label: "Départ volontaire à la retraite",
    note: "À l'initiative du salarié : barème par paliers d'ancienneté, sensiblement plus faible.",
  },
];

function legalSeverance(salary: number, seniority: number) {
  // L1234-9 / R1234-2 : 1/4 de mois par année sur les dix premières,
  // 1/3 de mois par année au-delà. Les années incomplètes comptent au prorata.
  const firstTen = Math.min(seniority, 10);
  const beyond = Math.max(seniority - 10, 0);
  return salary * (firstTen / 4 + beyond / 3);
}

function voluntaryRetirement(salary: number, seniority: number) {
  // L1237-9 : barème par paliers, sans prorata à l'intérieur d'un palier.
  if (seniority >= 30) return salary * 2;
  if (seniority >= 20) return salary * 1.5;
  if (seniority >= 15) return salary;
  if (seniority >= 10) return salary * 0.5;
  return 0;
}

function SeveranceCalculator() {
  const [salary, setSalary] = useState("2600");
  const [years, setYears] = useState("8");
  const [months, setMonths] = useState("0");
  const [kind, setKind] = useState<RuptureKind>("licenciement");

  const active = KINDS.find((k) => k.value === kind)!;

  const result = useMemo(() => {
    const reference = num(salary);
    const seniority = num(years) + num(months) / 12;

    if (reference <= 0 || seniority <= 0) return null;

    const amount =
      kind === "depart-retraite"
        ? voluntaryRetirement(reference, seniority)
        : legalSeverance(reference, seniority);

    return { amount, seniority, months: amount / reference };
  }, [salary, years, months, kind]);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-5">
        <NumberField
          id="sev-salary"
          label="Salaire de référence brut mensuel"
          value={salary}
          onChange={setSalary}
          suffix="€"
          step="50"
          hint="Le plus favorable entre la moyenne des 12 derniers mois et le tiers des 3 derniers mois, primes annuelles ramenées au prorata."
        />

        <div className="grid grid-cols-2 gap-5">
          <NumberField id="sev-years" label="Ancienneté — années" value={years} onChange={setYears} step="1" />
          <NumberField id="sev-months" label="Mois complémentaires" value={months} onChange={setMonths} step="1" />
        </div>

        <div>
          <label htmlFor="sev-kind" className={labelCls}>
            Motif de la rupture
          </label>
          <select
            id="sev-kind"
            value={kind}
            onChange={(e) => setKind(e.target.value as RuptureKind)}
            className={`${field} mt-2`}
          >
            {KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">{active.note}</p>
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        {result ? (
          <>
            <Result label="Indemnité légale minimale" value={eur.format(result.amount)} lead />
            <Result
              label="Équivalent en mois de salaire"
              value={result.months.toFixed(2).replace(".", ",")}
            />
            <Result
              label="Ancienneté retenue"
              value={`${result.seniority.toFixed(2).replace(".", ",")} ans`}
            />

            {kind === "depart-retraite" && result.amount === 0 ? (
              <p className="mt-6 text-sm leading-relaxed text-slate-600">
                Aucune indemnité légale n&apos;est due en dessous de dix ans d&apos;ancienneté. Votre
                convention collective peut toutefois en prévoir une.
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-slate-500">
            Renseignez un salaire et une ancienneté pour obtenir l&apos;indemnité.
          </p>
        )}

        <p className="border-paper-200 mt-8 border-t pt-6 text-xs leading-relaxed text-slate-500">
          Montant <strong className="font-medium">plancher</strong> prévu par le Code du travail.
          Votre convention collective, un accord d&apos;entreprise ou le contrat peuvent imposer un
          calcul plus favorable — c&apos;est fréquent. Le cabinet vérifie le barème applicable avant
          toute rupture.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Export */

const TABS = [
  { id: "emprunt", label: "Échéance d'emprunt" },
  { id: "rupture", label: "Indemnité de rupture" },
] as const;

export default function Calculators() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("emprunt");

  return (
    <div>
      <div role="tablist" aria-label="Calculateurs" className="border-paper-200 flex gap-2 border-b">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`label -mb-px border-b-2 px-5 py-4 transition-colors ${
              tab === t.id
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="pt-12"
      >
        {tab === "emprunt" ? <LoanCalculator /> : <SeveranceCalculator />}
      </div>
    </div>
  );
}
