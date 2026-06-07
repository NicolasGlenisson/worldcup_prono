import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, normalize } from "node:path";

const root = new URL("../outputs/", import.meta.url);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
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

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();

try {
  for (const path of ["/", "/styles.css", "/app.js", "/manifest.webmanifest", "/sw.js", "/icon.svg", "/server.mjs"]) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
    await response.text();
    console.log(`${path} ok`);
  }
} finally {
  server.close();
}
