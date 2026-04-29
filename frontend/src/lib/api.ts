/**
 * API base URL for browser-side requests.
 * TODO(phase-9): add WebSocket URL helper next to this module.
 */
export function getPublicApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  return base.replace(/\/$/, "");
}

export type HealthResponse = {
  status: string;
  service: string;
  timestamp: string;
};

export type RootResponse = {
  service: string;
  version: string;
  phase: number;
  docs: string;
  health: string;
};

export async function fetchRoot(): Promise<RootResponse> {
  const res = await fetch(`${getPublicApiBaseUrl()}/`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API root failed: ${res.status}`);
  }
  return res.json() as Promise<RootResponse>;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${getPublicApiBaseUrl()}/health`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }
  return res.json() as Promise<HealthResponse>;
}
