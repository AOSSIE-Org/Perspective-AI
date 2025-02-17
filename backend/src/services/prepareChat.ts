import { loadSampleDataforDebate, loadsampledataForInput } from "./astraDb";
import { scrapePage } from "./scrapePage";

export const preparechat = async (url: string) => {
  // get the title for the user input
  const res = await loadsampledataForInput(url);
  // scrape the web for the data relevant to the input
  const data = await loadSampleDataforDebate(res as string);
  return {};
  // ask llm build some counter questions based on that information
};
