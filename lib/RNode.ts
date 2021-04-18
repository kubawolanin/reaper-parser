import { RChunk } from "./RChunk";
import type { RToken, Token } from "./RToken";
import Tokenize from "./Tokenize";

export class RNode {
  parent: RChunk | null | undefined;
  children: RNode[] | null;
  line: string | null;
  tokens: RToken[] | null;

  constructor(
    tokens?: RToken[],
    line?: string,
    parent?: RChunk | null,
    children?: RNode[]
  ) {
    this.parent = parent || null;
    this.children = children || null;
    this.line = line || null;
    this.tokens = tokens || null;

    if (parent) {
      parent.addNode(this);
    }

    if (line) {
      this.getTokens();
    }
  }

  getTokens() {
    if (!this.tokens) {
      // Lazy load tokens if not already done
      this.tokens = Tokenize(this.line); // now one line easier to read
    }
    // it only exists if we query or modify a node - it override line
    // the writer will want to use these if they exist
    return this.tokens;
  }

  // get a token if it exists otherwise null
  getToken(index: number) {
    // Needs to be lazy loaded // Tokens always exists
    let tokens = this.getTokens();
    // this will be null if index doesn't exist
    return tokens[index];
  }

  getName() {
    // Get first token of line
    const token = this.getToken(0);
    return token.getString();
  }

  getParam(index: number) {
    return this.getToken(index + 1);
  }

  getTokensAsLine() {
    let table = [];
    this.getTokens().forEach((token, i) => {
      table.push(token.toSafeString(token.getString()));
    });
    table.push(" ");
    return table;
  }

  remove() {
    if (this.parent) {
      this.parent.children?.splice(this.parent?.indexOf(this), 1);
    }
    return null;
  }
}
