const file = "";
let project = {};
const source = /<SOURCE MIDI[^>]*>/g;

const mapSource = (source) => {
  const event = /\sE .+/g;
  const events = [...source[0].matchAll(event)].map((s) =>
    s[0].replace(/\sE\s/, "")
  );

  console.log(events);

  return {
    type: "MIDI",
    events,
  };
};

project.sources = [...file.matchAll(source)].map(mapSource);
