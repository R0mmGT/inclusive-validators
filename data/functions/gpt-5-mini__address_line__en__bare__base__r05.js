function validate(address) {
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (!s) return false;
  if (s.length > 200) return false; // unreasonable length

  // Directionals (N, S, E, W, NE, NW, SE, SW)
  const DIR = "(?:N|S|E|W|NE|NW|SE|SW)";
  // Common street types (abbreviations and full words)
  const STREET_TYPE = [
    "Street","St","Road","Rd","Avenue","Ave","Boulevard","Blvd","Lane","Ln","Drive","Dr",
    "Court","Ct","Place","Pl","Terrace","Ter","Way","Row","Trail","Trl","Circle","Cir",
    "Parkway","Pkwy","Highway","Hwy","Walk","Alley","Ally","Square","Sq","Commons","Loop"
  ].join("|");
  // A "word" in a street name: letters/numbers with optional internal apostrophes, dots or hyphens
  const NAME_WORD = "[A-Za-z0-9]+(?:['\\.\\-][A-Za-z0-9]+)*";

  // Number at start: 1-6 digits, optional hyphen or slash part (e.g. 12-34), optional single letter suffix (e.g. 123A)
  const NUMBER_PART = "\\d{1,6}(?:[-\\/]\\d{1,6})?[A-Za-z]?";

  // Optional unit designator at end: #5, Apt 3, Suite 200, Unit B, Ste. 4, Floor 2, Fl 2, etc.
  const UNIT = "(?:\\s*,?\\s*(?:#|Apt\\.?|Apartment|Unit|Suite|Ste\\.?|Floor|Fl\\.?|Dept\\.?|Bldg\\.?|Lot)\\s*\\w+)?";

  // Build regex:
  // - start with number
  // - optional directional after number
  // - one or more name words (street name)
  // - required street type (one from list), allow optional dot
  // - optional directional after street type
  // - optional unit at end
  const pattern = "^\\s*"
    + "(" + NUMBER_PART + ")"            // house number
    + "\\s+"
    + "(?:(?:" + DIR + ")\\s+)?"         // optional directional prefix (N Main St)
    + "(" + NAME_WORD + "(?:\\s+" + NAME_WORD + ")*)" // street name (one or more words)
    + "\\s+"
    + "(?:" + STREET_TYPE + ")\\.?"
    + "(?:\\s+(?:" + DIR + "))?"         // optional directional suffix (Main St NW)
    + UNIT
    + "\\s*$";

  const re = new RegExp(pattern, "i");
  if (!re.test(s)) return false;

  // Simple extra checks:
  // - avoid purely numeric street names like "123 456 St" where "456" is unlikely as name (allow ordinal e.g., 5th)
  // - ensure there is at least one alphabetic character in the street name or type
  const alphaInNameOrType = /[A-Za-z]/.test(s.replace(/^[\s\d#,-/]+/,''));
  if (!alphaInNameOrType) return false;

  return true;
}
