const WORLD_CUP_API = {
  games: "./api/worldcup/games",
  groups: "./api/worldcup/groups",
  teams: "./api/worldcup/teams"
};

const WORLD_CUP_REMOTE_API = {
  games: "https://worldcup26.ir/get/games",
  groups: "https://worldcup26.ir/get/groups",
  teams: "https://worldcup26.ir/get/teams"
};

const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
];
const OPENFOOTBALL_FIXTURES =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";
const INTERNATIONAL_RESULTS_URL =
  "https://raw.githubusercontent.com/martj42/international_results/master/results.csv";
const INTERNATIONAL_RESULTS_SIZE_LABEL = "3,55 Mio";
const FIFA_RANKINGS = window.FIFA_RANKINGS || { teams: {} };
const FORM_WINDOW = 5;
const FRANCE_TIME_ZONE = "Europe/Paris";
const HOST_CITY_TIME_ZONES = {
  "atlanta": "America/New_York",
  "boston": "America/New_York",
  "dallas": "America/Chicago",
  "east rutherford": "America/New_York",
  "guadalajara": "America/Mexico_City",
  "houston": "America/Chicago",
  "kansas city": "America/Chicago",
  "los angeles": "America/Los_Angeles",
  "mexico city": "America/Mexico_City",
  "miami": "America/New_York",
  "monterrey": "America/Mexico_City",
  "new york": "America/New_York",
  "philadelphia": "America/New_York",
  "san francisco": "America/Los_Angeles",
  "santa clara": "America/Los_Angeles",
  "seattle": "America/Los_Angeles",
  "toronto": "America/Toronto",
  "vancouver": "America/Vancouver"
};
const STADIUM_TIME_ZONES = {
  "1": "America/Mexico_City",
  "2": "America/Mexico_City",
  "3": "America/Mexico_City",
  "4": "America/Chicago",
  "5": "America/Chicago",
  "6": "America/Chicago",
  "7": "America/New_York",
  "8": "America/New_York",
  "9": "America/New_York",
  "10": "America/New_York",
  "11": "America/New_York",
  "12": "America/Toronto",
  "13": "America/Vancouver",
  "14": "America/Los_Angeles",
  "15": "America/Los_Angeles",
  "16": "America/Los_Angeles"
};

const STORAGE_KEYS = {
  settings: "cdm_pronos_settings_v1",
  predictions: "cdm_pronos_predictions_v1",
  algoPredictions: "cdm_pronos_algo_predictions_v1",
  cache: "cdm_pronos_match_cache_v5"
};
const LEGACY_STORAGE_KEYS = ["cdm_pronos_match_cache_v1", "cdm_pronos_match_cache_v2", "cdm_pronos_match_cache_v3", "cdm_pronos_match_cache_v4"];

const GLOBAL_RESULTS_CACHE = {
  dbName: "cdm_pronos_large_cache_v1",
  storeName: "files",
  key: "international_results_csv"
};

const DEFAULT_PROMPT = `Agis comme un analyste football spécialisé dans les pronostics de scores.

Objectif: prédire le score probable du match fourni pour la Coupe du Monde 2026.

Méthode obligatoire:
1. Recherche les résultats récents des deux équipes, idéalement les 5 à 10 derniers matchs, avec des sources fiables comme FIFA, ESPN, Soccerway, Transfermarkt, Flashscore, Matchendirect ou sites sportifs reconnus.
2. Analyse les victoires, nuls, défaites, buts marqués, buts encaissés, forme offensive/défensive, niveau des adversaires, domicile/extérieur ou terrain neutre, confrontations directes, absences importantes, suspensions, incertitudes, changement d'entraîneur, fatigue, calendrier et actualité récente.
3. Ne te base pas uniquement sur le classement FIFA. Utilise-le seulement comme indicateur secondaire.
4. Cite clairement les sources utilisées avec liens.
5. Donne une prédiction exploitable par l'application.

Format obligatoire:
Réponds uniquement avec un JSON valide, sans markdown, sans bloc de code, sans texte autour.
Avant de répondre, vérifie mentalement que ta réponse passerait dans JSON.parse().
Règles strictes:
- Utilise uniquement des guillemets doubles pour les clés et les chaînes.
- N'ajoute aucun commentaire, aucune virgule finale, aucun texte avant ou après le JSON.
- Retourne le JSON sur une seule ligne si possible.
- Ne mets jamais de retour à la ligne dans une valeur texte. Toutes les chaînes doivent être sur une seule ligne.
- N'utilise pas de commentaire JSON ou JavaScript comme //, /* */, #.
- Les nombres doivent être des nombres JSON, pas des chaînes.
- Si une information est inconnue ou non confirmée, écris "Non confirmé".
- "confidence.qualitative_probability" doit être exactement une de ces valeurs: "faible", "moyenne", "forte".
- "analysis.main_risks" doit contenir 3 éléments maximum.
- "sources" doit contenir 8 éléments maximum, uniquement des sources réellement consultées avec une URL valide. Si tu n'as pas de source fiable, retourne [].

Le JSON doit suivre exactement ce modèle:
{
  "match": {
    "team_a": "Équipe A",
    "team_b": "Équipe B",
    "competition": "Coupe du Monde 2026",
    "date": "date du match"
  },
  "predicted_score": {
    "team_a_goals": 1,
    "team_b_goals": 0,
    "label": "Équipe A 1 - 0 Équipe B"
  },
  "alternative_score": {
    "team_a_goals": 1,
    "team_b_goals": 1,
    "label": "Équipe A 1 - 1 Équipe B"
  },
  "confidence": {
    "score_out_of_10": 6,
    "qualitative_probability": "moyenne",
    "summary": "Phrase courte expliquant le niveau de confiance."
  },
  "analysis": {
    "context_summary": "Résumé rapide du contexte.",
    "team_a_recent_form": {
      "summary": "Forme récente de l'équipe A.",
      "record": "3V 1N 1D",
      "goals_for": 8,
      "goals_against": 4,
      "notable_results": ["Équipe A 2 - 0 Adversaire"]
    },
    "team_b_recent_form": {
      "summary": "Forme récente de l'équipe B.",
      "record": "2V 2N 1D",
      "goals_for": 6,
      "goals_against": 5,
      "notable_results": ["Équipe B 1 - 1 Adversaire"]
    },
    "offensive_defensive_comparison": "Comparaison offensive et défensive.",
    "head_to_head": "Confrontations directes récentes.",
    "absences_and_news": "Blessures, suspensions, incertitudes et actualités.",
    "tactical_reading": "Lecture tactique probable.",
    "main_risks": ["Risque principal qui peut invalider le prono"]
  },
  "sources": [
    {
      "title": "Nom de la source",
      "url": "https://exemple.com",
      "used_for": "Forme récente / absences / confrontation"
    }
  ]
}`;

const DEFAULT_SETTINGS = {
  customPrompt: DEFAULT_PROMPT
};

const TEAM_NAME_ALIASES = new Map([
  ["south korea", "korea republic"],
  ["korea republic", "korea republic"],
  ["united states", "united states"],
  ["usa", "united states"],
  ["czech republic", "czech republic"],
  ["czechia", "czech republic"],
  ["ivory coast", "cote d ivoire"],
  ["côte d’ivoire", "cote d ivoire"],
  ["cote d ivoire", "cote d ivoire"],
  ["bosnia and herzegovina", "bosnia and herzegovina"],
  ["rd congo", "dr congo"],
  ["dr congo", "dr congo"],
  ["congo dr", "dr congo"],
  ["congo d r", "dr congo"],
  ["congo democratic republic", "dr congo"],
  ["democratic republic congo", "dr congo"],
  ["democratic republic of congo", "dr congo"],
  ["democratic republic of the congo", "dr congo"],
  ["the democratic republic of congo", "dr congo"],
  ["the democratic republic of the congo", "dr congo"],
  ["dem rep congo", "dr congo"],
  ["d r congo", "dr congo"],
  ["drc", "dr congo"],
  ["republique democratique du congo", "dr congo"],
  ["rep dem congo", "dr congo"],
  ["iran", "iran"],
  ["ir iran", "iran"],
  ["uae", "united arab emirates"],
  ["united arab emirates", "united arab emirates"]
]);

const state = {
  matches: [],
  globalMatches: [],
  globalStatsStatus: "loading",
  globalLastSync: null,
  groups: [],
  teams: [],
  source: "loading",
  lastSync: null,
  settings: readJson(STORAGE_KEYS.settings, DEFAULT_SETTINGS),
  predictions: readJson(STORAGE_KEYS.predictions, {}),
  predictionDraft: null,
  algoPredictionCache: new Map(),
  globalMatchesByTeam: new Map(),
  selectedMatchId: null,
  currentView: "matchesView"
};

if (
  !state.settings.customPrompt ||
  state.settings.customPrompt.startsWith("Tu es un analyste football prudent") ||
  (state.settings.customPrompt.startsWith("Agis comme un analyste football") &&
    !state.settings.customPrompt.includes("JSON.parse()"))
) {
  state.settings.customPrompt = DEFAULT_PROMPT;
  writeJson(STORAGE_KEYS.settings, state.settings);
}

const els = {
  refreshButton: document.querySelector("#refreshButton"),
  sourceLabel: document.querySelector("#sourceLabel"),
  lastSyncLabel: document.querySelector("#lastSyncLabel"),
  statusDot: document.querySelector(".status-dot"),
  matchFilter: document.querySelector("#matchFilter"),
  matchList: document.querySelector("#matchList"),
  statsGrid: document.querySelector("#statsGrid"),
  groupsList: document.querySelector("#groupsList"),
  settingsForm: document.querySelector("#settingsForm"),
  customPrompt: document.querySelector("#customPrompt"),
  clearPredictionsButton: document.querySelector("#clearPredictionsButton"),
  refreshGlobalStatsButton: document.querySelector("#refreshGlobalStatsButton"),
  globalStatsInfo: document.querySelector("#globalStatsInfo"),
  matchBackButton: document.querySelector("#matchBackButton"),
  matchPageStage: document.querySelector("#matchPageStage"),
  matchPageTitle: document.querySelector("#matchPageTitle"),
  matchPageBody: document.querySelector("#matchPageBody"),
  groupBackButton: document.querySelector("#groupBackButton"),
  groupPageTitle: document.querySelector("#groupPageTitle"),
  groupPageBody: document.querySelector("#groupPageBody"),
  toast: document.querySelector("#toast")
};

boot();

function boot() {
  clearLegacyMatchCaches();
  bindEvents();
  hydrateSettingsForm();
  render();
  handleRoute();
  loadTournamentData();
  hydrateGlobalResultsFromCache();
  registerServiceWorker();
}

function clearLegacyMatchCaches() {
  LEGACY_STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Impossible de nettoyer l'ancien cache match", error);
    }
  });
  localStorage.removeItem(STORAGE_KEYS.algoPredictions);
}

function bindEvents() {
  els.refreshButton.addEventListener("click", () => loadTournamentData({ force: true }));
  els.refreshGlobalStatsButton.addEventListener("click", () => loadGlobalResults({ force: true }));
  els.matchFilter.addEventListener("change", renderMatches);
  els.matchBackButton.addEventListener("click", () => goBack("matchesView"));
  els.groupBackButton.addEventListener("click", () => goBack("statsView"));
  window.addEventListener("hashchange", handleRoute);
  document.addEventListener("click", closeInfoPopovers);

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => navigateToView(button.dataset.view));
  });

  els.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.settings = {
      customPrompt: els.customPrompt.value.trim() || DEFAULT_PROMPT
    };
    writeJson(STORAGE_KEYS.settings, state.settings);
    toast("Réglages enregistrés.");
    render();
  });

  els.clearPredictionsButton.addEventListener("click", () => {
    state.predictions = {};
    state.algoPredictionCache.clear();
    writeJson(STORAGE_KEYS.predictions, state.predictions);
    localStorage.removeItem(STORAGE_KEYS.algoPredictions);
    render();
    if (state.selectedMatchId) renderMatchPage(state.selectedMatchId);
    toast("Pronos supprimés.");
  });
}

