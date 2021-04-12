/**
 * Is the character a white space or a new line or a tab
 */
export default (c: string) => {
  return c == " " || c == "\t" || c == "\n";
};
