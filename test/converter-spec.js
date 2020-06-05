const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const test = require("tape");
const { parser } = require("../index");
// const defaultConfig = require("../config/default.json");

test("should convert test data to files", async (t) => {
  const OUTPUT_PATH = "./test/notes1";
  const config = {};

  await mkdirp(OUTPUT_PATH);

  parser("./test/test-file.rpp", config);

  t.ok(fs.existsSync(OUTPUT_PATH), "notes folder exists");

  const outputFiles = fs.readdirSync(OUTPUT_PATH);
  t.equal(outputFiles.length, 22, "there are 22 notes");

  outputFiles.forEach((file) =>
    t.equal(path.extname(file), ".mdx", `${file} has the right extension`)
  );

  await rimraf(OUTPUT_PATH, (err) => {
    if (err) {
      console.error(err);
    }
  });
});