async function loadTournamentData({ force = false } = {}) {
  setSourceState("loading", "Chargement des matchs", "--");

  if (!force) {
    const cached = readJson(STORAGE_KEYS.cache, null);
    if (cached?.matches?.length) {
      state.matches = cached.matches.map(normalizeCachedMatch);
      state.groups = cached.groups || [];
      state.teams = cached.teams || [];
      state.source = cached.source || "cache";
      state.lastSync = cached.lastSync || null;
      render();
    }
  }

  try {
    const [gamesResult, groupsResult, teamsResult] = await Promise.all([
      fetchWorldCupApi(WORLD_CUP_API.games, WORLD_CUP_REMOTE_API.games),
      fetchWorldCupApi(WORLD_CUP_API.groups, WORLD_CUP_REMOTE_API.groups).catch(() => ({ data: [], proxied: false })),
      fetchWorldCupApi(WORLD_CUP_API.teams, WORLD_CUP_REMOTE_API.teams).catch(() => ({ data: [], proxied: false }))
    ]);

    state.teams = normalizeTeams(teamsResult.data);
    const teamLookup = buildTeamLookup(state.teams);
    state.matches = normalizeWorldCup26Matches(gamesResult.data, teamLookup);
    state.groups = normalizeGroups(groupsResult.data, teamLookup);
    state.source = [gamesResult, groupsResult, teamsResult].some((result) => result.proxied)
      ? "worldcup26.ir via proxy public"
      : "worldcup26.ir";
    state.lastSync = new Date().toISOString();
    persistCache();
    render();
  } catch (primaryError) {
    try {
      const fallbackRaw = await fetchJson(OPENFOOTBALL_FIXTURES);
      state.matches = normalizeOpenFootballMatches(fallbackRaw);
      state.groups = [];
      state.teams = [];
      state.source = "openfootball";
      state.lastSync = new Date().toISOString();
      persistCache();
      render();
      toast("API live indisponible. Planning de secours chargé.");
    } catch (fallbackError) {
      state.source = "error";
      render();
      toast("Impossible de charger les matchs pour le moment.");
    }
  }
}

function parseInternationalResults(csv) {
  const lines = csv.trim().split(/\r?\n/);
  const rows = lines.slice(1);
  return rows.map((line, index) => {
    const [date, homeTeam, awayTeam, homeScore, awayScore, tournament, city, country, neutral] = parseCsvLine(line);
    return {
      id: `global-${index}`,
      homeTeamId: "",
      awayTeamId: "",
      homeName: cleanName(homeTeam),
      awayName: cleanName(awayTeam),
      homeScore: firstNumber(homeScore),
      awayScore: firstNumber(awayScore),
      date: parseMatchDate(date),
      rawDate: date,
      stage: tournament || "International",
      tournament: tournament || "International",
      group: "",
      venue: [city, country].filter(Boolean).join(", "),
      neutral: String(neutral).toLowerCase() === "true",
      status: "finished",
      raw: { date, homeTeam, awayTeam, homeScore, awayScore, tournament, city, country, neutral }
    };
  }).filter((match) => match.date && match.homeName && match.awayName && match.homeScore !== null && match.awayScore !== null);
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

async function hydrateGlobalResultsFromCache() {
  try {
    const cached = await readGlobalResultsCache();
    if (cached?.csv) {
      state.globalMatches = parseInternationalResults(cached.csv);
      state.globalLastSync = cached.lastSync || null;
      state.globalStatsStatus = "ready";
      rebuildGlobalMatchesIndex();
    } else {
      state.globalMatches = [];
      state.globalLastSync = null;
      state.globalStatsStatus = "empty";
      rebuildGlobalMatchesIndex();
    }
  } catch {
    state.globalMatches = [];
    state.globalLastSync = null;
    state.globalStatsStatus = "empty";
    rebuildGlobalMatchesIndex();
  }
  render();
}

async function loadGlobalResults({ silent = false } = {}) {
  state.globalStatsStatus = "loading";
  render();

  try {
    const response = await fetchWithTimeout(INTERNATIONAL_RESULTS_URL, {}, 12000);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const csv = await response.text();
    state.globalMatches = parseInternationalResults(csv);
    rebuildGlobalMatchesIndex();
    state.globalStatsStatus = "ready";
    state.globalLastSync = new Date().toISOString();
    render();

    try {
      await writeGlobalResultsCache({ csv, lastSync: state.globalLastSync });
      toast("Stats globales actualisées.");
    } catch {
      toast("Stats globales actualisées pour cette session. Cache local impossible.");
    }
  } catch (error) {
    state.globalStatsStatus = state.globalMatches.length ? "ready" : "error";
    render();
    if (!silent) toast("Stats globales indisponibles pour le moment.");
  }
}

async function fetchJson(url) {
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function fetchWorldCupApi(localUrl, remoteUrl) {
  try {
    return { data: await fetchJson(localUrl), proxied: false };
  } catch (localError) {
    let lastError = localError;
    for (const buildProxyUrl of CORS_PROXIES) {
      try {
        return { data: await fetchJson(buildProxyUrl(remoteUrl)), proxied: true };
      } catch (proxyError) {
        lastError = proxyError;
      }
    }
    throw lastError;
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { cache: "no-store", ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

function normalizeWorldCup26Matches(raw, teamLookup = new Map()) {
  const items = extractArray(raw);
  return items.map((item, index) => {
    const home = item.home || item.home_team || item.team1 || item.team_1 || item.localteam || item.host || {};
    const away = item.away || item.away_team || item.team2 || item.team_2 || item.visitorteam || item.guest || {};
    const homeName = cleanName(
      home.name ||
      home.en ||
      home.title ||
      item.home_team_name_en ||
      item.home_name ||
      item.team1_name ||
      item.homeTeam ||
      item.team1 ||
      teamLookup.get(String(item.home_team_id))
    );
    const awayName = cleanName(
      away.name ||
      away.en ||
      away.title ||
      item.away_team_name_en ||
      item.away_name ||
      item.team2_name ||
      item.awayTeam ||
      item.team2 ||
      teamLookup.get(String(item.away_team_id))
    );
    const score = readScore(item, home, away);
    const dateValue = item.datetime || item.date_time || item.kickoff || item.start_at || item.startTime || item.date;
    const localDateValue = item.local_date || item.localDate;
    const timeValue = item.time || item.hour || item.match_time;
    const sourceTimeZone = getMatchSourceTimeZone(item, homeName, awayName);
    const preferredDateValue = dateValue || localDateValue;
    const date = parseMatchDate(preferredDateValue, timeValue, sourceTimeZone);
    const statusText = [item.status, item.state, item.match_status, item.finished, item.time_elapsed].filter(Boolean).join(" ");
    const status = normalizeStatus(statusText, score, date);
    const id = String(item.id || item.match_id || item.game_id || item.number || item.matchNumber || stableId(homeName, awayName, date, index));

    return {
      id,
      homeTeamId: item.home_team_id || home.id || "",
      awayTeamId: item.away_team_id || away.id || "",
      homeName: homeName || "Équipe à confirmer",
      awayName: awayName || "Équipe à confirmer",
      homeScore: score.home,
      awayScore: score.away,
      date,
      rawDate: String(preferredDateValue || localDateValue || ""),
      stage: item.stage || item.round || item.phase || item.group || item.group_name || "Coupe du Monde",
      group: item.group || item.group_name || item.pool || "",
      venue: readVenue(item),
      status,
      raw: item
    };
  }).sort(sortMatches);
}

function normalizeOpenFootballMatches(raw) {
  const items = extractArray(raw.matches || raw);
  return items.map((item, index) => {
    const date = parseMatchDate(item.date, item.time);
    const score = readScore(item, {}, {});
    return {
      id: String(item.num || item.id || stableId(item.team1, item.team2, date, index)),
      homeTeamId: cleanName(item.team1),
      awayTeamId: cleanName(item.team2),
      homeName: cleanName(item.team1) || "Équipe à confirmer",
      awayName: cleanName(item.team2) || "Équipe à confirmer",
      homeScore: score.home,
      awayScore: score.away,
      date,
      rawDate: [item.date, item.time].filter(Boolean).join(" "),
      stage: item.round || item.stage || "Coupe du Monde",
      group: item.group || "",
      venue: item.ground || item.stadium || "",
      status: normalizeStatus(item.status, score, date),
      raw: item
    };
  }).sort(sortMatches);
}

function normalizeCachedMatch(match) {
  return { ...match, date: match.date || null };
}

function normalizeGroups(raw, teamLookup = new Map()) {
  return extractArray(raw)
    .map((group, index) => ({
      id: group.id || group.group_id || group.name || group.title || index,
      name: group.name || group.title || group.group || group.group_name || `Groupe ${index + 1}`,
      teams: extractArray(group.teams || group.standings || group.table || group.items)
        .map((team) => ({
          id: String(team.team_id || team.id || ""),
          name: cleanName(team.name || team.team || team.title || team.en || teamLookup.get(String(team.team_id))),
          played: numberOrDash(team.played || team.p || team.matches_played || team.mp),
          won: numberOrDash(team.won || team.w),
          drawn: numberOrDash(team.drawn || team.d),
          lost: numberOrDash(team.lost || team.l),
          points: numberOrDash(team.points || team.pts),
          goalsFor: numberOrDash(team.goals_for || team.gf),
          goalsAgainst: numberOrDash(team.goals_against || team.ga),
          goalDiff: numberOrDash(team.goal_difference || team.gd || team.diff)
        }))
        .sort(sortGroupTeams)
    }))
    .sort((a, b) => normalizeGroupName(a.name).localeCompare(normalizeGroupName(b.name), "fr", { numeric: true }));
}

function normalizeTeams(raw) {
  return extractArray(raw).map((team) => ({
    id: team.id || team.team_id || team.name || team.title,
    name: cleanName(team.name || team.title || team.en || team.name_en),
    group: team.group || team.group_name || ""
  }));
}

function buildTeamLookup(teams) {
  return new Map(teams.filter((team) => team.id && team.name).map((team) => [String(team.id), team.name]));
}

function readScore(item, home, away) {
  const nested = item.score || item.result || {};
  return {
    home: firstNumber(
      item.home_score,
      item.team1_score,
      item.score1,
      item.goals_home,
      home.score,
      nested.home,
      nested.team1
    ),
    away: firstNumber(
      item.away_score,
      item.team2_score,
      item.score2,
      item.goals_away,
      away.score,
      nested.away,
      nested.team2
    )
  };
}

function readVenue(item) {
  const stadium = item.stadium || item.venue || item.location || item.ground || {};
  if (typeof stadium === "string") return stadium;
  return [stadium.name || stadium.title, stadium.city || item.city].filter(Boolean).join(", ");
}

function getMatchSourceTimeZone(item, homeName = "", awayName = "") {
  const explicit = item.timezone || item.time_zone || item.tz;
  if (explicit) return String(explicit);
  const stadiumId = String(item.stadium_id || item.stadiumId || item.venue_id || item.venueId || "");
  if (STADIUM_TIME_ZONES[stadiumId]) return STADIUM_TIME_ZONES[stadiumId];

  const matchNumber = String(item.id || item.match_id || item.game_id || item.number || item.matchNumber || "");
  const matchup = `${normalizeName(homeName)} ${normalizeName(awayName)}`;
  if (matchNumber === "1" || (matchup.includes("mexico") && matchup.includes("south africa"))) {
    return "America/Mexico_City";
  }

  const stadium = item.stadium || item.venue || item.location || item.ground || {};
  const candidates = [
    item.city,
    item.host_city,
    item.venue_city,
    typeof stadium === "object" ? stadium.city : "",
    typeof stadium === "string" ? stadium : "",
    item.country,
    item.host_country
  ].filter(Boolean).map((value) => cleanName(value).toLowerCase());

  for (const candidate of candidates) {
    for (const [city, timeZone] of Object.entries(HOST_CITY_TIME_ZONES)) {
      if (candidate.includes(city)) return timeZone;
    }
  }
  if (candidates.some((candidate) => candidate.includes("mexico"))) return "America/Mexico_City";
  if (candidates.some((candidate) => candidate.includes("canada"))) return "America/Toronto";
  return "";
}

function parseMatchDate(dateValue, timeValue, sourceTimeZone = "") {
  if (!dateValue) return null;

  const text = [dateValue, timeValue].filter(Boolean).join(" ").trim();
  const withoutUtcOffset = text.replace(/UTC([+-]\d{1,2})/i, (_, offset) => {
    const sign = offset.startsWith("-") ? "-" : "+";
    const hour = offset.replace(/[+-]/, "").padStart(2, "0");
    return `${sign}${hour}:00`;
  });
  if (hasExplicitTimeZone(withoutUtcOffset)) {
    const direct = new Date(withoutUtcOffset);
    if (!Number.isNaN(direct.getTime())) return direct.toISOString();
  }

  if (sourceTimeZone && hasClockTime(withoutUtcOffset)) {
    const localParts = parseLocalDateTimeParts(withoutUtcOffset);
    if (localParts) return zonedTimeToUtc(localParts, sourceTimeZone).toISOString();
  }

  const direct = new Date(dateValue);
  if (!Number.isNaN(direct.getTime())) return direct.toISOString();

  const parsed = new Date(withoutUtcOffset);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function hasExplicitTimeZone(value) {
  return /(?:z|[+-]\d{2}:?\d{2})$/i.test(String(value).trim());
}

function hasClockTime(value) {
  return /\b\d{1,2}:\d{2}\b/.test(String(value));
}

function parseLocalDateTimeParts(value) {
  const text = String(value).trim();
  const isoMatch = text.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (isoMatch) {
    return {
      year: Number(isoMatch[1]),
      month: Number(isoMatch[2]),
      day: Number(isoMatch[3]),
      hour: Number(isoMatch[4] || 0),
      minute: Number(isoMatch[5] || 0),
      second: Number(isoMatch[6] || 0)
    };
  }

  const usMatch = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[T\s]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (!usMatch) return null;
  return {
    year: Number(usMatch[3]),
    month: Number(usMatch[1]),
    day: Number(usMatch[2]),
    hour: Number(usMatch[4] || 0),
    minute: Number(usMatch[5] || 0),
    second: Number(usMatch[6] || 0)
  };
}

function zonedTimeToUtc(parts, timeZone) {
  let utc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const zoned = getDateTimePartsInZone(new Date(utc), timeZone);
    const delta = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)
      - Date.UTC(zoned.year, zoned.month - 1, zoned.day, zoned.hour, zoned.minute, zoned.second);
    if (delta === 0) break;
    utc += delta;
  }
  return new Date(utc);
}

function getDateTimePartsInZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, Number(part.value)]));
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second
  };
}

