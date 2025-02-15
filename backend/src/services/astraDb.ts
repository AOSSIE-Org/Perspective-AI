import { Pinecone } from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/db_data";
import OpenAI from "openai";
import { DataAPIClient, Db, VectorizeDoc } from "@datastax/astra-db-ts";
import { Collection } from "@datastax/astra-db-ts";
import { scrapePage } from "./scrapePage";
import { scrapeInput } from "./scrapeInput";
import { data } from "cheerio/dist/commonjs/api/attributes";

console.log(
  process.env.OPENAI_API_KEY,
  "--------------------------------------------------------"
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const { ASTRA_DB_API_ENDPOINT: endpoint, ASTRA_DB_APPLICATION_TOKEN: token } =
  process.env;

if (!token || !endpoint) {
  throw new Error(
    "Environment variables ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN must be defined."
  );
}

// Create an instance of the `DataAPIClient` class with your token.
const client = new DataAPIClient(token);

// Get the database specified by your endpoint.
const database = client.db(endpoint);

console.log(`Connected to database ${database.id}`);

const scrapeData = ["https://www.snopes.com/", "https://www.factcheck.org/"];

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

async function createCollection() {
  const collectionName = process.env.ASTRA_DB_COLLECTION!;
  const collection = await database.listCollections();

  if (collection.find((c) => c.name === collectionName)) {
    console.log(`${collectionName} already exists.`);
    return collection;
  }
  console.log(collection, "listCollections");

  const newCollection = await database.createCollection(collectionName, {
    vector: {
      dimension: 1536,
      metric: "dot_product",
    },
  });
  console.log(
    `Created collection ${newCollection.keyspace}.${newCollection.collectionName}`
  );
  return newCollection;
}

export const loadSampleDataforDebate = async (title: string) => {
  const collection = database.collection(process.env.ASTRA_DB_COLLECTION!);

  const content = await scrapePage(
    "https://www.factcheck.org/search/#gsc.tab=0",
    title
  );
  console.log(content);

  // const chunks = await splitter.splitText(content as string);
  // for await (const chunk of chunks) {
  //   const embedding = await openai.embeddings.create({
  //     model: "text-embedding-3-small",
  //     input: chunk,
  //     encoding_format: "float",
  //   });
  //   const vector = embedding.data[0].embedding;
  //   const res = await collection.insertOne({ text: chunk, $vector: vector });
  //   console.log(res);
  // }
};

export const loadsampledataForInput = async (url: string) => {
  await createCollection();
  const collection = await database.collection(
    process.env.ASTRA_DB_COLLECTION!
  );
  console.log("created collection: " + collection);

  const result = await scrapeInput(url);

  //console.log(result);

  // const chunks = await splitter.splitText(result as string);
  // console.log("reached for embeedings");

  // for await (const chunk of chunks) {
  //   const embedding = await openai.embeddings.create({
  //     model: "text-embedding-ada-002",
  //     input: chunk,
  //     encoding_format: "float",
  //   });
  //   const vector = embedding.data[0].embedding;
  //   const res = await collection.insertOne({ text: chunk, $vector: vector });
  //console.log(res);
  //}
  return result;
};
