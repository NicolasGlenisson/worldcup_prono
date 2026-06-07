const routes = {
  games: "https://worldcup26.ir/get/games",
  groups: "https://worldcup26.ir/get/groups",
  teams: "https://worldcup26.ir/get/teams"
};

export async function proxyWorldCup(kind, res) {
  const targetUrl = routes[kind];
  if (!targetUrl) {
    res.status(404).json({ error: "Unknown World Cup route" });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(targetUrl, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    const body = await response.text();
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(response.status).send(body);
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    res.status(502).json({ error: "World Cup API unavailable", detail: error.message });
  } finally {
    clearTimeout(timer);
  }
}
