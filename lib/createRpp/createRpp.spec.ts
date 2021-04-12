import { expect } from "chai";
import createRpp from "./createRpp";

describe("createRpp", () => {
  it("creates initial RPP file", () => {
    const rpp = createRpp(undefined, undefined, 1618230825884);
    expect(rpp.parent).to.equal(null);
    expect(rpp.children).to.equal(null);
    expect(rpp.line).to.equal(null);
    expect(rpp.tokens?.length).to.equal(4);
    expect(rpp.tokens?.[0].token).to.equal("REAPER_PROJECT");
    expect(rpp.tokens?.[1].token).to.equal("0.1");
    expect(rpp.tokens?.[2].token).to.equal("6.21/win64");
    expect(rpp.tokens?.[3].token).to.equal(1618230825884);
  });

  it("creates RPP file with predefined values", () => {
    const rpp = createRpp("0.2", "6.10/x64");
    expect(rpp.parent).to.equal(null);
    expect(rpp.children).to.equal(null);
    expect(rpp.line).to.equal(null);
    expect(rpp.tokens?.length).to.equal(4);
    expect(rpp.tokens?.[0].token).to.equal("REAPER_PROJECT");
    expect(rpp.tokens?.[1].token).to.equal("0.2");
    expect(rpp.tokens?.[2].token).to.equal("6.10/x64");
    expect(typeof rpp.tokens?.[3].token).to.equal("number");
  });
});
