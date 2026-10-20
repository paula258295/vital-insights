"use client";

import { useState } from "react";
import { Activity, Plus, Filter, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts";

// Przykładowe dane z przebiegiem w czasie dla wykresu
const CHART_DATA = [
  { date: "2025-06-10", value: 18.2 },
  { date: "2025-09-15", value: 21.0 },
  { date: "2026-01-15", value: 24.5 },
  { date: "2026-03-01", value: 38.2 },
];

const INITIAL_RESULTS = [
  { id: 1, name: "Witamina D3 (25-OH)", value: 24.5, unit: "ng/ml", minNorm: 30, maxNorm: 100, date: "2026-01-15", category: "Witaminy" },
  { id: 2, name: "Ferrytyna", value: 45.0, unit: "µg/l", minNorm: 13, maxNorm: 150, date: "2026-01-15", category: "Gospodarka żelazem" },
  { id: 3, name: "TSH", value: 2.1, unit: "mIU/l", minNorm: 0.27, maxNorm: 4.2, date: "2026-02-10", category: "Tarczyca" },
  { id: 4, name: "Witamina D3 (25-OH)", value: 38.2, unit: "ng/ml", minNorm: 30, maxNorm: 100, date: "2026-03-01", category: "Witaminy" },
  { id: 5, name: "Magnez", value: 0.72, unit: "mmol/l", minNorm: 0.8, maxNorm: 1.1, date: "2026-03-01", category: "Elektrolity" },
];

export default function HealthDashboard() {
  const [results] = useState(INITIAL_RESULTS);
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const categories = ["Wszystkie", ...Array.from(new Set(INITIAL_RESULTS.map((r) => r.category)))];

  const filteredResults = selectedCategory === "Wszystkie"
    ? results
    : results.filter((r) => r.category === selectedCategory);

  const isOutOfRange = (val: number, min: number, max: number) => val < min || val > max;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="text-teal-600" /> Vital Insights
          </h1>
          <p className="text-slate-500 text-sm">Personal Health Analytics & Lab Metrics Log</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition">
          <Plus size={16} /> Dodaj Badanie
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        {/* Statystyki */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Ostatni Pomiar</p>
              <p className="text-xl font-bold text-slate-800">01 Marca 2026</p>
            </div>
            <CheckCircle className="text-teal-500" size={32} />
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Wyniki poza normą</p>
              <p className="text-xl font-bold text-rose-600">2 wskaźniki</p>
            </div>
            <AlertTriangle className="text-rose-500" size={32} />
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Status Witamina D3</p>
              <p className="text-xl font-bold text-emerald-600 flex items-center gap-1">
                +55.9% <TrendingUp size={18} />
              </p>
            </div>
            <Activity className="text-indigo-500" size={32} />
          </div>
        </div>

        {/* Sekcja Wykresu Trendu */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Trend: Witamina D3 (25-OH)</h2>
          <p className="text-xs text-slate-500 mb-4">Zielony obszar wyznacza prawidłowy zakres normy laboratoryjnej (30 - 100 ng/ml).</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[0, 120]} stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <ReferenceArea y1={30} y2={100} fill="#10b981" fillOpacity={0.1} />
                <Line type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filtry i Tabela */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Kategoria:</span>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full transition ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white font-medium"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">Nazwa Badania</th>
                <th className="p-4">Wynik</th>
                <th className="p-4">Norma Lab.</th>
                <th className="p-4">Status</th>
                <th className="p-4">Data Badania</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredResults.map((item) => {
                const abnormal = isOutOfRange(item.value, item.minNorm, item.maxNorm);
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-slate-900">{item.name}</td>
                    <td className="p-4 font-bold">
                      {item.value} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      {item.minNorm} - {item.maxNorm} {item.unit}
                    </td>
                    <td className="p-4">
                      {abnormal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
                          Poza normą
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          W normie
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-500">{item.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}