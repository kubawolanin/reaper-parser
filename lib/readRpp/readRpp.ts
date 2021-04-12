const fs = require("fs").promises;
const path = require("path");
import readRppChunk from "./readRppChunk";

/**
 * Read RPP file
 */
export default async (filename: string) => {
  if (!filename) {
    throw new Error(`filename not provided`);
  }

  const rppFile = await fs.readFile(filename, "utf8");

  return readRppChunk(rppFile);
};
