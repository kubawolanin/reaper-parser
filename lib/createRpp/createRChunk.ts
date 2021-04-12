import { RChunk } from "../RChunk";
import createRTokens from "./createRTokens";

export default (table: any[]) => {
  const tokens = createRTokens(table);
  return new RChunk(tokens);
};
