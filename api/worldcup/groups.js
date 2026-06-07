import { proxyWorldCup } from "./_proxy.js";

export default async function handler(req, res) {
  await proxyWorldCup("groups", res);
}
