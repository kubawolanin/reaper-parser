const argv = require("minimist")(process.argv.slice(2));
const config = require("config");
const fs = require("fs");
const path = require("path");
const parse = require("./parse");
const writeMidi = require("./writeMidi");

const parser = (inputFile, config) => {
  config = {
    ...config,
  };

  if (!inputFile) {
    return console.error("Input file is missing!");
  }

  const rppText = fs.readFileSync(path.resolve(inputFile), {
    encoding: "utf8",
  });
  const parsed = parse(rppText);
  writeMidi(parsed);

  console.log({ parsed });
};

if (require.main === module) {
  parser(argv._[0], config);
}

module.exports = {
  parser,
};
