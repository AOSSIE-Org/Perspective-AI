import express from "express";
import "dotenv/config";
import { scrapePage } from "./services/scrapePage";
import { scrapeInput } from "./services/scrapeInput";
import { loadsampledataForInput } from "./services/astraDb";
import { preparechat } from "./services/prepareChat";

const app = express();
app.use(express.json());
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/process-url", async (req, res) => {
  const { url } = req.body;
  const data = await preparechat(url);
  res.json(data);
});

//scrapePage("https://www.factcheck.org/search/#gsc.tab=0", "elections in usa");
app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
