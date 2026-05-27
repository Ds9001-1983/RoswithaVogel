import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:4321/";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("PAGE ERROR: " + e.message));
page.on("console", (msg) => { if (msg.type() === "error") errors.push("CONSOLE: " + msg.text()); });

await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(800);

// Top hero (scrolled to 0)
await page.screenshot({ path: "/tmp/rovo-1-hero.png", fullPage: false });

// Scroll to Bio
await page.evaluate(() => document.querySelector("#bio")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/rovo-2-bio.png", fullPage: false });

await page.evaluate(() => document.querySelector("#video")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/rovo-3-video.png", fullPage: false });

await page.evaluate(() => document.querySelector("#buecher")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/rovo-4-buecher.png", fullPage: false });

await page.evaluate(() => document.querySelector("#galerie")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(1200);
await page.screenshot({ path: "/tmp/rovo-5-galerie.png", fullPage: false });

// Footer
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/rovo-6-footer.png", fullPage: false });

// Mobile snapshot
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mp = await mobile.newPage();
await mp.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await mp.waitForTimeout(800);
await mp.screenshot({ path: "/tmp/rovo-mobile-hero.png", fullPage: false });
await mp.evaluate(() => document.querySelector("#galerie")?.scrollIntoView({ behavior: "instant", block: "start" }));
await mp.waitForTimeout(1000);
await mp.screenshot({ path: "/tmp/rovo-mobile-galerie.png", fullPage: false });

await browser.close();

if (errors.length) {
  console.log("ERRORS:");
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
console.log("OK — keine JS-Fehler. Screenshots in /tmp/rovo-*.png");
