function validate(line) {
  if (typeof line !== 'string') return false;
  line = line.trim();
  if (!line) return false;
  if (line.length > 200) return false; // avoid ridiculously long inputs

  // Allow P.O. Box / PO Box forms
  const poBox = /^\s*(?:P\.?\s*O\.?\s*Box)\s+\d+[A-Za-z0-9\-\/]*\s*$/i;
  if (poBox.test(line)) return true;

  // Common street types
  const streetTypes = [
    "Street","St","Avenue","Ave","Boulevard","Blvd","Road","Rd","Drive","Dr",
    "Lane","Ln","Way","Place","Pl","Court","Ct","Terrace","Ter","Circle","Cir",
    "Highway","Hwy","Parkway","Pkwy","Loop","Trail","Trl","Alley","Aly","Square","Sq",
    "Row","Landing","Commons","Row"
  ].join("|");

  // Directionals like N, NE, etc.
  const dir = "(?:N|S|E|W|NE|NW|SE|SW)\\.?" ;

  // Build regex:
  // Optional leading unit (e.g., "Apt 4B, ") OR main form starting with house number.
  // House number: 1-6 digits possibly followed by a letter, optionally a unit-fraction like "12A-2"
  // Optional pre-direction (N, S, NE, etc.)
  // Street name: words with letters/numbers, allowing apostrophes, hyphens and periods
  // Required street type from list, optional trailing unit (e.g., ", Apt 4")
  const reStr =
    "^\\s*" +
    "(?:" +
      // optional leading unit before house number, e.g., "Apt 4, "
      "(?:(?:Apt|Apartment|Suite|Ste|Unit|#)\\s*\\-?\\s*\\w+\\s*,?\\s+)" +
    ")?" +
    // house number
    "(\\d{1,6}[A-Za-z]?(?:[-/\\dA-Za-z]{0,10})?)\\s+" +
    // optional pre-direction
    "(?:(?:" + dir + ")\\s+)?" +
    // street name (one or more words, allow letters, numbers, apostrophes, hyphens, periods)
    "(?:[A-Za-z0-9]+(?:[ \\-\\'\\.][A-Za-z0-9]+)*)\\s+" +
    // street type
    "(?:" + streetTypes + ")\\.?" +
    // optional trailing unit, e.g., ", Apt 4B" or " Apt 4B"
    "(?:\\s*,?\\s*(?:#|Apt|Apartment|Suite|Ste|Unit)\\s*\\-?\\s*\\w+)?\\s*$";

  const re = new RegExp(reStr, "i");
  return re.test(line);
}
