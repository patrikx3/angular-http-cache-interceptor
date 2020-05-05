import { CachingHeaders} from "./caching-headers.enum";
import { CachingStore } from "./caching-store.enum";

export interface HttpCacheConfig {
  behavior: CachingHeaders,
  store: CachingStore,
}
