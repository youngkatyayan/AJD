import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";
import 'colors'
const app = express();
const PORT = 8080;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const countWords = (text) => (text.trim().length > 0 ? text.trim().split(/\s+/).length : 0);

app.post("/api/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const formattedUrl = url.startsWith("http") ? url : `http://${url}`;
    await page.goto(formattedUrl, { waitUntil: "domcontentloaded" });

    const totalText = await page.evaluate(() => {
        const excludedSelectors = [
          "nav", "header", "footer", "aside", ".sidebar", ".ads",
          "script", "style", ".popup", ".advertisement", ".hidden",
          ".footer-links", ".social-share", ".related-posts"
        ];
        excludedSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => el.remove());
          });;

          return document.body.innerText.replace(/\s+/g, " ").trim();
    });
    const totalWordCount = countWords(totalText);

    const articleText = await page.evaluate(() => {
      const selectors = [
        "article",
        "main",
        ".post-content",
        ".entry-content",
        ".blog-post",
        ".content-area",
        ".single-post",
        "section",
      ];

      let content = "";
      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element && element.innerText.trim().length > 200) {
          content = element.innerText.replace(/\s+/g, " ").trim(); 
          break;
        }
      }
      return content;
    });
    const articleWordCount = countWords(articleText);

    await browser.close();

    res.json({
      url: formattedUrl,
      totalWordCount,
      articleWordCount,
    });
  } catch (error) {
    console.error(`Error scraping URL: ${error.message}`);
    res.status(500).json({ error: "Failed to scrape the URL. Please check the URL and try again." });
  }
});

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.bgCyan.white);
});