function normalizeStatus(rawStatus, score, date) {
  const raw = String(rawStatus || "").toLowerCase();
  if (raw.includes("notstarted") || raw.includes("not started")) return "upcoming";
  if (raw.includes("live") || raw.includes("playing") || raw.includes("progress")) return "live";
  if (raw.includes("true") || raw.includes("finish") || raw.includes("ended") || raw.includes("full") || raw.includes("played")) return "finished";
  if (/\b([1-9]\d?|1[01]\d|120)\b/.test(raw)) return "live";
  if (raw.includes("false")) return "upcoming";
  if (score.home !== null && score.away !== null) return "finished";
  if (date && new Date(date) < new Date()) return "finished";
  return "upcoming";
}

function render() {
  renderStatus();
  renderMatches();
  renderStats();
  hydrateSettingsForm();
  if (state.currentView === "matchView" && state.selectedMatchId) {
    renderMatchPage(state.selectedMatchId);
  }
  if (state.currentView === "groupView") {
    const groupId = getRouteValue("group");
    if (groupId) renderGroupPage(decodeURIComponent(groupId));
  }
}

function renderStatus() {
  const labels = {
    loading: "Chargement des matchs",
    "worldcup26.ir": "Données live: worldcup26.ir",
    "worldcup26.ir via proxy public": "Données live: worldcup26.ir via proxy public",
    openfootball: "Planning de secours: OpenFootball",
    cache: "Données en cache",
    error: "Données indisponibles"
  };
  els.sourceLabel.textContent = labels[state.source] || "Données chargées";
  els.lastSyncLabel.textContent = state.lastSync ? formatDateTime(state.lastSync) : "--";
  els.statusDot.className = "status-dot";
  if (state.source === "worldcup26.ir") els.statusDot.classList.add("online");
  if (state.source === "error") els.statusDot.classList.add("error");
}

function renderMatches() {
  const filter = els.matchFilter.value;
  const matches = state.matches.filter((match) => {
    if (filter === "all") return true;
    if (filter === "predicted") return Boolean(state.predictions[match.id]);
    return match.status === filter;
  });

  if (!matches.length) {
    els.matchList.innerHTML = `<div class="empty-state">Aucun match à afficher pour ce filtre.</div>`;
    return;
  }

  els.matchList.innerHTML = matches.map(renderMatchCard).join("");
  els.matchList.querySelectorAll(".match-card").forEach((card) => {
    card.addEventListener("click", () => navigateToMatch(card.dataset.matchId));
  });
}

function renderMatchCard(match) {
  const prediction = state.predictions[match.id];
  const statusBadge = renderStatusBadge(match.status);

  return `
    <button class="match-card" type="button" data-match-id="${escapeAttr(match.id)}">
      <div class="match-meta">
        <span>${escapeHtml(formatMatchStageLabel(match))}</span>
        ${statusBadge}
      </div>
      ${renderMatchScoreLine(match)}
      ${renderMatchCardPredictions(match, prediction)}
      <div class="match-footer">
        <span>${escapeHtml(formatMatchDate(match))}</span>
        ${prediction ? `<span class="badge gold">IA ${formatShortDate(prediction.generatedAt)}</span>` : ""}
      </div>
    </button>
  `;
}

function renderMatchCardPredictions(match, prediction) {
  const algo = getMatchCardAlgoPrediction(match);
  const iaScore = getPredictionScore(prediction);
  const iaLabel = iaScore ? `${iaScore.home} - ${iaScore.away}` : prediction ? "À lire" : "Sans IA";
  const algoLabel = algo ? `${algo.homeGoals} - ${algo.awayGoals}` : "Indispo";

  return `
    <div class="match-card-pronos">
      <span class="match-card-prono ${algo ? "has-score" : "muted"}"><strong>Algo</strong> ${escapeHtml(algoLabel)}</span>
      <span class="match-card-prono ${prediction ? "has-score" : "muted"}"><strong>IA</strong> ${escapeHtml(iaLabel)}</span>
    </div>
  `;
}

function getMatchCardAlgoPrediction(match) {
  if (state.globalStatsStatus !== "ready") return null;
  const cacheKey = `${match.id}:${match.date || ""}:${state.globalMatches.length}:${state.globalLastSync || ""}`;
  if (state.algoPredictionCache.has(cacheKey)) return state.algoPredictionCache.get(cacheKey);
  const scope = buildFastGlobalStatsScope(match);
  const algo = buildAlgorithmicPrediction(scope);
  state.algoPredictionCache.set(cacheKey, algo);
  return algo;
}

function buildFastGlobalStatsScope(match) {
  const homeMatches = getIndexedHistoricalMatchesBefore(match.homeName, match.date);
  const awayMatches = getIndexedHistoricalMatchesBefore(match.awayName, match.date);
  return {
    title: "Tout compris",
    note: buildStatsCutoffNote("Stats calculées depuis l'historique public des matchs internationaux.", match.date),
    home: buildTeamStats(match.homeName, teamKey("", match.homeName), homeMatches, { averageWindow: FORM_WINDOW, summaryWindow: FORM_WINDOW, displayWindow: FORM_WINDOW }),
    away: buildTeamStats(match.awayName, teamKey("", match.awayName), awayMatches, { averageWindow: FORM_WINDOW, summaryWindow: FORM_WINDOW, displayWindow: FORM_WINDOW }),
    headToHead: { played: 0, homeWins: 0, draws: 0, awayWins: 0, goals: 0, avgGoals: 0, latest: [] },
    groupRows: [],
    finishedCount: state.globalMatches.length,
    headToHeadCount: 0,
    status: state.globalStatsStatus
  };
}

function renderMatchScoreLine(match) {
  return `
    <div class="scoreline flat-scoreline">
      <span class="score-team home">${escapeHtml(match.homeName)}</span>
      <span class="flat-score">${scoreText(match.homeScore)} - ${scoreText(match.awayScore)}</span>
      <span class="score-team away">${escapeHtml(match.awayName)}</span>
    </div>
  `;
}

function formatMatchScoreLabel(match) {
  return `${match.homeName} ${scoreText(match.homeScore)} - ${scoreText(match.awayScore)} ${match.awayName}`;
}

function renderStats() {
  const total = state.matches.length;
  const finished = state.matches.filter((match) => match.status === "finished").length;
  const upcoming = state.matches.filter((match) => match.status === "upcoming").length;
  const predicted = Object.keys(state.predictions).length;

  els.statsGrid.innerHTML = [
    ["Matchs", total],
    ["Terminés", finished],
    ["À venir", upcoming],
    ["Pronos", predicted]
  ]
    .map(([label, value]) => `
      <div class="stat-card">
        <p class="eyebrow">${label}</p>
        <p class="stat-value">${value}</p>
      </div>
    `)
    .join("");

  if (!state.groups.length) {
    const teamCount = state.teams.length;
    els.groupsList.innerHTML = `
      <div class="empty-state">
        ${teamCount ? `${teamCount} équipes chargées. ` : ""}Les classements détaillés ne sont pas disponibles avec la source actuelle.
      </div>
    `;
    return;
  }

  els.groupsList.innerHTML = state.groups.map(renderGroupCard).join("");
  els.groupsList.querySelectorAll(".group-card").forEach((card) => {
    card.addEventListener("click", () => navigateToGroup(card.dataset.groupId));
  });
}

function renderGroupCard(group) {
  const rows = group.teams.length
    ? group.teams
        .map((team) => `
          <tr>
            <td>${escapeHtml(team.name || "Équipe")}</td>
            <td>${team.played}</td>
            <td>${team.goalDiff}</td>
            <td>${team.points}</td>
          </tr>
        `)
        .join("")
    : `<tr><td colspan="4">Données à venir</td></tr>`;

  return `
    <article class="group-card group-card-link" data-group-id="${escapeAttr(group.id)}">
      <div class="group-card-title">
        <h3>${escapeHtml(group.name)}</h3>
        <span class="badge muted">Voir</span>
      </div>
      <table class="group-table">
        <thead>
          <tr><th>Équipe</th><th>J</th><th>Diff</th><th>Pts</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </article>
  `;
}

function navigateToMatch(matchId) {
  if (!matchId) return;
  window.location.hash = `match=${encodeURIComponent(matchId)}`;
}

function navigateToGroup(groupId) {
  if (!groupId) return;
  window.location.hash = `group=${encodeURIComponent(groupId)}`;
}

function openMatch(matchId) {
  navigateToMatch(matchId);
}

function renderGroupPage(groupId) {
  const group = state.groups.find((item) => String(item.id) === String(groupId));

  if (!group) {
    els.groupPageTitle.textContent = "Détail du groupe";
    els.groupPageBody.innerHTML = `<div class="empty-state">Groupe introuvable ou données en cours de chargement.</div>`;
    return;
  }

  els.groupPageTitle.textContent = `Groupe ${group.name}`;
  const matches = state.matches.filter((match) => groupNamesEqual(match.group, group.name));
  els.groupPageBody.innerHTML = renderGroupDetail(group, matches);

  els.groupPageBody.querySelectorAll(".group-match-card").forEach((card) => {
    card.addEventListener("click", () => navigateToMatch(card.dataset.matchId));
  });
}

function renderGroupDetail(group, matches) {
  return `
    <section class="stats-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Classement</p>
          <h3>Groupe ${escapeHtml(group.name)}</h3>
        </div>
      </div>
      ${renderFullGroupTable(group)}
    </section>
    <section class="stats-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Résumé</p>
          <h3>Stats rapides</h3>
        </div>
      </div>
      <div class="group-summary-grid">
        ${group.teams.map(renderGroupTeamSummary).join("")}
      </div>
    </section>
    <section class="stats-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Rencontres</p>
          <h3>Matchs du groupe</h3>
        </div>
      </div>
      <div class="group-match-list">
        ${matches.length ? matches.map(renderGroupMatchCard).join("") : `<div class="empty-state">Aucun match trouvé pour ce groupe.</div>`}
      </div>
    </section>
  `;
}

