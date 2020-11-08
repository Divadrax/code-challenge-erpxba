// firsts :: string -> ["char" -> [int]]
// Create a lookup table for characters to positions,
// to short-cut the search for starting points.
function firsts(s) {
  return Array.from(s).reduce((r, c, i) => {
    if (r[c]) {
      r[c].push(i);
    } else {
      r[c] = [i];
    }
    return r;
  }, {});
}

// matchAt :: (string, int, string) -> boolean
// Compare characters from s, starting at position soff,
// with characters from t, starting at position toff.
function matchAt(s, soff, t, toff) {
  while (toff !== t.length) {
    if (soff === s.length || s[soff] !== t[toff]) {
      return false;
    }
    ++soff;
    ++toff;
  }
  return true;
}

// searchPositions :: (["char" -> [int]], string, string) -> [int]
// Filter the input positions list by whether there is a
// subtext match at that position.  Call matchAt() from the
// second character, because the first has already been matched
// in looking up the positions.
function searchPositions(spr, text, subtext) {
  return spr[subtext[0]] ?
      spr[subtext[0]].filter(i => matchAt(text, i + 1, subtext, 1)) : 
      [];
}

// finder :: string -> string -> [int]
// Take a text and return a function that takes a subtext
// and returns an array of all the positions in the given
// text where the subtext is found in a case-insensitive
// comparison.
export default function finder(text) {
  const str = text.toLowerCase();
  const spr = firsts(str);
  return subtext => searchPositions(spr, str, subtext.toLowerCase());
}
