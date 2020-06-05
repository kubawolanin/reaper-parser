main -> param:+ {% d => d.flat(1) %}

param -> _ paramname _ paramvalue {% d => ({ name: d[1], value: d[3] }) %}

paramname -> [A-Z_]:+ {% d => d.flat().join('').toString() %}

paramvalue -> (float _):+ {% d => d.flat(3).filter(v => v !== null) %}
	| guid

guid -> "{" hexdigit:+ "-" hexdigit:+ "-" hexdigit:+ "-" hexdigit:+ "-" hexdigit:+ "}" {% (d) => (d.flat().join('')) %}
hexdigit -> [a-fA-F0-9]

float ->
      int "." int   {% d => parseFloat(d[0].v + d[1] + d[2].v) %}
    | int           {% d => parseInt(d[0].v) %}

int -> [-?0-9]:+        {% d => ({ v: d[0].join("") }) %}

_ -> [\s]:*     {% d => null %}