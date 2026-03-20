const RAW_STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
const CACHE_TTL_MS = 60_000;
const DISK_CACHE_DIR = join(process.cwd(), ".cache", "strapi");
const responseCache = new Map<string, { expiresAt: number; value: unknown }>();
const inFlightRequests = new Map<string, Promise<unknown>>();

function normalizeStrapiBaseUrl(rawUrl: string) {
  const trimmed = (rawUrl || "").replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const STRAPI_URL = normalizeStrapiBaseUrl(RAW_STRAPI_URL);

function cachePathForUrl(requestUrl: string) {
  const key = createHash("sha1").update(requestUrl).digest("hex");
  return join(DISK_CACHE_DIR, `${key}.json`);
}

async function readDiskCache(requestUrl: string) {
  try {
    const raw = await readFile(cachePathForUrl(requestUrl), "utf8");
    const parsed = JSON.parse(raw) as { expiresAt?: number; value?: unknown };
    if (!parsed?.expiresAt || parsed.expiresAt <= Date.now()) return null;
    return parsed.value;
  } catch {
    return null;
  }
}

async function writeDiskCache(requestUrl: string, value: unknown) {
  try {
    await mkdir(DISK_CACHE_DIR, { recursive: true });
    await writeFile(
      cachePathForUrl(requestUrl),
      JSON.stringify({ expiresAt: Date.now() + CACHE_TTL_MS, value }),
      "utf8",
    );
  } catch {
    // noop: disk cache is best-effort only
  }
}

export async function strapiFetch(path: string) {
  const requestUrl = `${STRAPI_URL}${path}`;
  const now = Date.now();
  const cacheEntry = responseCache.get(requestUrl);

  if (cacheEntry && cacheEntry.expiresAt > now) {
    return cacheEntry.value;
  }

  const diskCached = await readDiskCache(requestUrl);
  if (diskCached) {
    responseCache.set(requestUrl, { value: diskCached, expiresAt: Date.now() + CACHE_TTL_MS });
    return diskCached;
  }

  const pendingRequest = inFlightRequests.get(requestUrl);
  if (pendingRequest) {
    return pendingRequest;
  }

  const fetchPromise = fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Strapi error ${res.status}: ${error}`);
      }
      return res.json();
    })
    .then(async (data) => {
      responseCache.set(requestUrl, { value: data, expiresAt: Date.now() + CACHE_TTL_MS });
      await writeDiskCache(requestUrl, data);
      return data;
    })
    .finally(() => {
      inFlightRequests.delete(requestUrl);
    });

  inFlightRequests.set(requestUrl, fetchPromise);
  return fetchPromise;
}
