import { spawn } from "node:child_process";

const port = 5173;
const server = spawn("node", ["server.mjs", String(port)], {
  cwd: new URL("../outputs/", import.meta.url),
  stdio: ["ignore", "pipe", "pipe"]
});

let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  output += chunk.toString();
});

try {
  await waitFor(() => output.includes(`http://127.0.0.1:${port}`), 5000);

  for (const path of ["/index.html", "/api/worldcup/groups"]) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
    const text = await response.text();
    if (!text.trim()) throw new Error(`${path} returned an empty body`);
    console.log(`${path} ok`);
  }
} finally {
  server.kill();
}

async function waitFor(check, timeoutMs) {
  const startedAt = Date.now();
  while (!check()) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`Server did not start. Output: ${output}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
