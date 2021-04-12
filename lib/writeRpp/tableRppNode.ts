import { RChunk } from "../RChunk";
import { RNode } from "../RNode";

// Indentations table to save performance. 10 is limit, more should be not needed.
const indentations = [""];
for (let i = 1; i < 10; i++) {
  indentations[i] = `${indentations[i - 1]}  `;
}

const tableRppNode = (node: RNode, indent: number = 0, table: any[] = []) => {
  table.push(indentations[indent]); // this must not write a new line

  if (node instanceof RChunk) {
    table.push("<"); // Open chunk
  }

  if (node.tokens) {
    table.push(node.getTokensAsLine());
  } else {
    // No tokens so assume wasn't modified and use original line again
    table.push(node.line);
  }

  table.push("\n");

  if (node instanceof RChunk) {
    // Write children
    if (node.children) {
      node.children.forEach((child) => {
        tableRppNode(child, indent + 1, table);
      });
    }

    // } chunk line
    table.push(indentations[indent]);
    table.push(">\n");
  }

  return table.join("");
};

export default tableRppNode;
