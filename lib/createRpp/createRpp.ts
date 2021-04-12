import createRChunk from "./createRChunk";

export default (
  version: string = "0.1",
  system: string = "6.21/win64",
  time?: number
) => {
  time = time || Date.now();
  return createRChunk(["REAPER_PROJECT", version, system, time]);
};