function renderFullGroupTable(group) {
  if (!group.teams.length) return `<div class="empty-state">Classement indisponible.</div>`;

  return `
    <table class="mini-table group-detail-table">
      <thead><tr><th>Équipe</th><th>J</th><th>V</th><th>N</th><th>D</th><th>Pts</th><th>BP</th><th>BC</th><th>Diff</th></tr></thead>
      <tbody>
        ${group.teams.map((team) => `
          <tr>
            <td>${escapeHtml(team.name)}</td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.drawn}</td>
            <td>${team.lost}</td>
            <td>${team.points}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${team.goalDiff}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderGroupTeamSummary(team) {
  return `
    <article class="team-stat-card">
      <h4>${escapeHtml(team.name)}</h4>
      <dl class="metric-list">
        <div><dt>Bilan</dt><dd>${team.won}V ${team.drawn}N ${team.lost}D</dd></div>
        <div><dt>Points</dt><dd>${team.points}</dd></div>
        <div><dt>Buts</dt><dd>${team.goalsFor} pour / ${team.goalsAgainst} contre</dd></div>
      </dl>
    </article>
  `;
}

function renderGroupMatchCard(match) {
  return `
    <button class="match-card group-match-card" type="button" data-match-id="${escapeAttr(match.id)}">
      <div class="match-meta">
        <span>${escapeHtml(formatMatchDate(match))}</span>
        ${renderStatusBadge(match.status)}
      </div>
      ${renderMatchScoreLine(match)}
    </button>
  `;
}

