import { expect } from "chai";
import { RToken } from "./RToken";
describe("RToken", () => {
  it("defaults", () => {
    const token = new RToken("TEST");
    expect(token.token).to.equal("TEST");
  });

  it("getString", () => {
    const token = new RToken("TEST");
    expect(typeof token.getString()).to.equal("string");
  });
  it("getNumber", () => {
    const token = new RToken("TEST");
    const token2 = new RToken("1234.55555");

    expect(token.getNumber()).to.be.NaN;
    expect(token2.getNumber()).to.equal(1234.55555);
  });
  it("getBoolean", () => {
    const token = new RToken("TEST");
    const token2 = new RToken("1");
    const token3 = new RToken("0");
    expect(token.getBoolean()).to.equal(true);
    expect(token2.getBoolean()).to.equal(true);
    expect(token3.getBoolean()).to.equal(false);
  });
  it("setString", () => {
    const token = new RToken("TEST");
    token.setString("TEST2");
    expect(token.token).to.equal("TEST2");
  });
  it("setNumber", () => {
    const token = new RToken("");
    token.setNumber("5.99");
    expect(token.token).to.equal(5.99);
  });
  it("setBoolean", () => {
    const token = new RToken("");
    const token2 = new RToken("");
    token.setBoolean(false);
    token2.setBoolean(true);
    expect(token.token).to.equal("0");
    expect(token2.token).to.equal("1");
  });
  it("toSafeString", () => {
    const token = new RToken("");
    expect(token.toSafeString("")).to.equal('""');
    expect(token.toSafeString('"Scary" Noise')).to.equal('`"Scary" Noise`');
    expect(token.toSafeString('"Quoted" String')).to.equal('`"Quoted" String`');
    expect(token.toSafeString("`Quoted` String")).to.equal("`'Quoted' String`");
    expect(token.toSafeString("'1234'")).to.equal("`'1234'`");
  });
});
