float ->
      int "." int   {% function(d) {return {v:parseFloat(d[0].v + d[1] + d[2].v)}} %}

int -> [0-9]:+        {% function(d) {return {v:d[0].join("")}} %}


node -> "<" nodeName ">"
nodeName -> [A-Z_]

Param -> _ ParamName _ ParamValue

ParamName -> [A-Z_]
ParamValue -> Guid

Guid -> "{" hexdigit:{8} "-" hexdigit:4 "-" hexdigit:4 "-" hexdigit:4 "-" hexdigit:12 "}"
# Guid -> "{" hexdigit "-" hexdigit "-" hexdigit "-" hexdigit "-" hexdigit "}"
hexdigit -> [a-fA-F0-9]

# "REAPER_PROJECT"
# "RECORD_CFG"
# "APPLYFX_CFG"
# "RENDER_CFG"
# "METRONOME"
# "MASTERPLAYSPEEDENV"
# "TEMPOENVEX"
# "PROJBAY"
# "TRACK"
# "FXCHAIN"
# "VST"
# "ITEM"
# "SOURCE"
# "X"
# "EXTENSIONS"
# "SWSAUTOCOLOR"


# Whitespace
_ -> null | _ [\s] {% function() {} %}
__ -> [\s] | __ [\s] {% function() {} %}