function renderMatchPage(matchId) {
  const match = state.matches.find((item) => item.id === matchId);
  state.selectedMatchId = matchId;

  if (!match) {
    els.matchPageStage.textContent = "Match";
    els.matchPageTitle.textContent = "Détail du match";
    els.matchPageBody.innerHTML = `<div class="empty-state">Match introuvable ou données en cours de chargement.</div>`;
    return;
  }

  const prediction = state.predictions[match.id];
  els.matchPageStage.textContent = formatMatchStageLabel(match);
  els.matchPageTitle.textContent = `${match.homeName} - ${match.awayName}`;
  els.matchPageBody.innerHTML = renderMatchDetail(match, prediction);

  const predictionPromptButton = els.matchPageBody.querySelector("#predictionPromptButton");
  if (predictionPromptButton) {
    predictionPromptButton.addEventListener("click", () => preparePredictionPrompt(match.id));
  }

  const copyPromptButton = els.matchPageBody.querySelector("#copyPredictionPromptButton");
  if (copyPromptButton) {
    copyPromptButton.addEventListener("click", () => copyPredictionPrompt());
  }

  const openChatGptButton = els.matchPageBody.querySelector("#openChatGptButton");
  if (openChatGptButton) {
    openChatGptButton.addEventListener("click", () => window.open("https://chatgpt.com/", "_blank", "noreferrer"));
  }

  const saveManualPredictionButton = els.matchPageBody.querySelector("#saveManualPredictionButton");
  if (saveManualPredictionButton) {
    saveManualPredictionButton.addEventListener("click", () => saveManualPrediction(match.id));
  }

  const groupButton = els.matchPageBody.querySelector("#matchGroupButton");
  if (groupButton) {
    groupButton.addEventListener("click", () => {
      const group = findGroupByName(match.group);
      if (group) navigateToGroup(group.id);
    });
  }

  const predictionSummaryButton = els.matchPageBody.querySelector("#predictionSummaryButton");
  if (predictionSummaryButton) {
    predictionSummaryButton.addEventListener("click", () => {
      els.matchPageBody.querySelector("#predictionAnalysis")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const algoSummaryButton = els.matchPageBody.querySelector("#algoSummaryButton");
  if (algoSummaryButton) {
    algoSummaryButton.addEventListener("click", () => {
      els.matchPageBody.querySelector("#algoAnalysis")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  els.matchPageBody.querySelectorAll(".info-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const wrap = button.closest(".info-popover-wrap");
      const wasOpen = wrap.classList.contains("open");
      closeInfoPopovers();
      wrap.classList.toggle("open", !wasOpen);
    });
  });
}

function renderMatchDetail(match, prediction) {
  const matchStats = buildMatchStats(match);
  const action = `<button class="primary-button" id="predictionPromptButton" type="button">${prediction ? "Préparer un nouveau prompt" : "Préparer le prompt ChatGPT"}</button>`;

  return `
    ${renderMatchTopSummary(match, prediction, matchStats)}
    <div class="tag-row">
      ${renderStatusBadge(match.status)}
      ${match.group ? `<button class="badge-link" id="matchGroupButton" type="button">Groupe ${escapeHtml(match.group)}</button>` : ""}
    </div>
    <div class="detail-grid">
      <div class="detail-item"><span>Date</span><strong>${escapeHtml(formatMatchDate(match))}</strong></div>
      <div class="detail-item"><span>Source</span><strong>${escapeHtml(state.source)}</strong></div>
    </div>
    ${renderMatchStats(matchStats)}
    ${renderManualPredictionComposer(match)}
    ${renderPredictionPanel(prediction)}
    ${action}
  `;
}

function renderManualPredictionComposer(match) {
  if (state.predictionDraft?.matchId !== match.id) return "";
  return `
    <section class="manual-prono-panel">
      <div>
        <p class="eyebrow">Prompt ChatGPT</p>
        <h3>Copie le prompt, puis colle la réponse ici</h3>
      </div>
      <label>
        <span>Prompt généré</span>
        <textarea id="predictionPromptText" readonly rows="10">${escapeHtml(state.predictionDraft.prompt)}</textarea>
      </label>
      <div class="button-row">
        <button class="secondary-button" id="copyPredictionPromptButton" type="button">Copier le prompt</button>
        <button class="secondary-button" id="openChatGptButton" type="button">Ouvrir ChatGPT</button>
      </div>
      <label>
        <span>Réponse de ChatGPT</span>
        <textarea id="manualPredictionResponse" rows="10" placeholder="Colle ici la réponse JSON de ChatGPT...">${escapeHtml(state.predictionDraft.response || "")}</textarea>
      </label>
      <button class="primary-button" id="saveManualPredictionButton" type="button">Enregistrer le prono</button>
    </section>
  `;
}

function renderMatchTopSummary(match, prediction, matchStats) {
  const algo = getAlgorithmicPredictionFromStats(matchStats);
  return `
    <section class="match-score-summary" aria-label="Scores du match">
      <div class="score-summary-card real-score-summary">
        <div>
          <p class="eyebrow">Score réel</p>
          <h3>${escapeHtml(formatMatchScoreLabel(match))}</h3>
          <small>${escapeHtml(formatMatchDate(match))}</small>
        </div>
        ${renderStatusBadge(match.status)}
      </div>
      <div class="prono-summary-grid">
        ${renderIaPredictionSummary(match, prediction)}
        ${renderAlgoPredictionSummary(algo)}
      </div>
    </section>
  `;
}

function renderIaPredictionSummary(match, prediction) {
  if (!prediction) {
    return `
      <div class="score-summary-card prediction-summary empty">
        <div>
          <p class="eyebrow">Score prono IA</p>
          <h3>Aucun prono</h3>
        </div>
        <span class="badge muted">Non généré</span>
      </div>
    `;
  }

  const predictedScore = getPredictionScore(prediction);
  const confidence = getPredictionConfidence(prediction);
  const label = predictedScore
    ? `${match.homeName} ${predictedScore.home} - ${predictedScore.away} ${match.awayName}`
    : "Score prono à lire dans l'analyse";
  const meta = [
    `Généré le ${formatDateTime(prediction.generatedAt)}`,
    confidence ? `Confiance ${confidence}/10` : ""
  ].filter(Boolean).join(" · ");

  return `
    <button class="score-summary-card prediction-summary" id="predictionSummaryButton" type="button">
      <div>
        <p class="eyebrow">Score prono IA</p>
        <h3>${escapeHtml(label)}</h3>
        <small>${escapeHtml(meta)}</small>
      </div>
      <span class="badge gold">Voir analyse</span>
    </button>
  `;
}

function renderAlgoPredictionSummary(algo) {
  if (!algo) {
    return `
      <div class="score-summary-card prediction-summary empty">
        <div>
          <p class="eyebrow">Score prono algo</p>
          <h3>Indisponible</h3>
          <small>Stats insuffisantes</small>
        </div>
        <span class="badge muted">Sans IA</span>
      </div>
    `;
  }

  const label = `${algo.homeName} ${algo.homeGoals} - ${algo.awayGoals} ${algo.awayName}`;
  const meta = `${algo.confidenceLabel} - ${algo.homeWinPercent}% / ${algo.drawPercent}% / ${algo.awayWinPercent}%`;
  return `
    <button class="score-summary-card prediction-summary algo-summary" id="algoSummaryButton" type="button">
      <div>
        <p class="eyebrow">Score prono algo</p>
        <h3>${escapeHtml(label)}</h3>
        <small>${escapeHtml(meta)}</small>
      </div>
      <span class="badge gold">Voir détail</span>
    </button>
  `;
}

function buildMatchStats(match) {
  const homeKey = teamKey(match.homeTeamId, match.homeName);
  const awayKey = teamKey(match.awayTeamId, match.awayName);
  const matchTime = match.date ? new Date(match.date).getTime() : Number.MAX_SAFE_INTEGER;
  const finishedMatches = state.matches.filter((item) => {
    if (item.status !== "finished") return false;
    const itemTime = item.date ? new Date(item.date).getTime() : 0;
    return itemTime < matchTime;
  });
  const homeMatches = finishedMatches.filter((item) => matchIncludesTeam(item, homeKey));
  const awayMatches = finishedMatches.filter((item) => matchIncludesTeam(item, awayKey));
  const headToHead = finishedMatches.filter((item) => matchIncludesTeam(item, homeKey) && matchIncludesTeam(item, awayKey));
  const globalMatches = getHistoricalMatchesBefore(match);
  const globalHomeMatches = globalMatches.filter((item) => matchIncludesTeamName(item, match.homeName));
  const globalAwayMatches = globalMatches.filter((item) => matchIncludesTeamName(item, match.awayName));
  const globalHeadToHead = globalMatches.filter((item) =>
    matchIncludesTeamName(item, match.homeName) && matchIncludesTeamName(item, match.awayName)
  );

  return {
    match,
    worldCup: {
      title: "Coupe du Monde",
      note: buildStatsCutoffNote("Stats calculées uniquement depuis les matchs du tournoi chargés.", match.date),
      home: buildTeamStats(match.homeName, homeKey, homeMatches, { averageWindow: FORM_WINDOW, summaryWindow: FORM_WINDOW, displayWindow: FORM_WINDOW }),
      away: buildTeamStats(match.awayName, awayKey, awayMatches, { averageWindow: FORM_WINDOW, summaryWindow: FORM_WINDOW, displayWindow: FORM_WINDOW }),
      headToHead: buildHeadToHeadStats(match.homeName, match.awayName, headToHead),
      groupRows: [findGroupRow(match.homeTeamId, match.homeName), findGroupRow(match.awayTeamId, match.awayName)],
      finishedCount: finishedMatches.length,
      headToHeadCount: headToHead.length,
      status: "ready"
    },
    global: {
      title: "Tout compris",
      note: buildStatsCutoffNote(state.globalLastSync
        ? `Stats calculées depuis l’historique public des matchs internationaux. CSV actualisé le ${formatDateTime(state.globalLastSync)}.`
        : "Stats calculées depuis l’historique public des matchs internationaux.", match.date),
      home: buildTeamStats(match.homeName, teamKey("", match.homeName), globalHomeMatches, { averageWindow: FORM_WINDOW, summaryWindow: FORM_WINDOW, displayWindow: FORM_WINDOW }),
      away: buildTeamStats(match.awayName, teamKey("", match.awayName), globalAwayMatches, { averageWindow: FORM_WINDOW, summaryWindow: FORM_WINDOW, displayWindow: FORM_WINDOW }),
      headToHead: buildHeadToHeadStats(match.homeName, match.awayName, globalHeadToHead),
      groupRows: [],
      finishedCount: globalMatches.length,
      headToHeadCount: globalHeadToHead.length,
      status: state.globalStatsStatus
    }
  };
}

function buildTeamStats(teamName, key, matches, options = {}) {
  const ordered = matches
    .slice()
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const recentMatches = ordered.slice(0, options.averageWindow || ordered.length);
  const summaryMatches = ordered.slice(0, options.summaryWindow || ordered.length);
  const displayMatches = ordered.slice(0, options.displayWindow || options.averageWindow || ordered.length);

  const totals = summaryMatches.reduce((acc, match) => {
    const side = getTeamSide(match, key);
    if (!side) return acc;
    const goalsFor = side === "home" ? match.homeScore : match.awayScore;
    const goalsAgainst = side === "home" ? match.awayScore : match.homeScore;
    if (goalsFor === null || goalsAgainst === null) return acc;
    acc.played += 1;
    acc.goalsFor += goalsFor;
    acc.goalsAgainst += goalsAgainst;
    if (goalsFor > goalsAgainst) acc.won += 1;
    if (goalsFor === goalsAgainst) acc.drawn += 1;
    if (goalsFor < goalsAgainst) acc.lost += 1;
    return acc;
  }, { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 });

  const form = ordered.slice(0, 5).map((match) => {
    const side = getTeamSide(match, key);
    const goalsFor = side === "home" ? match.homeScore : match.awayScore;
    const goalsAgainst = side === "home" ? match.awayScore : match.homeScore;
    if (goalsFor > goalsAgainst) return "V";
    if (goalsFor === goalsAgainst) return "N";
    return "D";
  });
  const recent = displayMatches.map((match) => buildTeamMatchLine(match, key)).filter(Boolean);
  const averageRecent = recentMatches.map((match) => buildTeamMatchLine(match, key)).filter(Boolean);
  const recentTotals = averageRecent.reduce((acc, item) => {
    acc.goalsFor += item.goalsFor;
    acc.goalsAgainst += item.goalsAgainst;
    return acc;
  }, { goalsFor: 0, goalsAgainst: 0 });
  const averageSample = averageRecent.length;

  return {
    teamName,
    form,
    recent,
    averageSample,
    summarySample: totals.played,
    ...totals,
    avgFor: averageSample ? recentTotals.goalsFor / averageSample : 0,
    avgAgainst: averageSample ? recentTotals.goalsAgainst / averageSample : 0
  };
}

function buildStatsCutoffNote(baseNote, matchDate) {
  if (!matchDate) return `${baseNote} Les matchs pris en compte sont ceux disponibles avant la rencontre.`;
  return `${baseNote} Les 5 derniers matchs affichés et le prono algo utilisent uniquement les matchs joués avant le ${formatShortDate(matchDate)}.`;
}

function buildTeamMatchLine(match, key) {
  const side = getTeamSide(match, key);
  if (!side) return null;
  const goalsFor = side === "home" ? match.homeScore : match.awayScore;
  const goalsAgainst = side === "home" ? match.awayScore : match.homeScore;
  if (goalsFor === null || goalsAgainst === null) return null;
  const opponent = side === "home" ? match.awayName : match.homeName;
  const teamName = side === "home" ? match.homeName : match.awayName;
  return {
    date: match.date,
    teamName,
    homeName: match.homeName,
    awayName: match.awayName,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    opponent,
    teamRanking: findFifaRanking(teamName),
    opponentRanking: findFifaRanking(opponent),
    tournament: match.tournament || match.stage || "International",
    goalsFor,
    goalsAgainst,
    result: goalsFor > goalsAgainst ? "V" : goalsFor === goalsAgainst ? "N" : "D"
  };
}

function buildHeadToHeadStats(homeName, awayName, matches) {
  const totals = matches.reduce((acc, match) => {
    const homeIsHomeTeam = namesEqual(match.homeName, homeName);
    const homeGoals = homeIsHomeTeam ? match.homeScore : match.awayScore;
    const awayGoals = homeIsHomeTeam ? match.awayScore : match.homeScore;
    if (homeGoals === null || awayGoals === null) return acc;
    acc.played += 1;
    acc.goals += homeGoals + awayGoals;
    if (homeGoals > awayGoals) acc.homeWins += 1;
    if (homeGoals === awayGoals) acc.draws += 1;
    if (homeGoals < awayGoals) acc.awayWins += 1;
    return acc;
  }, { played: 0, homeWins: 0, draws: 0, awayWins: 0, goals: 0 });

  const latest = matches
    .slice()
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 3);

  return {
    ...totals,
    avgGoals: totals.played ? totals.goals / totals.played : 0,
    latest
  };
}

function renderMatchStats(stats) {
  return `
    ${renderStatsScope(stats.worldCup)}
    ${renderStatsScope(stats.global)}
    ${renderAlgorithmicPrediction(stats)}
  `;
}

function renderStatsScope(scope) {
  if (scope.status === "loading") {
    return `
      <section class="stats-panel" aria-label="Stats ${escapeAttr(scope.title)}">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${escapeHtml(scope.title)}</p>
            <h3>Stats en chargement</h3>
          </div>
        </div>
        <p class="micro-note">Chargement de l’historique international public.</p>
      </section>
    `;
  }

  if (scope.status === "error") {
    return `
      <section class="stats-panel" aria-label="Stats ${escapeAttr(scope.title)}">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${escapeHtml(scope.title)}</p>
            <h3>Stats indisponibles</h3>
          </div>
        </div>
        <p class="micro-note">Impossible de charger l’historique international pour le moment.</p>
      </section>
    `;
  }

  if (scope.status === "empty") {
    return `
      <section class="stats-panel" aria-label="Stats ${escapeAttr(scope.title)}">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">${escapeHtml(scope.title)}</p>
            <h3>Stats non synchronisées</h3>
          </div>
        </div>
        <p class="micro-note">Va dans Réglages puis lance "Actualiser stats globales" pour télécharger l’historique international (${INTERNATIONAL_RESULTS_SIZE_LABEL}).</p>
      </section>
    `;
  }

  return `
    <section class="stats-panel" aria-label="Stats ${escapeAttr(scope.title)}">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Sans IA</p>
          <h3>${escapeHtml(scope.title)}</h3>
        </div>
        ${renderStatsInfoButton(scope)}
      </div>
      <p class="micro-note">${escapeHtml(scope.note)}</p>
      <div class="team-stats-grid">
        ${renderTeamStats(scope.home)}
        ${renderTeamStats(scope.away)}
      </div>
      ${renderHeadToHead(scope.headToHead)}
    </section>
  `;
}

function renderAlgorithmicPrediction(stats) {
  const algo = getAlgorithmicPredictionFromStats(stats);
  if (!algo) {
    return `
      <section class="stats-panel algo-panel" id="algoAnalysis" aria-label="Prono algorithmique">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Sans IA</p>
            <h3>Prono algo</h3>
          </div>
        </div>
        <p class="micro-note">Pas assez de données récentes pour générer un prono algorithmique.</p>
      </section>
    `;
  }

  return `
    <section class="stats-panel algo-panel" id="algoAnalysis" aria-label="Prono algorithmique">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Sans IA</p>
          <h3>Prono algo</h3>
        </div>
        <span class="badge gold">${escapeHtml(algo.confidenceLabel)}</span>
      </div>
      <div class="algo-score">
        <span>${escapeHtml(algo.homeName)}</span>
        <strong>${algo.homeGoals} - ${algo.awayGoals}</strong>
        <span>${escapeHtml(algo.awayName)}</span>
      </div>
      <div class="algo-meter" aria-hidden="true">
        <span style="width: ${algo.homeWinPercent}%"></span>
      </div>
      <div class="algo-probabilities">
        <span>${escapeHtml(algo.homeName)} ${algo.homeWinPercent}%</span>
        <span>Nul ${algo.drawPercent}%</span>
        <span>${escapeHtml(algo.awayName)} ${algo.awayWinPercent}%</span>
      </div>
      <dl class="metric-list algo-metrics">
        <div><dt>Score forme</dt><dd>${formatNumber(algo.homeRating)} / ${formatNumber(algo.awayRating)}</dd></div>
        <div><dt>Attaque attendue</dt><dd>${formatNumber(algo.homeExpectedGoals)} / ${formatNumber(algo.awayExpectedGoals)}</dd></div>
        <div><dt>Écart FIFA</dt><dd>${algo.fifaPointsDiff > 0 ? "+" : ""}${formatNumber(algo.fifaPointsDiff)} pts</dd></div>
      </dl>
      <ul class="compact-list">
        ${algo.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function getAlgorithmicPredictionFromStats(stats) {
  const scope = stats.global.status === "ready" ? stats.global : stats.worldCup;
  return buildAlgorithmicPrediction(scope);
}

function buildAlgorithmicPrediction(scope) {
  if (scope.status !== "ready") return null;
  const home = scope.home;
  const away = scope.away;
  if (!home.recent.length || !away.recent.length) return null;

  const homeRanking = findFifaRanking(home.teamName);
  const awayRanking = findFifaRanking(away.teamName);
  const homeMetrics = buildAlgoTeamMetrics(home, homeRanking, awayRanking);
  const awayMetrics = buildAlgoTeamMetrics(away, awayRanking, homeRanking);
  const fifaPointsDiff = Number(homeRanking?.points || 0) - Number(awayRanking?.points || 0);
  const fifaRankDiff = Number(awayRanking?.rank || 100) - Number(homeRanking?.rank || 100);
  const fifaEdge = clamp(fifaPointsDiff / 230 + fifaRankDiff / 36, -1, 1);

  const homeRating = homeMetrics.formScore + homeMetrics.attackScore - awayMetrics.defenseScore + fifaEdge * 0.7;
  const awayRating = awayMetrics.formScore + awayMetrics.attackScore - homeMetrics.defenseScore - fifaEdge * 0.7;
  const ratingDiff = homeRating - awayRating;
  const dominanceShift = clamp(ratingDiff / 4.2, -1.2, 1.2);
  const homeExpectedGoals = clamp(
    (homeMetrics.weightedAvgFor * 0.62)
      + (awayMetrics.weightedAvgAgainst * 0.58)
      + 0.08
      + fifaEdge * 0.04
      + dominanceShift * 0.34,
    0.05,
    5
  );
  const awayExpectedGoals = clamp(
    (awayMetrics.weightedAvgFor * 0.62)
      + (homeMetrics.weightedAvgAgainst * 0.58)
      + 0.08
      - fifaEdge * 0.04
      - dominanceShift * 0.34,
    0.05,
    5
  );
  const outcome = buildPoissonOutcome(homeExpectedGoals, awayExpectedGoals);
  const score = selectRepresentativeScore(homeExpectedGoals, awayExpectedGoals, outcome, dominanceShift);
  const dataSample = Math.min(home.summarySample, away.summarySample, FORM_WINDOW) / FORM_WINDOW;
  const weakSchedulePenalty = clamp(Math.max(0, -homeMetrics.opponentStrength, -awayMetrics.opponentStrength) * 0.55, 0, 1.2);
  const favoritePercent = Math.max(outcome.homeWinPercent, outcome.drawPercent, outcome.awayWinPercent);
  const confidence = clamp(3.2 + (favoritePercent - 40) / 12 + dataSample * 1.2 - weakSchedulePenalty, 3, 8.5);

  return {
    homeName: home.teamName,
    awayName: away.teamName,
    homeGoals: score.homeGoals,
    awayGoals: score.awayGoals,
    homeExpectedGoals,
    awayExpectedGoals,
    homeRating,
    awayRating,
    fifaPointsDiff,
    homeWinPercent: outcome.homeWinPercent,
    awayWinPercent: outcome.awayWinPercent,
    drawPercent: outcome.drawPercent,
    confidenceLabel: `Confiance ${formatNumber(confidence)}/10`,
    reasons: buildAlgoReasons(home, away, homeRanking, awayRanking, homeMetrics, awayMetrics, fifaPointsDiff)
  };
}

function expectedGoalsToScore(expectedGoals, dominance) {
  const roundingBias = dominance > 0.25 ? 0.85 : dominance < -0.25 ? 0.32 : 0.5;
  return Math.max(0, Math.min(5, Math.floor(expectedGoals + roundingBias)));
}

function selectRepresentativeScore(homeExpectedGoals, awayExpectedGoals, outcome, dominanceShift) {
  let homeGoals = expectedGoalsToScore(homeExpectedGoals, dominanceShift);
  let awayGoals = expectedGoalsToScore(awayExpectedGoals, -dominanceShift);
  const strongestOutcome = getStrongestOutcome(outcome);
  if (strongestOutcome === "home" && homeGoals <= awayGoals) {
    homeGoals = Math.min(5, awayGoals + 1);
  }
  if (strongestOutcome === "away" && awayGoals <= homeGoals) {
    awayGoals = Math.min(5, homeGoals + 1);
  }
  if (strongestOutcome === "draw" && Math.abs(homeGoals - awayGoals) <= 1) {
    const drawGoals = Math.max(0, Math.min(4, Math.round((homeExpectedGoals + awayExpectedGoals) / 2)));
    homeGoals = drawGoals;
    awayGoals = drawGoals;
  }
  return { homeGoals, awayGoals };
}

function getStrongestOutcome(outcome) {
  if (outcome.homeWinPercent >= outcome.drawPercent && outcome.homeWinPercent >= outcome.awayWinPercent) return "home";
  if (outcome.awayWinPercent >= outcome.homeWinPercent && outcome.awayWinPercent >= outcome.drawPercent) return "away";
  return "draw";
}

function buildPoissonOutcome(homeExpectedGoals, awayExpectedGoals) {
  const maxGoals = 7;
  const homeDistribution = buildPoissonDistribution(homeExpectedGoals, maxGoals);
  const awayDistribution = buildPoissonDistribution(awayExpectedGoals, maxGoals);
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;

  for (let homeGoals = 0; homeGoals <= maxGoals; homeGoals += 1) {
    for (let awayGoals = 0; awayGoals <= maxGoals; awayGoals += 1) {
      const probability = homeDistribution[homeGoals] * awayDistribution[awayGoals];
      if (homeGoals > awayGoals) homeWin += probability;
      else if (homeGoals === awayGoals) draw += probability;
      else awayWin += probability;
    }
  }

  const total = Math.max(0.001, homeWin + draw + awayWin);
  const homeWinPercent = Math.round((homeWin / total) * 100);
  const drawPercent = Math.round((draw / total) * 100);
  const awayWinPercent = Math.max(0, 100 - homeWinPercent - drawPercent);
  return { homeWinPercent, drawPercent, awayWinPercent };
}

function buildPoissonDistribution(expectedGoals, maxGoals) {
  const lambda = clamp(expectedGoals, 0.05, 6);
  const distribution = [];
  let total = 0;
  for (let goals = 0; goals <= maxGoals; goals += 1) {
    const probability = Math.exp(-lambda) * (lambda ** goals) / factorial(goals);
    distribution.push(probability);
    total += probability;
  }
  return distribution.map((probability) => probability / Math.max(0.001, total));
}

function factorial(value) {
  let result = 1;
  for (let index = 2; index <= value; index += 1) result *= index;
  return result;
}

function buildAlgoTeamMetrics(stats, ownRanking, fallbackOpponentRanking) {
  const weighted = buildWeightedRecentMetrics(stats.recent, ownRanking, fallbackOpponentRanking);
  const pointsPerMatch = weighted.weight ? weighted.weightedPoints / weighted.weight : 0;
  const weightedAvgFor = weighted.weight ? weighted.weightedGoalsFor / weighted.weight : stats.avgFor;
  const weightedAvgAgainst = weighted.weight ? weighted.weightedGoalsAgainst / weighted.weight : stats.avgAgainst;
  return {
    weightedPointsPerMatch: pointsPerMatch,
    weightedAvgFor,
    weightedAvgAgainst,
    formScore: (pointsPerMatch - 1.25) * 1.1,
    attackScore: (weightedAvgFor - 1.25) * 1.2,
    defenseScore: (weightedAvgAgainst - 1.05) * 0.85,
    opponentStrength: weighted.opponentStrength
  };
}

function buildWeightedRecentMetrics(recent, ownRanking, fallbackOpponentRanking) {
  const totals = recent.slice(0, FORM_WINDOW).reduce((acc, match, index) => {
    const teamPoints = Number(match.teamRanking?.points || ownRanking?.points || 1500);
    const opponentPoints = Number(match.opponentRanking?.points || fallbackOpponentRanking?.points || 1500);
    const recencyWeight = 1 / (1 + index * 0.18);
    const relativeStrength = clamp((opponentPoints - teamPoints) / 320, -0.8, 0.8);
    const resultWeight = clamp(1 + relativeStrength * 0.28, 0.78, 1.24);
    const goalForWeight = clamp(1 + relativeStrength * 0.3, 0.76, 1.28);
    const goalAgainstWeight = clamp(1 - relativeStrength * 0.26, 0.78, 1.26);
    const resultPoints = match.result === "V" ? 3 : match.result === "N" ? 1 : 0;
    const weakLossPenalty = match.result === "D" ? clamp(-relativeStrength * 0.25, 0, 0.25) : 0;

    acc.sample += 1;
    acc.weight += recencyWeight;
    acc.weightedPoints += Math.max(0, resultPoints * resultWeight - weakLossPenalty) * recencyWeight;
    acc.weightedGoalsFor += match.goalsFor * goalForWeight * recencyWeight;
    acc.weightedGoalsAgainst += match.goalsAgainst * goalAgainstWeight * recencyWeight;
    acc.opponentStrength += clamp((opponentPoints - 1500) / 260, -1.1, 1.3) * recencyWeight;
    return acc;
  }, {
    sample: 0,
    weight: 0,
    weightedPoints: 0,
    weightedGoalsFor: 0,
    weightedGoalsAgainst: 0,
    opponentStrength: 0
  });

  if (totals.weight) {
    totals.opponentStrength /= totals.weight;
  }
  return totals;
}

function buildAlgoReasons(home, away, homeRanking, awayRanking, homeMetrics, awayMetrics, fifaPointsDiff) {
  return [
    `${home.teamName}: ${home.won}V ${home.drawn}N ${home.lost}D sur ${home.summarySample} matchs, forme ponderee ${formatNumber(homeMetrics.weightedPointsPerMatch)} pt/match.`,
    `${away.teamName}: ${away.won}V ${away.drawn}N ${away.lost}D sur ${away.summarySample} matchs, forme ponderee ${formatNumber(awayMetrics.weightedPointsPerMatch)} pt/match.`,
    `Buts ponderes: ${home.teamName} ${formatNumber(homeMetrics.weightedAvgFor)} marques / ${formatNumber(homeMetrics.weightedAvgAgainst)} encaisses, ${away.teamName} ${formatNumber(awayMetrics.weightedAvgFor)} / ${formatNumber(awayMetrics.weightedAvgAgainst)}.`,
    "Les 5 matchs sont ponderes par recence; la valeur des adversaires ajuste les buts et la forme une seule fois.",
    "Les probabilites viennent d'un modele de buts type Poisson construit depuis les attaques/defenses attendues.",
    `Classement FIFA utilise comme bonus secondaire: ${home.teamName} ${formatFifaRanking(homeRanking)} contre ${away.teamName} ${formatFifaRanking(awayRanking)} (${fifaPointsDiff > 0 ? "+" : ""}${formatNumber(fifaPointsDiff)} pts).`,
    `Force des adversaires recents: ${formatNumber(homeMetrics.opponentStrength)} pour ${home.teamName}, ${formatNumber(awayMetrics.opponentStrength)} pour ${away.teamName}.`
  ];
}

function renderStatsInfoButton(scope) {
  return `
    <div class="info-popover-wrap">
      <button class="info-button" type="button" aria-label="Disponibilité des stats" title="Disponibilité des stats">i</button>
      ${renderStatsAvailability(scope)}
    </div>
  `;
}

function renderTeamStats(stats) {
  const ranking = findFifaRanking(stats.teamName);
  return `
    <article class="team-stat-card">
      <div class="team-card-heading">
        <h4>${escapeHtml(stats.teamName)}</h4>
        ${ranking ? `<span class="badge muted">${escapeHtml(formatFifaRanking(ranking))}</span>` : ""}
      </div>
      <div class="form-row">${renderForm(stats.form)}</div>
      <dl class="metric-list">
        <div><dt>Bilan ${stats.summarySample ? `sur ${stats.summarySample}` : ""}</dt><dd>${stats.won}V ${stats.drawn}N ${stats.lost}D</dd></div>
        <div><dt>Buts ${stats.summarySample ? `sur ${stats.summarySample}` : ""}</dt><dd>${stats.goalsFor} pour / ${stats.goalsAgainst} contre</dd></div>
        <div><dt>Moy. ${stats.averageSample ? `sur ${stats.averageSample}` : ""}</dt><dd>${formatNumber(stats.avgFor)} marqués / ${formatNumber(stats.avgAgainst)} encaissés</dd></div>
      </dl>
      ${renderRecentMatches(stats)}
    </article>
  `;
}

function renderRecentMatches(stats) {
  if (!stats.recent.length) {
    return `<p class="micro-note">Aucun match récent disponible dans cette source.</p>`;
  }

  return `
    <div class="recent-matches">
      <p class="eyebrow">${FORM_WINDOW} derniers matchs</p>
      <ol>
        ${stats.recent.slice(0, FORM_WINDOW).map((match) => `
          <li>
            <span class="form-pill ${match.result.toLowerCase()}">${match.result}</span>
            <div>
              <small>${escapeHtml(formatShortDate(match.date))} - ${escapeHtml(match.tournament)}</small>
              <strong>${escapeHtml(match.homeName)} ${scoreText(match.homeScore)} - ${scoreText(match.awayScore)} ${escapeHtml(match.awayName)}</strong>
              <span class="ranking-match-note">
                ${escapeHtml(match.teamName)}: ${escapeHtml(formatFifaRanking(match.teamRanking))}
                <span>Adversaire ${escapeHtml(match.opponent)}: ${escapeHtml(formatFifaRanking(match.opponentRanking))}</span>
              </span>
            </div>
          </li>
        `).join("")}
      </ol>
    </div>
  `;
}

function renderGroupSnapshot(rows) {
  const validRows = rows.filter(Boolean);
  if (!validRows.length) {
    return `<p class="micro-note">Classement de groupe non disponible avec la source actuelle.</p>`;
  }

  return `
    <div>
      <p class="eyebrow">Groupe</p>
      <table class="mini-table">
        <thead><tr><th>Équipe</th><th>J</th><th>Pts</th><th>BP</th><th>BC</th><th>Diff</th></tr></thead>
        <tbody>
          ${validRows.map((row) => `
            <tr>
              <td>${escapeHtml(row.name)}</td>
              <td>${row.played}</td>
              <td>${row.points}</td>
              <td>${row.goalsFor}</td>
              <td>${row.goalsAgainst}</td>
              <td>${row.goalDiff}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderStatsAvailability(stats) {
  const groupAvailable = stats.groupRows.some(Boolean);
  const items = [];

  if (stats.groupRows.length) {
    items.push({
      label: "Classement de groupe",
      available: groupAvailable,
      detail: groupAvailable ? "Fourni par worldcup26.ir" : "Non disponible avec la source actuelle"
    });
  }

  items.push(
    {
      label: "Forme récente",
      available: stats.finishedCount > 0,
      detail: stats.finishedCount > 0
        ? "Calculée depuis les matchs terminés chargés"
        : "Pas encore calculable: aucun match terminé dans les données chargées"
    },
    {
      label: "Stats de buts",
      available: stats.finishedCount > 0,
      detail: stats.finishedCount > 0
        ? "Calculées depuis les scores du tournoi"
        : "Pas encore calculable: les matchs sont à venir"
    },
    {
      label: "Dernière confrontation",
      available: stats.headToHeadCount > 0,
      detail: stats.headToHeadCount > 0
        ? "Trouvée dans les matchs chargés"
        : "Aucune confrontation trouvée dans cette source"
    }
  );

  return `
    <div class="availability-panel">
      <p class="eyebrow">Disponibilité des stats</p>
      <ul class="availability-list">
        ${items.map((item) => `
          <li class="${item.available ? "available" : "unavailable"}">
            <span>${item.available ? "OK" : "--"}</span>
            <div>
              <strong>${escapeHtml(item.label)}</strong>
              <small>${escapeHtml(item.detail)}</small>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function renderHeadToHead(stats) {
  const latest = stats.latest.length
    ? stats.latest.map((match) => `
      <li>${escapeHtml(formatMatchDate(match))}: ${escapeHtml(match.homeName)} ${scoreText(match.homeScore)} - ${scoreText(match.awayScore)} ${escapeHtml(match.awayName)}</li>
    `).join("")
    : `<li>Aucune confrontation disponible dans les données chargées.</li>`;

  return `
    <div>
      <p class="eyebrow">Confrontations</p>
      <div class="h2h-summary">
        <span>${stats.played} match(s)</span>
        <span>${formatNumber(stats.avgGoals)} buts/match</span>
      </div>
      <ul class="compact-list">${latest}</ul>
    </div>
  `;
}

function renderForm(form) {
  if (!form.length) return `<span class="badge muted">Pas encore de résultat</span>`;
  return form.map((result) => `<span class="form-pill ${result.toLowerCase()}">${result}</span>`).join("");
}

function renderPredictionPanel(prediction) {
  if (!prediction) {
    return `
      <div class="prediction-panel" id="predictionAnalysis">
        <h3>Prono IA</h3>
        <p class="prediction-text">Aucun prono enregistré pour ce match.</p>
      </div>
    `;
  }

  const structured = getStructuredPrediction(prediction);
  if (structured) return renderStructuredPrediction(prediction, structured);
  const sources = renderPredictionSources(mergePredictionSources([], prediction.sources));

  return `
    <div class="prediction-panel" id="predictionAnalysis">
      <div>
        <p class="eyebrow">Généré le ${formatDateTime(prediction.generatedAt)}</p>
        <h3>Prono IA</h3>
      </div>
      <p class="prediction-text">${escapeHtml(prediction.text)}</p>
      ${sources}
    </div>
  `;
}

function renderStructuredPrediction(prediction, structured) {
  const score = getPredictionScore(prediction);
  const alternative = normalizeScore(structured.alternative_score);
  const confidence = getPredictionConfidence(prediction);
  const qualitative = cleanName(structured.confidence?.qualitative_probability);
  const analysis = structured.analysis || {};
  const sources = mergePredictionSources(structured.sources, prediction.sources);

  return `
    <div class="prediction-panel" id="predictionAnalysis">
      <div>
        <p class="eyebrow">Généré le ${formatDateTime(prediction.generatedAt)}</p>
        <h3>Prono IA</h3>
      </div>
      <div class="prediction-grid">
        <div class="prediction-score-card main">
          <span>Score prédit</span>
          <strong>${escapeHtml(score?.label || formatScoreObject(score) || "Non précisé")}</strong>
        </div>
        <div class="prediction-score-card">
          <span>Alternative</span>
          <strong>${escapeHtml(alternative?.label || formatScoreObject(alternative) || "Non précisée")}</strong>
        </div>
        <div class="prediction-score-card">
          <span>Confiance</span>
          <strong>${confidence ? `${escapeHtml(String(confidence))}/10` : "Non précisée"}</strong>
          ${qualitative ? `<small>${escapeHtml(qualitative)}</small>` : ""}
        </div>
      </div>
      ${renderPredictionSection("Résumé rapide", analysis.context_summary || structured.confidence?.summary)}
      ${renderTeamFormSection("Forme récente", analysis.team_a_recent_form, analysis.team_b_recent_form)}
      ${renderPredictionSection("Comparaison offensive/défensive", analysis.offensive_defensive_comparison)}
      ${renderPredictionSection("Confrontations directes", analysis.head_to_head)}
      ${renderPredictionSection("Absences et actualité", analysis.absences_and_news)}
      ${renderPredictionSection("Lecture tactique probable", analysis.tactical_reading)}
      ${renderRiskList(analysis.main_risks)}
      ${renderPredictionSources(sources)}
    </div>
  `;
}

function renderTeamFormSection(title, teamA, teamB) {
  if (!teamA && !teamB) return "";
  return `
    <section class="analysis-section">
      <h4>${escapeHtml(title)}</h4>
      <div class="team-form-grid">
        ${renderTeamFormBlock(teamA)}
        ${renderTeamFormBlock(teamB)}
      </div>
    </section>
  `;
}

function renderTeamFormBlock(form) {
  if (!form) return "";
  const meta = [
    form.record,
    Number.isFinite(Number(form.goals_for)) && Number.isFinite(Number(form.goals_against))
      ? `${form.goals_for} marqués / ${form.goals_against} encaissés`
      : ""
  ].filter(Boolean).join(" · ");
  const notable = Array.isArray(form.notable_results) && form.notable_results.length
    ? `<ul>${form.notable_results.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";

  return `
    <article class="team-form-block">
      ${meta ? `<p class="eyebrow">${escapeHtml(meta)}</p>` : ""}
      <p>${escapeHtml(form.summary || "Analyse non précisée.")}</p>
      ${notable}
    </article>
  `;
}

function renderPredictionSection(title, content) {
  const text = renderPredictionContent(content);
  if (!text) return "";
  return `
    <section class="analysis-section">
      <h4>${escapeHtml(title)}</h4>
      ${text}
    </section>
  `;
}

function renderPredictionContent(content) {
  if (!content) return "";
  if (Array.isArray(content)) {
    const items = content.filter(Boolean).slice(0, 6);
    if (!items.length) return "";
    return `<ul>${items.map((item) => `<li>${escapeHtml(String(item))}</li>`).join("")}</ul>`;
  }
  if (typeof content === "object") {
    return Object.entries(content)
      .filter(([, value]) => value !== null && value !== undefined && value !== "")
      .map(([key, value]) => `<p><strong>${escapeHtml(humanizeKey(key))}:</strong> ${escapeHtml(String(value))}</p>`)
      .join("");
  }
  return `<p>${escapeHtml(String(content))}</p>`;
}

function renderRiskList(risks) {
  if (!Array.isArray(risks) || !risks.length) return "";
  return `
    <section class="analysis-section">
      <h4>Principaux risques</h4>
      <ul class="risk-list">
        ${risks.slice(0, 6).map((risk) => `<li>${escapeHtml(String(risk))}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderPredictionSources(sources) {
  if (!sources.length) return "";
  return `
    <div>
      <p class="eyebrow">Sources</p>
      <ol class="sources-list">
        ${sources.map((source) => `
          <li>
            <a href="${escapeAttr(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.title || source.url)}</a>
            ${source.used_for ? `<small>${escapeHtml(source.used_for)}</small>` : ""}
          </li>
        `).join("")}
      </ol>
    </div>
  `;
}

function preparePredictionPrompt(matchId) {
  const match = state.matches.find((item) => item.id === matchId);
  if (!match) return;
  state.predictionDraft = {
    matchId,
    prompt: buildPredictionInput(match),
    response: ""
  };
  renderMatchPage(matchId);
  els.matchPageBody.querySelector("#predictionPromptText")?.focus();
}

async function copyPredictionPrompt() {
  const textarea = els.matchPageBody.querySelector("#predictionPromptText");
  if (!textarea) return;
  try {
    await navigator.clipboard.writeText(textarea.value);
    toast("Prompt copié.");
  } catch {
    textarea.select();
    document.execCommand("copy");
    toast("Prompt copié.");
  }
}

function saveManualPrediction(matchId) {
  const textarea = els.matchPageBody.querySelector("#manualPredictionResponse");
  const text = textarea?.value.trim() || "";
  if (!text) {
    toast("Colle d'abord la réponse de ChatGPT.");
    textarea?.focus();
    return;
  }

  const structured = parsePredictionJson(text);
  const prediction = {
    matchId,
    generatedAt: new Date().toISOString(),
    text,
    structured,
    sources: mergePredictionSources(structured?.sources),
    model: "ChatGPT manuel"
  };

  state.predictions[matchId] = prediction;
  state.predictionDraft = null;
  writeJson(STORAGE_KEYS.predictions, state.predictions);
  render();
  renderMatchPage(matchId);
  toast(structured ? "Prono enregistré." : "Prono enregistré, format JSON non détecté.");
}

function buildPredictionInput(match) {
  const localStats = buildLocalStatsPrompt(match);
  const matchLines = [
    `- Équipe 1: ${match.homeName}`,
    `- Équipe 2: ${match.awayName}`,
    `- Date: ${formatMatchDate(match)}`,
    `- Phase/groupe: ${[match.stage, match.group].filter(Boolean).join(" / ") || "Non précisé"}`
  ];

  if (match.status === "live" || match.status === "finished") {
    matchLines.push(`- Statut: ${match.status === "live" ? "En direct" : "Terminé"}`);
    matchLines.push(`- Score actuel/final: ${scoreText(match.homeScore)}-${scoreText(match.awayScore)}`);
  }

  return `${state.settings.customPrompt || DEFAULT_PROMPT}

Match:
${matchLines.join("\n")}

Stats locales déjà calculées par l'application:
${localStats}

Important:
- Tu peux utiliser ces stats locales comme contexte, mais tu dois aussi chercher les infos récentes sur le web.
- Retourne uniquement le JSON demandé, avec les scores dans le sens Équipe 1 puis Équipe 2.`;
}

function buildLocalStatsPrompt(match) {
  const stats = buildMatchStats(match);
  const scopes = [stats.worldCup, stats.global].filter((scope) => scope.status === "ready");
  if (!scopes.length) return "Aucune statistique locale fiable disponible.";

  return scopes.map((scope) => {
    const lines = [
      `${scope.title}: ${scope.note}`,
      formatTeamStatsPrompt(scope.home),
      formatTeamStatsPrompt(scope.away),
      formatHeadToHeadPrompt(scope.headToHead)
    ].filter(Boolean);
    return lines.join("\n");
  }).join("\n\n");
}

function formatTeamStatsPrompt(stats) {
  const ranking = findFifaRanking(stats.teamName);
  const recent = stats.recent.slice(0, 10).map((match) =>
    `  - ${formatShortDate(match.date)}: ${match.homeName} ${scoreText(match.homeScore)} - ${scoreText(match.awayScore)} ${match.awayName} (${match.tournament})`
  );
  return [
    `Classement ${stats.teamName}: ${formatFifaRanking(ranking)}.`,
    `${stats.teamName}: bilan ${stats.won}V ${stats.drawn}N ${stats.lost}D sur ${stats.summarySample || 0} match(s), buts ${stats.goalsFor}-${stats.goalsAgainst}, moyennes ${formatNumber(stats.avgFor)} marqués / ${formatNumber(stats.avgAgainst)} encaissés.`,
    recent.length ? `10 derniers matchs:\n${recent.join("\n")}` : "Aucun match récent disponible."
  ].join("\n");
}

function formatHeadToHeadPrompt(stats) {
  const latest = stats.latest.map((match) =>
    `  - ${formatShortDate(match.date)}: ${match.homeName} ${scoreText(match.homeScore)} - ${scoreText(match.awayScore)} ${match.awayName}`
  );
  return [
    `Confrontations directes: ${stats.played} match(s), ${formatNumber(stats.avgGoals)} buts/match.`,
    latest.length ? latest.join("\n") : "Aucune confrontation directe disponible localement."
  ].join("\n");
}

function extractOutputText(data) {
  if (data.output_text) return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim() || "Réponse IA vide.";
}

function getStructuredPrediction(prediction) {
  if (!prediction) return null;
  if (prediction.structured && typeof prediction.structured === "object") return prediction.structured;
  return parsePredictionJson(prediction.text);
}

function parsePredictionJson(text) {
  const raw = String(text || "").trim();
  if (!raw) return null;
  const withoutFence = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const firstBrace = withoutFence.indexOf("{");
  const lastBrace = withoutFence.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;
  const jsonText = withoutFence.slice(firstBrace, lastBrace + 1);

  try {
    const parsed = JSON.parse(jsonText);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    try {
      const parsed = JSON.parse(repairJsonStringLineBreaks(jsonText));
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
}

function repairJsonStringLineBreaks(text) {
  let output = "";
  let inString = false;
  let escaped = false;

  for (const char of text) {
    if (inString && (char === "\n" || char === "\r")) {
      output += " ";
      escaped = false;
      continue;
    }

    output += char;

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "\"") {
      inString = !inString;
    }
  }

  return output;
}

function getPredictionScore(prediction) {
  const structured = getStructuredPrediction(prediction);
  const score = normalizeScore(structured?.predicted_score);
  if (score) return score;
  return extractPredictedScore(prediction?.text);
}

function getPredictionConfidence(prediction) {
  const structured = getStructuredPrediction(prediction);
  const value = Number(
    structured?.confidence?.score_out_of_10 ??
    structured?.confidence?.score ??
    structured?.confidence
  );
  return Number.isFinite(value) ? Math.max(0, Math.min(10, Math.round(value * 10) / 10)) : null;
}

function normalizeScore(score) {
  if (!score || typeof score !== "object") return null;
  const home = firstNumber(score.team_a_goals, score.home_goals, score.home, score.team1_goals);
  const away = firstNumber(score.team_b_goals, score.away_goals, score.away, score.team2_goals);
  if (home === null || away === null) return null;
  return {
    home,
    away,
    label: cleanName(score.label) || `${home} - ${away}`
  };
}

function formatScoreObject(score) {
  if (!score) return "";
  return score.label || `${score.home} - ${score.away}`;
}

function extractPredictedScore(text) {
  const scorePatterns = [
    /score\s+(?:probable|pr[ée]vu|final|prono)\s*[:\-]?\s*(\d{1,2})\s*[-:–—]\s*(\d{1,2})/i,
    /prono\s+(?:final)?\s*[:\-]?\s*(?:[^\n\r\d]{0,40})?(\d{1,2})\s*[-:–—]\s*(\d{1,2})/i,
    /\b(\d{1,2})\s*[-:–—]\s*(\d{1,2})\b/
  ];

  for (const pattern of scorePatterns) {
    const match = String(text || "").match(pattern);
    if (match) {
      return { home: Number(match[1]), away: Number(match[2]) };
    }
  }

  return null;
}

function mergePredictionSources(...sourceLists) {
  const sources = [];
  const seen = new Set();
  sourceLists.flat().filter(Boolean).forEach((source) => {
    const url = source.url || source.href;
    if (!url || seen.has(url)) return;
    seen.add(url);
    sources.push({
      url,
      title: source.title || source.name || url,
      used_for: source.used_for || source.usedFor || ""
    });
  });
  return sources.slice(0, 10);
}

function humanizeKey(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function extractSources(data) {
  const sources = [];
  const seen = new Set();

  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (value.type === "url_citation" && value.url && !seen.has(value.url)) {
      seen.add(value.url);
      sources.push({ url: value.url, title: value.title || value.url });
    }
    if (value.url && value.title && String(value.url).startsWith("http") && !seen.has(value.url)) {
      seen.add(value.url);
      sources.push({ url: value.url, title: value.title });
    }
    Object.values(value).forEach(visit);
  };

  visit(data);
  return sources.slice(0, 8);
}

function goBack(fallbackViewId) {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  navigateToView(fallbackViewId);
}

function navigateToView(viewId) {
  if (viewId === "matchesView") {
    window.location.hash = "";
    showView("matchesView");
    return;
  }

  window.location.hash = viewId.replace("View", "");
}

function handleRoute() {
  const hash = window.location.hash.replace(/^#/, "");

  if (hash.startsWith("match=")) {
    const matchId = decodeURIComponent(hash.slice("match=".length));
    state.selectedMatchId = matchId;
    showView("matchView");
    renderMatchPage(matchId);
    return;
  }

  if (hash.startsWith("group=")) {
    const groupId = decodeURIComponent(hash.slice("group=".length));
    showView("groupView");
    renderGroupPage(groupId);
    return;
  }

  if (hash === "stats") {
    showView("statsView");
    return;
  }

  if (hash === "settings") {
    showView("settingsView");
    return;
  }

  state.selectedMatchId = null;
  showView("matchesView");
}

function getRouteValue(key) {
  const hash = window.location.hash.replace(/^#/, "");
  const prefix = `${key}=`;
  return hash.startsWith(prefix) ? hash.slice(prefix.length) : "";
}

function showView(viewId) {
  state.currentView = viewId;
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
}

function closeInfoPopovers() {
  document.querySelectorAll(".info-popover-wrap.open").forEach((wrap) => wrap.classList.remove("open"));
}

function hydrateSettingsForm() {
  els.customPrompt.value = state.settings.customPrompt || DEFAULT_PROMPT;
  els.globalStatsInfo.textContent = state.globalLastSync
    ? `Dernière actualisation: ${formatDateTime(state.globalLastSync)}. Fichier: ${INTERNATIONAL_RESULTS_SIZE_LABEL}.`
    : `Non synchronisé. Fichier à télécharger: ${INTERNATIONAL_RESULTS_SIZE_LABEL}.`;
}

function setSourceState(source, label, syncLabel) {
  state.source = source;
  els.sourceLabel.textContent = label;
  els.lastSyncLabel.textContent = syncLabel;
  els.statusDot.className = "status-dot";
}

function persistCache() {
  writeJson(STORAGE_KEYS.cache, {
    matches: state.matches,
    groups: state.groups,
    teams: state.teams,
    source: state.source,
    lastSync: state.lastSync
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function openGlobalResultsDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(GLOBAL_RESULTS_CACHE.dbName, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(GLOBAL_RESULTS_CACHE.storeName);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readGlobalResultsCache() {
  const db = await openGlobalResultsDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(GLOBAL_RESULTS_CACHE.storeName, "readonly");
    const store = transaction.objectStore(GLOBAL_RESULTS_CACHE.storeName);
    const request = store.get(GLOBAL_RESULTS_CACHE.key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}

async function writeGlobalResultsCache(value) {
  const db = await openGlobalResultsDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(GLOBAL_RESULTS_CACHE.storeName, "readwrite");
    const store = transaction.objectStore(GLOBAL_RESULTS_CACHE.storeName);
    const request = store.put(value, GLOBAL_RESULTS_CACHE.key);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

function extractArray(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  for (const key of ["data", "items", "games", "matches", "results", "groups", "teams"]) {
    if (Array.isArray(value[key])) return value[key];
  }
  return [];
}

function firstNumber(...values) {
  for (const value of values) {
    if (value === 0 || value === "0") return 0;
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function numberOrDash(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : "-";
}

function cleanName(value) {
  if (!value) return "";
  if (typeof value === "object") return cleanName(value.name || value.title || value.en);
  return String(value).replace(/\s+/g, " ").trim();
}

function stableId(home, away, date, index) {
  return `${home || "home"}-${away || "away"}-${date || index}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function teamKey(id, name) {
  return id ? `id:${String(id)}` : `name:${normalizeName(name)}`;
}

function getHistoricalMatchesBefore(match) {
  return state.globalMatches.filter((item) => isHistoricalDateBeforeMatch(item.date, match.date));
}

function rebuildGlobalMatchesIndex() {
  state.algoPredictionCache.clear();
  state.globalMatchesByTeam = new Map();
  for (const match of state.globalMatches) {
    addGlobalMatchToIndex(match.homeName, match);
    addGlobalMatchToIndex(match.awayName, match);
  }
  for (const matches of state.globalMatchesByTeam.values()) {
    matches.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }
}

function addGlobalMatchToIndex(teamName, match) {
  const key = normalizeName(teamName);
  if (!key) return;
  if (!state.globalMatchesByTeam.has(key)) state.globalMatchesByTeam.set(key, []);
  state.globalMatchesByTeam.get(key).push(match);
}

function getIndexedHistoricalMatchesBefore(teamName, date) {
  const matches = state.globalMatchesByTeam.get(normalizeName(teamName)) || [];
  return matches.filter((item) => isHistoricalDateBeforeMatch(item.date, date)).slice(0, 12);
}

function isHistoricalDateBeforeMatch(historyDate, matchDate) {
  if (!historyDate) return false;
  if (!matchDate) return new Date(historyDate).getTime() < Date.now();
  const historyKey = getDateKey(historyDate);
  const matchKey = getDateKey(matchDate);
  if (historyKey && matchKey) return historyKey < matchKey;
  return new Date(historyDate).getTime() < new Date(matchDate).getTime();
}

function getDateKey(value) {
  const raw = String(value || "");
  const direct = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  if (direct) return direct[1];
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function matchIncludesTeamName(match, teamName) {
  return namesEqual(match.homeName, teamName) || namesEqual(match.awayName, teamName);
}

function matchIncludesTeam(match, key) {
  return getTeamSide(match, key) !== null;
}

function getTeamSide(match, key) {
  if (teamKey(match.homeTeamId, match.homeName) === key) return "home";
  if (teamKey(match.awayTeamId, match.awayName) === key) return "away";
  return null;
}

function findGroupRow(teamId, teamName) {
  const id = String(teamId || "");
  const normalized = normalizeName(teamName);
  for (const group of state.groups) {
    const row = group.teams.find((team) => {
      if (id && String(team.id) === id) return true;
      return normalizeName(team.name) === normalized;
    });
    if (row) return row;
  }
  return null;
}

function findFifaRanking(teamNameOrCode) {
  const value = cleanName(teamNameOrCode);
  if (!value) return null;
  const byCode = FIFA_RANKINGS.teams?.[value.toUpperCase()];
  if (byCode) return byCode;

  const normalized = normalizeName(value);
  return Object.values(FIFA_RANKINGS.teams || {}).find((ranking) => {
    const aliases = Array.isArray(ranking.aliases) ? ranking.aliases : [];
    return normalizeName(ranking.name) === normalized
      || normalizeName(ranking.nameFr) === normalized
      || normalizeName(ranking.code) === normalized
      || aliases.some((alias) => normalizeName(alias) === normalized);
  }) || null;
}

function formatFifaRanking(ranking) {
  if (!ranking?.rank) return "Classement FIFA non disponible";
  const points = Number.isFinite(Number(ranking.points)) ? ` - ${formatNumber(ranking.points)} pts` : "";
  return `FIFA #${ranking.rank}${points}`;
}

function formatMatchStageLabel(match) {
  const group = cleanName(match?.group);
  const stage = cleanName(match?.stage);
  if (group) return formatGroupLabel(group);
  if (/^[A-Z]$/i.test(stage)) return formatGroupLabel(stage);
  return stage || "Match";
}

function formatGroupLabel(groupName) {
  const cleanGroup = cleanName(groupName);
  if (!cleanGroup) return "Groupe";
  if (/^groupe\s+/i.test(cleanGroup)) return cleanGroup;
  if (/^group\s+/i.test(cleanGroup)) return cleanGroup.replace(/^group/i, "Groupe");
  return `Groupe ${cleanGroup}`;
}

function findGroupByName(groupName) {
  return state.groups.find((group) => groupNamesEqual(group.name, groupName));
}

function groupNamesEqual(a, b) {
  return normalizeGroupName(a) === normalizeGroupName(b);
}

function normalizeGroupName(value) {
  return cleanName(value).toLowerCase().replace(/^groupe\s+/, "").replace(/^group\s+/, "").trim();
}

function namesEqual(a, b) {
  return normalizeName(a) === normalizeName(b);
}

function normalizeName(value) {
  const normalized = cleanName(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return TEAM_NAME_ALIASES.get(normalized) || normalized;
}

function sortMatches(a, b) {
  const ad = a.date ? new Date(a.date).getTime() : Number.MAX_SAFE_INTEGER;
  const bd = b.date ? new Date(b.date).getTime() : Number.MAX_SAFE_INTEGER;
  return ad - bd;
}

function sortGroupTeams(a, b) {
  const byPoints = Number(b.points) - Number(a.points);
  if (byPoints) return byPoints;
  const byDiff = Number(b.goalDiff) - Number(a.goalDiff);
  if (byDiff) return byDiff;
  const byGoals = Number(b.goalsFor) - Number(a.goalsFor);
  if (byGoals) return byGoals;
  return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
}

function scoreText(score) {
  return score === null || score === undefined ? "·" : String(score);
}

function formatMatchDate(match) {
  if (!match.date) return match.rawDate || "Date à confirmer";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: FRANCE_TIME_ZONE
  }).format(new Date(match.date));
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatElapsedTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "2-digit"
  }).format(new Date(value));
}

function formatNumber(value) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 1
  }).format(value);
}

function renderStatusBadge(status) {
  if (status === "live") return `<span class="badge alert">Live</span>`;
  if (status === "finished") return `<span class="badge">Terminé</span>`;
  return `<span class="badge muted">À venir</span>`;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => els.toast.classList.remove("visible"), 3200);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

