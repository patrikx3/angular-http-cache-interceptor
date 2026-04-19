import { InjectionToken } from "@angular/core";
import { HttpCacheConfig } from "./http-cache-config";

export const P3X_HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>(
  'P3X_HTTP_CACHE_CONFIG'
)
