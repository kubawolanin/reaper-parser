
main -> midiEvent:+

midiEvent -> _ ("E" | "e") _ offset _ int _ note _ velocity {% d => ({ offset: d[3], note: d[7], velocity: d[9] }) %}

offset -> int {% d => parseInt(d, 10) %}

note -> [0-9a-z]:+ {% d => parseInt(d[0].join(''), 16) %}

velocity -> [0-9a-z]:+ {% d => parseInt(d, 10) %}

int -> [-?0-9]:+ {% d => d[0].join('') %}

_ -> [\s]:*     {% d => null %}