import { RNode } from "./../RNode";
const fs = require("fs").promises;
import stringifyRppNode from "./stringifyRppNode";

/**
 * Create write a .rpp from root node
 */
export default async (filename: string, chunk: RNode) => {
  if (!filename) {
    throw new Error("No file name");
  }
  if (!chunk) {
    throw new Error("No chunk passed");
  }
  const str = stringifyRppNode(chunk);

  await fs.writeFile(filename, str, "utf8");

  //   throw new Error("Writing to file failed\n${filename}");
};
