import { RNode } from "../RNode";
import createRTokens from "./createRTokens";

export default (node: RNode, table: any[]) => {
  const tokens = createRTokens(table);
  node.tokens = tokens;
  return tokens;
};
