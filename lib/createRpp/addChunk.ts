import { RChunk } from "./../RChunk";
import createRChunk from "./createRChunk";

export default (parent: RChunk, table: any[]) => {
  const chunk = createRChunk(table);
  return parent.addNode(chunk);
};
