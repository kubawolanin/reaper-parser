import { RNode } from "../RNode";
import createRTokens from "./createRTokens";

export default (variable: any[] | string) => {
  let node;
  if (Array.isArray(variable)) {
    node = new RNode(createRTokens(variable));
  } else {
    node = new RNode(undefined, variable);
  }
  return node;
};
