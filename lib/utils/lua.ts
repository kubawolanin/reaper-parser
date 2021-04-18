/**
 * Source:
 * https://github.com/ghoulsblade/love-webplayer/blob/9a62c2af1a9482e9470f0c6cac16ae27b4fae77c/js/lua-parser-utils.js
 */

export const translatePattern = (pattern: string, plain?: boolean) => {
  if (!plain) {
    pattern = pattern.replace(/%a/g, "\\w"); // lua:%a=(all letters) js:\w=(alphanumeric and _) -> incorrect, but [abcd...] wouldn't work inside set : [xy%a]
    pattern = pattern.replace(/%/g, "\\");
    pattern = pattern.replace(/%/g, "\\");
    pattern = pattern.replace(/-/g, "*"); // 0 or more, unlike * : shortest
    // TODO: finish implementation, this is just a rough estimate
  } else {
    // TODO: escape regexp special chars
  }
  return pattern;
};

export const find = (
  s: string,
  pattern: string,
  init?: any,
  plain?: boolean
) => {
  // very basic version to find literal pattern hits without regexp, and simple regexp
  pattern = translatePattern(pattern, plain);
  var results =
    init != undefined ? s.match(pattern /*, init*/) : s.match(pattern);
  if (!results) return [];
  var pos_start = s.search(results[0]);
  var pos_end = pos_start + results[0].length - 1;
  var res = [pos_start + 1, pos_end + 1];
  for (var i = 1; i < results.length; ++i) {
    res.push(Number(results[i]));
  }
  return res;
};

export const gsub = (s: string, pattern: string, repl?: string, n?: number) => {
  // TODO: finish implementation, this is just a rough estimate
  // very basic version to find literal pattern hits without regexp, and simple regexp
  // TODO: n ~= nil not yet implemented

  //~ MainPrint("string.gsub pattern0=",pattern);
  //~ MainPrint("string.gsub repl0=",repl);

  //~ Returns a copy of s in which all (or the first n, if given)
  pattern = translatePattern(pattern);
  pattern = pattern.replace(/\//g, "\\/"); // escape / before eval
  pattern = eval("/" + pattern + "/g"); // construct "real" regexp object so . works and we replace all not just the 1st

  if (!repl) {
    repl = "";
  }

  // References the submatched substrings inside parenthesized expressions
  repl = repl.replace(/%1/g, "\\$1");
  repl = repl.replace(/%2/g, "\\$2");
  repl = repl.replace(/%3/g, "\\$3");
  repl = repl.replace(/%4/g, "\\$4");
  repl = repl.replace(/%5/g, "\\$5");
  repl = repl.replace(/%6/g, "\\$6");
  repl = repl.replace(/%7/g, "\\$7");
  repl = repl.replace(/%8/g, "\\$8");

  //~ MainPrint("string.gsub pattern1=",pattern);
  //~ MainPrint("string.gsub repl1=",repl);

  repl = repl.replace(/%%/g, "%");

  //~ MainPrint("string.gsub pattern2=",pattern);
  //~ MainPrint("string.gsub repl2=",repl);

  //~ MainPrint("string.gsub s=",s,"result=",s.replace(pattern,repl));
  //~ MainPrint("string.gsub test=",s.replace(".","%%."));
  //~ MainPrint("string.gsub test01=","aaa.".replace("a","b"));
  //~ MainPrint("string.gsub test02=","aaa.".replace(".","b"));
  //~ MainPrint("string.gsub test03=","aaa.".replace("\.","b"));
  //~ MainPrint("string.gsub test04=","aaa.".replace("\\.","b"));
  //~ MainPrint("string.gsub test05=","aaa.".replace(/./g,"b"));
  //~ MainPrint("string.gsub test06=","aaa.".replace(eval("/./g"),"b"));

  return [s.replace(pattern, repl)];
};
