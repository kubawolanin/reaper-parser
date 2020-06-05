const nodes = {
  reaperProject: "REAPER_PROJECT",
  recordCfg: "RECORD_CFG",
  applyfxCfg: "APPLYFX_CFG",
  renderCfg: "RENDER_CFG",
  metronome: "METRONOME",
  masterplayspeedenv: "MASTERPLAYSPEEDENV",
  tempoenvex: "TEMPOENVEX",
  projbay: "PROJBAY",
  track: "TRACK",
  fxchain: "FXCHAIN",
  vst: "VST",
  item: "ITEM",
  source: "SOURCE",
  x: "X",
  extensions: "EXTENSIONS",
  swsautocolor: "SWSAUTOCOLOR",
};

const itemProps = {
  position: "POSITION", // number
  snapoffs: "SNAPOFFS", // number
  length: "LENGTH", // number
  loop: "LOOP", // number
  alltakes: "ALLTAKES", // number
  fadein: "FADEIN", // Array<number>
  fadeout: "FADEOUT", // Array<number>
  mute: "MUTE", // number
  sel: "SEL", // number
  iguid: "IGUID", // GUID
  iid: "IID", // number
  name: "NAME", // string
  volpan: "VOLPAN", // Array<number>
  soffs: "SOFFS", // Array<number>
  playrate: "PLAYRATE", // Array<number>
  chanmode: "CHANMODE", // number
  guid: "GUID", // GUID
  recpass: "RECPASS", // number
  source: "SOURCE", // Source
};

const sourceProps = {
  midi: "MIDI",
  hasdata: "HASDATA", // 1 960 QN
  pooledevts: "POOLEDEVTS", // {985A77C5-70EE-4D78-AD6A-A66630D3A906}
  guid: "GUID", // GUID
  igntempo: "IGNTEMPO", // Array<number> 0 120 4 4
  srccolor: "SRCCOLOR", // number 29
  vellane: "VELLANE", // Array<number>
  cfgeditview: "CFGEDITVIEW", // Array<number>
  keysnap: "KEYSNAP", // number
  tracksel: "TRACKSEL", // number
  evtfilter: "EVTFILTER", // Array<number>
  cfgedit: "CFGEDIT", // Array<number>
  e: "E", // Array<MidiEvent> 0 b0 58 20
};

// track: Array

// track: {
//     fxchain: [vst],
//     items: [item]
// }

module.exports = {
  nodes,
  itemProps,
  sourceProps,
};
