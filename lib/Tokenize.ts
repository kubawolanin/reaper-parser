import { RToken } from "./RToken";
import isWhiteSpace from "./utils/isWhiteSpace";

export default (line: string | null) => {
  if (!line) {
    throw new Error("String `line` attribute must be provided.");
  }

  let index = 0;
  const tokens = [];
  while (index <= line.length) {
    let token = "";
    let c = "";

    // ignore white space
    while (index <= line.length) {
      c = line[index];
      if (isWhiteSpace(c)) {
        break;
      }
      index = index + 1;
    }

    // Check if next character a quote
    c = line[index];
    let quote = false;
    let quoteChar: string | number = 0; // originally 0
    if (c === "'" || c === '"' || c === "`") {
      quote = true;
      quoteChar = c;
    } else {
      token = token + c;
    }
    index = index + 1;

    // read till quote or whitespace
    while (index <= line.length) {
      c = line[index];
      index = index + 1; // fixed increment

      if (quote) {
        if (c === quoteChar) {
          break;
        } else {
          token = token + c;
        }
      } else {
        if (isWhiteSpace(c)) {
          break;
        } else {
          token = token + c;
        }
      }
    }
    tokens.push(new RToken(token));
  }

  return tokens;
};
