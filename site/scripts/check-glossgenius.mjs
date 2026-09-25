// Compares content/services.ts with Jenna's live GlossGenius service menu:
// booking tokens, names, prices and durations. Run with `npm run check:booking`
// before each deploy and whenever she edits her menu. Exits 1 on any mismatch.
//
// It reads the page data GlossGenius embeds in its HTML (__NEXT_DATA__). That
// format is undocumented, so if it changes this script fails rather than
// passing silently.
import { siteConfig } from "../config/site.ts";
import { services } from "../content/services.ts";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

function fail(message) {
  console.error(`\n✗ ${message}`);
  process.exit(1);
}

async function fetchGlossGeniusServices() {
  const response = await fetch(siteConfig.bookingUrl, {
    headers: { "user-agent": USER_AGENT },
  });
  if (!response.ok) {
    fail(`GlossGenius returned HTTP ${response.status} for ${siteConfig.bookingUrl}`);
  }
  const html = await response.text();
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );
  if (!match) fail("No __NEXT_DATA__ on the GlossGenius page; its format has changed.");

  const users = JSON.parse(match[1])?.props?.serverContext?.publicUser?.users;
  const list = Array.isArray(users) ? users.flatMap((u) => u.services ?? []) : [];
  if (list.length === 0) {
    fail("No services found in the GlossGenius page data; its format has changed.");
  }
  return list;
}

const toNumber = (value) => Number.parseFloat(String(value).replace(/[^0-9.]/g, ""));

const remote = await fetchGlossGeniusServices();
const problems = [];
const matched = new Set();

for (const service of services) {
  const byToken = service.bookingToken
    ? remote.find((r) => r.token === service.bookingToken)
    : undefined;
  const byName = remote.find((r) => r.name === service.name);
  const gg = byToken ?? byName;

  if (service.bookingToken && !byToken) {
    problems.push(
      byName
        ? `${service.name}: bookingToken is stale. GlossGenius now uses ${byName.token}`
        : `${service.name}: bookingToken not found on GlossGenius`,
    );
  }
  if (!gg) {
    problems.push(`${service.name}: not on the GlossGenius menu`);
    continue;
  }
  matched.add(gg.token);

  if (gg.name !== service.name) {
    problems.push(`${service.name}: GlossGenius name is "${gg.name}"`);
  }
  if (toNumber(gg.price) !== toNumber(service.price)) {
    problems.push(`${service.name}: price is ${service.price} on the site, $${gg.price} on GlossGenius`);
  }
  if (Number(gg.total_duration) !== toNumber(service.duration)) {
    problems.push(`${service.name}: duration is ${service.duration} on the site, ${gg.total_duration} min on GlossGenius`);
  }
}

for (const r of remote) {
  if (!matched.has(r.token)) {
    problems.push(`"${r.name}" ($${r.price}, ${r.total_duration} min) is on GlossGenius but not on the site`);
  }
}

if (problems.length > 0) {
  fail(`Site services differ from GlossGenius:\n  - ${problems.join("\n  - ")}`);
}
console.log(`✓ ${services.length} services match GlossGenius (${siteConfig.bookingUrl})`);
