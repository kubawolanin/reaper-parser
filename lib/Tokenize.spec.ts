import { expect } from "chai";
import Tokenize from "./Tokenize";

describe("Tokenize", () => {
  it("defaults", () => {
    const line = `  <TRACK {F06B0DA2-3D91-48FD-A7EC-618D5AFAF84D}    `;
    const tokenized = Tokenize(line);

    expect(Array.isArray(tokenized)).to.equal(true);
    expect(tokenized.length).to.equal(4);
    expect(tokenized[1].token).to.equal(
      " {F06B0DA2-3D91-48FD-A7EC-618D5AFAF84D}"
    );
    expect(tokenized[3].token).to.equal(" undefined");
  });
});
