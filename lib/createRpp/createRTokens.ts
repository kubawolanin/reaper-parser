import { RToken } from "../RToken";

export default (table: any[]) => {
  const tokens: RToken[] = [];

  table.forEach((token) => {
    tokens.push(new RToken(token));
  });

  return tokens;
};
