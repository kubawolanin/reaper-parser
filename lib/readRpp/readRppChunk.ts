import { RChunk } from "../RChunk";
import { RNode } from "../RNode";
import splitMultiLinesStrToTab from "../utils/splitMultiLinesStrToTab";
import trim from "../utils/trim";

/**
 * Read an Array of lines RPP
 */
export default (inputLines: string) => {
  let root: RChunk | null = null; // when it finds first chunk that is the root
  let chunk: RChunk | null = null; // we got a local chunk
  let parent: RChunk | null | undefined = undefined;
  let lines: string[] = [];

  if (!inputLines.length) {
    new Error("Input string not provided - nothing to read from");
    return null;
  }

  // Prepare input lines as Array
  lines = inputLines.split("\n");

  lines.forEach((line: string) => {
    line = line.trim(); // trim(line);

    let first = line[0];

    // Is this line a Node or a Chunk?
    if (first === "<") {
      // Open new Chunk with current as parent
      chunk = new RChunk(undefined, line.substr(1), parent, []);

      parent = chunk;
      if (!root) {
        root = chunk; // this root Chunk should always end up being <PROJECT ...
      }
    } else if (first === ">") {
      // Close current chunk - back up a level to grand parent
      parent = parent?.parent;
    } else {
      // If parent is null here then we don't have a root chunk so probably not a reaper project
      if (!parent) {
        // console.log(line);
        // throw new Error(`Cannot add new node to nil parent ${line}`);
      }
      // Anything else is a normal node line - add it to current parent
      return new RNode(undefined, line, parent);
    }
  });

  return root;
};
