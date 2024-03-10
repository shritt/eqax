import assert from "assert";
import puppeteer from "puppeteer";
import { Standard, kayle, htmlcsRules } from "kayle";

import { drakeMock } from "./mocks/html-mock";
import { performance } from "perf_hooks";

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  const startTime = performance.now();
  const { issues, pageUrl, documentTitle, meta, automateable } = await kayle({
    page,
    browser,
    runners: ["htmlcs"],
    includeWarnings: true,
    html: drakeMock,
    standard: Standard.WCAG2AA,
    ignore: htmlcsRules.map((r) => r.ruleId),
    origin: "https://www.drake.com", // origin is the fake url in place of the raw content
  });
  const nextTime = performance.now() - startTime;

  console.log(meta);
  console.log(automateable);
  console.log("time took", nextTime);
  console.log(issues);

  // valid list
  assert(Array.isArray(issues));
  // assert(meta.errorCount <= 0);
  // assert(meta.warningCount === 0);
  // assert(meta.accessScore <= 100);

  assert(typeof pageUrl === "string");
  assert(typeof documentTitle === "string");

  await browser.close();
})();