import { API_BASE_URL, API_KEY } from "@/api/config";

const DEFAULT_HEADERS = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json",
} as const;

// Builds the full URL for an API path (prepends base URL, normalizes slashes).
function buildUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return normalizedPath ? `${base}/${normalizedPath}` : base;
}

// Helper for all API calls, ensures x-api-key are sent on every request.
export function apiRequest(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const url = path.startsWith("http") ? path : buildUrl(path);
  return fetch(url, {
    next: { revalidate: 60 },
    ...init,
    headers: {
      ...DEFAULT_HEADERS,
      ...init?.headers,
    },
  });
}
