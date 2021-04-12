import { find, gsub } from "./utils/lua";

export type Token = string | number | null;

export class RToken {
  token: Token;
  constructor(token: Token) {
    this.token = token || null;
  }

  getString() {
    return `${this.token}`; // Not useful but consistent
  }

  getNumber() {
    return Number(this.token);
  }

  getBoolean() {
    // in reaper terms boolean is a string "0" or "1" {
    return this.token != "0";
  }

  setString(token: Token) {
    // We force string- yes always stored as string
    this.token = `${token}`;
  }

  setNumber(token: Token) {
    // NOTE: Maybe check for decimal numbers {
    this.token = Number(token);
  }

  setBoolean(b: boolean) {
    if (b) {
      this.token = "1";
    } else {
      this.token = "0";
    }
  }

  toSafeString(s: string) {
    // check param contains no quotes
    // if needs quotes { surround with correct quotes
    // NOTE: if quotes are present but not needed, they will be deleted - why? Reaper surrounds with different type of quote in that instance i.e "MyQuoted" -> '"MyQuoted"'
    // i.e. You may name your track "Scary" Noise -> '"Scary" Noise' // it's weird but reaper does it - check in an RPP - You can use quotes in names - if a certain quote is present it uses an extra quote that isn't present
    if (!s || s.length === 0) {
      return '""'; // Empty string must be quoted
    } else if (find(s, " ")) {
      // We must quote in weird ways if has spaces
      if (find(s, '"')) {
        if (find(s, "'")) {
          s = gsub(s, "`", "'").join("");
          return `\`${s}\``;
        } else {
          return `'${s}'`;
        }
      } else {
        return `"${s}"`;
      }
    } else {
      return s; // param unchanged - no spaces or quotes required
    }
  }
}
