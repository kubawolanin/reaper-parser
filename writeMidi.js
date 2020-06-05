const midiWriter = require("midi-writer-js");

module.exports = function writeMidi(events) {
  // Start with a new track
  const track = new midiWriter.Track();

  // Define an instrument (optional):
  track.addEvent(new midiWriter.ProgramChangeEvent({ instrument: 1 }));

  // Add some notes:
  const note = new midiWriter.NoteEvent({
    pitch: ["C4", "D4", "E4"],
    duration: "4",
  });
  track.addEvent(note);

  // Generate a data URI
  const write = new midiWriter.Writer(track);
  console.log(write.dataUri());
};
