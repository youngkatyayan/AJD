import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { htmlToText } from "html-to-text";
import 'colors'

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

const countWords = (text) => (text.trim().length > 0 ? text.trim().split(/\s+/).length : 0);

app.post("/api/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    const { data: htmlContent } = await axios.get(url);

    const totalReadableText = htmlToText(htmlContent, {
      wordwrap: false,
      preserveNewlines: false,
      selectors: [
        { selector: "img", format: "skip" }, 
        { selector: "nav", format: "skip" }, 
        { selector: "footer", format: "skip" }, 
      ],
    });
    const totalWordCount = countWords(totalReadableText);

    const dom = new JSDOM(htmlContent, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    let articleText = "";
    if (article && article.textContent) {
      articleText = article.textContent;
    }
    const articleWordCount = countWords(articleText);

    res.json({
      url,
      totalWordCount,
      articleWordCount,
    });
  } catch (error) {
    console.error(`Error scraping URL: ${error.message}`);
    res.status(500).json({ error: "Failed to scrape the URL. Please check the URL and try again." });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.bgMagenta.white);
});
