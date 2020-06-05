const nearley = require("nearley");
const grammar = require("./grammar.js");

module.exports = function parse(file, options = {}) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  let project = {};

  parser.feed(file);

  return project;
};
