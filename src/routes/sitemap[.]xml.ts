import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  sitemapStaticPaths,
  sitemapXML,
  sitemapPathForLocation,
  isSitemapRouteIncluded,
  type SitemapEntry,
} from "@/lib/sitemap";
import { rooms } from "@/data/rooms";

const BASE_URL = "https://resort-escape-engine.lovable.app";

export const Route = createFileRoute("/sitemap/xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const roomRouteId = "/stay/$slug";
        if (isSitemapRouteIncluded(router.routesById[roomRouteId])) {
          for (const room of rooms) {
            const location = router.buildLocation({
              to: "/stay/$slug",
              params: { slug: room.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, roomRouteId);
            if (path) entries.push({ path });
          }
        }

        if (entries.length === 0) {
          return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
