import { RToken } from "./RToken";

export default (line: string | null) => {
  if (!line) {
    throw new Error("String `line` attribute must be provided.");
  }

  return line.split(/\s/).map((token) => new RToken(token));
};
