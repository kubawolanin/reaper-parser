export default (str: string) => {
  return str.replace(/^\s*$(?:\r\n?|\n)/gm, "").split("\n");
};
