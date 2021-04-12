/**
-- remove trailing and leading whitespace from string.
local function Trim(s) -- from PiL2 20.4
  return s:gsub("^%s*(.-)%s*$", "%1")
end
 */