"use client";

import { useEffect, useState } from "react";

import {
  fetchHealth,
  fetchRoot,
  type HealthResponse,
  type RootResponse,
} from "@/lib/api";

export default function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [root, setRoot] = useState<RootResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [rootData, healthData] = await Promise.all([
          fetchRoot(),
          fetchHealth(),
        ]);
        if (!cancelled) {
          setRoot(rootData);
          setHealth(healthData);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-400/90">
          Phase 1 · Done
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Multi-Agent Financial Research Platform
        </h1>
        <p className="text-slate-400">
          Next.js talks to the FastAPI gateway. Postgres and Redis are in
          docker-compose for the next phases.
        </p>
      </header>

      {error && (
        <p className="rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
        <h2 className="text-lg font-medium text-slate-100">API</h2>
        <p className="mt-1 text-sm text-slate-500">
          Loaded from{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">/</code>
        </p>
        <div className="mt-4">
          {loading && <p className="text-slate-400">Loading…</p>}
          {root && (
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-slate-500">service</dt>
                <dd className="font-mono text-slate-200">{root.service}</dd>
              </div>
              <div>
                <dt className="text-slate-500">version</dt>
                <dd className="font-mono text-slate-300">{root.version}</dd>
              </div>
              <div>
                <dt className="text-slate-500">phase</dt>
                <dd className="font-mono text-slate-300">{root.phase}</dd>
              </div>
              <div className="sm:col-span-2 flex flex-wrap gap-3 pt-1">
                <a
                  className="text-sm text-emerald-400/90 underline-offset-2 hover:underline"
                  href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}${root.docs}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open docs
                </a>
                <a
                  className="text-sm text-emerald-400/90 underline-offset-2 hover:underline"
                  href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}${root.health}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Raw health JSON
                </a>
              </div>
            </dl>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
        <h2 className="text-lg font-medium text-slate-100">Backend health</h2>
        <p className="mt-1 text-sm text-slate-500">
          Fetched from{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
            {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}
            /health
          </code>
        </p>
        <div className="mt-4">
          {health && (
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">status</dt>
                <dd className="font-mono text-emerald-400">{health.status}</dd>
              </div>
              <div>
                <dt className="text-slate-500">service</dt>
                <dd className="font-mono text-slate-200">{health.service}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">timestamp</dt>
                <dd className="font-mono text-slate-300">{health.timestamp}</dd>
              </div>
            </dl>
          )}
        </div>
      </section>
    </main>
  );
}
