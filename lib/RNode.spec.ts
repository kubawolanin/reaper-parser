import { RChunk } from "./RChunk";
import { RToken } from "./RToken";
import { expect } from "chai";
import { RNode } from "./RNode";
describe("RNode", () => {
  let arr: string[];
  let nodeTokens: RToken[];
  beforeEach(() => {
    arr = [
      " <METRONOME 6 2",
      "   VOL 0.25 0.125",
      "   FREQ 800 1600 1",
      "   BEATLEN 4",
      '   SAMPLES "" ""',
      "   PATTERN 2863311530 2863311529",
      " >",
    ];
    nodeTokens = arr.map((line) => new RToken(line));
  });
  it("getTokens", () => {
    const nodeTokens = arr.map((line) => new RToken(line));
    const node = new RNode(nodeTokens);
    const tokens = node.getTokens();
    expect(tokens.length).to.equal(7);
    expect(tokens[4].token).to.equal('   SAMPLES "" ""');
  });

  it("getToken", () => {
    const nodeTokens = arr.map((line) => new RToken(line));
    const node = new RNode(nodeTokens);
    const token = node.getToken(2);
    expect(token.token).to.equal("   FREQ 800 1600 1");
  });
  it("getName", () => {
    const nodeTokens = arr.map((line) => new RToken(line));
    const node = new RNode(nodeTokens);
    const name = node.getName();
    expect(name).to.equal(" <METRONOME 6 2");
  });
  it("getParam", () => {
    const nodeTokens = arr.map((line) => new RToken(line));
    const node = new RNode(nodeTokens);
    const param = node.getParam(0);
    expect(param.token).to.equal("   VOL 0.25 0.125");
  });
  it("getTokensAsLine", () => {
    const nodeTokens = arr.map((line) => new RToken(line));
    const node = new RNode(nodeTokens);
    const tokensAsLine = node.getTokensAsLine();
    expect(Array.isArray(tokensAsLine)).to.equal(true);
    expect(tokensAsLine.length).to.equal(8);
    expect(tokensAsLine[0]).to.equal("` <METRONOME 6 2`");
    expect(tokensAsLine[8]).to.equal(undefined);
  });
  it("remove", () => {
    const nodeTokens = arr.map((line) => new RToken(line));
    const parent = new RChunk();
    const node = new RNode(nodeTokens, undefined, parent);
    expect(node.parent?.children?.length).to.equal(1);
    const remove = node.remove();
    expect(remove).to.equal(null);
    expect(node.parent?.children?.length).to.equal(0);
  });
});
