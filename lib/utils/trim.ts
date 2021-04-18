/**
 * remove trailing and leading whitespace from string.
 */

import { gsub } from "./lua";

export default (s) => {
  return gsub("^%s*(.-)%s*$", "%1");
};
