const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  throw new Error("BASE_URL is required (for example, http://localhost:8080)");
}

const expectedLinks = [
  "https://reto.kilotontotal.com/login",
  "https://reto.kilotontotal.com/registro",
];

async function fetchWithTimeout(path) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response;
}

const healthResponse = await fetchWithTimeout("/api/health");
const health = await healthResponse.json();

if (health.status !== "ok") {
  throw new Error("Health response did not contain status=ok");
}

const homeResponse = await fetchWithTimeout("/");
const home = await homeResponse.text();

for (const link of expectedLinks) {
  if (!home.includes(`href="${link}"`)) {
    throw new Error(`Home page is missing critical link: ${link}`);
  }
}

console.log(`Smoke tests passed for ${new URL(baseUrl).origin}`);
