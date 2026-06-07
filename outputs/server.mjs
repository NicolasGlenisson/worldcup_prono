import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, normalize } from "node:path";

const root = new URL("./", import.meta.url);
const port = Number(process.argv[2] || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

const worldCupRoutes = {
  "/api/worldcup/games": "https://worldcup26.ir/get/games",
  "/api/worldcup/groups": "https://worldcup26.ir/get/groups",
  "/api/worldcup/teams": "https://worldcup26.ir/get/teams"
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    if (worldCupRoutes[url.pathname]) {
      await proxyJson(worldCupRoutes[url.pathname], res);
      return;
    }
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const safePath = normalize(pathname).replace(/^[/\\]+/, "").replace(/^(\.\.[/\\])+/, "");
    const fileUrl = new URL(safePath, root);
    const body = await readFile(fileUrl);
    res.writeHead(200, { "Content-Type": types[extname(fileUrl.pathname)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

async function proxyJson(targetUrl, res) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(targetUrl, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    const body = await response.text();
    res.writeHead(response.status, {
      "Content-Type": response.headers.get("content-type") || "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(body);
  } catch (error) {
    res.writeHead(502, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(JSON.stringify({ error: "World Cup API unavailable", detail: error.message }));
  } finally {
    clearTimeout(timer);
  }
}

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Le port ${port} est deja utilise. Essaie: node .\\server.mjs ${port + 1}`);
    process.exit(1);
  }
  throw error;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Pronos CDM: http://127.0.0.1:${port}`);
});
