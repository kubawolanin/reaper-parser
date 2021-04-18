import { expect } from "chai";
import Tokenize from "./Tokenize";

describe("Tokenize", () => {
  it("defaults", () => {
    const line = `  <TRACK {F06B0DA2-3D91-48FD-A7EC-618D5AFAF84D}    `;
    const tokenized = Tokenize(line);

    expect(Array.isArray(tokenized)).to.equal(true);
    expect(tokenized.length).to.equal(8);
    expect(tokenized[2].token).to.equal("<TRACK");
    expect(tokenized[3].token).to.equal(
      "{F06B0DA2-3D91-48FD-A7EC-618D5AFAF84D}"
    );
  });
});
