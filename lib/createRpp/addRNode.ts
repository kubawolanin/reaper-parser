import { RChunk } from "./../RChunk";
import createRNode from "./createRNode";

export default (parent: RChunk, input: any[] | string) => {
  const node = createRNode(input);
  return parent.addNode(node);
};
