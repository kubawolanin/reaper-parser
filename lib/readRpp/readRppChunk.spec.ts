import { expect } from "chai";
import * as fsPackage from "fs";
import readRppChunk from "./readRppChunk";

const fs = fsPackage.promises;

describe("readRppChunk", () => {
  it("reads RPP from empty string", () => {
    const rpp = readRppChunk("");
    expect(rpp).to.equal(null);
  });
  it("reads RPP from string input", async () => {
    const rppFile = await fs.readFile("./test/test-file.rpp", "utf8");
    const rpp = readRppChunk(rppFile);

    console.log(rpp);
    expect(rpp).to.equal(null);
  });
});
