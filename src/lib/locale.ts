export type LocalePrefix = "" | "/co";

type LocaleMeta = {
  prefix: LocalePrefix;
  htmlLang: string;
  ogLocale: string;
  hreflang: string;
};

const LOCALES: Record<LocalePrefix, LocaleMeta> = {
  "": {
    prefix: "",
    htmlLang: "es-MX",
    ogLocale: "es_MX",
    hreflang: "es-MX",
  },
  "/co": {
    prefix: "/co",
    htmlLang: "es-CO",
    ogLocale: "es_CO",
    hreflang: "es-CO",
  },
};

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = normalizePathname(pathname);

  if (normalized === "/co") return "/";
  if (normalized.startsWith("/co/")) return normalized.slice(3) || "/";

  return normalized;
}

export function getLocalePrefix(pathname: string): LocalePrefix {
  const normalized = normalizePathname(pathname);
  return normalized === "/co" || normalized.startsWith("/co/") ? "/co" : "";
}

export function getLocaleMeta(pathname: string) {
  const prefix = getLocalePrefix(pathname);
  const canonicalPath = stripLocalePrefix(pathname);

  return {
    ...LOCALES[prefix],
    canonicalPath,
    alternatePaths: Object.values(LOCALES).map((locale) => ({
      ...locale,
      path: localizePath(canonicalPath, locale.prefix),
    })),
  };
}

export function localizePath(path: string, pathnameOrPrefix = ""): string {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("javascript:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const prefix = pathnameOrPrefix === "/co" || pathnameOrPrefix === "" ? pathnameOrPrefix : getLocalePrefix(pathnameOrPrefix);
  const [pathWithoutHash, hash = ""] = path.split("#");
  const [pathname, search = ""] = pathWithoutHash.split("?");

  if (!pathname.startsWith("/")) {
    return path;
  }

  const normalizedPathname = stripLocalePrefix(pathname);
  const localizedPathname =
    prefix && normalizedPathname !== "/"
      ? `${prefix}${normalizedPathname}`
      : prefix && normalizedPathname === "/"
        ? `${prefix}/`
        : normalizedPathname;

  const resolvedSearch = search ? `?${search}` : "";
  const resolvedHash = hash ? `#${hash}` : "";

  return `${localizedPathname}${resolvedSearch}${resolvedHash}`;
}

export function localizeRedirect(path: string, pathname: string): string {
  return localizePath(path, getLocalePrefix(pathname));
}
