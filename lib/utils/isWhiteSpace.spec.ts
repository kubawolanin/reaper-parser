import { expect } from "chai";
import isWhiteSpace from "./isWhiteSpace";

describe("isWhiteSpace", () => {
  it("returns true", () => {
    expect(isWhiteSpace(" ")).to.equal(true);
    expect(isWhiteSpace("\t")).to.equal(true);
    expect(isWhiteSpace("\n")).to.equal(true);
  });
  it("returns false", () => {
    expect(isWhiteSpace("n")).to.equal(false);
    expect(isWhiteSpace("9")).to.equal(false);
    expect(isWhiteSpace("\r")).to.equal(false);
  });
});
