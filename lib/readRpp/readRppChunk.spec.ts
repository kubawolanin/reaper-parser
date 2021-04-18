import * as chai from "chai";
import { expect } from "chai";
import * as chaiSnapshot from "mocha-chai-snapshot";
import * as fsPackage from "fs";
import readRppChunk from "./readRppChunk";

chai.use(chaiSnapshot);

const fs = fsPackage.promises;

describe("readRppChunk", () => {
  it("reads RPP from empty string", () => {
    const rpp = readRppChunk("");
    expect(rpp).to.equal(null);
  });
  it("reads RPP from string input", async () => {
    const rppFile = await fs.readFile("./test/test-file.rpp", "utf8");
    const rpp = readRppChunk(rppFile);

    if (rpp) {
      const tempo = rpp.children?.find((child: any) =>
        child.line.includes("TEMPO ")
      );
      expect(tempo.line).to.equal("TEMPO 120 4 4");
    }
  });

  it("lists all tracks from string input", async () => {
    const rppFile = await fs.readFile("./test/test-file.rpp", "utf8");
    const rpp = readRppChunk(rppFile);

    // console.log(rpp);

    if (rpp) {
      // Buffer.from(rpp.children[63].children[23].children[5].children[0].line, "base64").toString()

      const tracks = rpp.children?.filter((child: any) =>
        child.line.includes("TRACK ")
      );
      // expect(tempo.line).to.equal("TEMPO 120 4 4");
    }
  });
});
