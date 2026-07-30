/**
 * Extrait les titres H2 du contenu HTML avec leurs IDs
 */
export interface Heading {
  id: string;
  text: string;
}

/**
 * Décode les entités HTML courantes
 */
function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&nbsp;': ' ',
    '&ndash;': '–',
    '&mdash;': '—',
    '&hellip;': '…',
    '&eacute;': 'é',
    '&egrave;': 'è',
    '&ecirc;': 'ê',
    '&agrave;': 'à',
    '&acirc;': 'â',
    '&ocirc;': 'ô',
    '&ucirc;': 'û',
    '&ccedil;': 'ç',
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }

  return decoded;
}

export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];

  // Regex pour matcher les H2 avec leurs IDs
  const h2Regex = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;

  let match;
  while ((match = h2Regex.exec(html)) !== null) {
    const id = match[1];
    const htmlContent = match[2];
    // Retirer les balises HTML du contenu pour avoir juste le texte
    const text = htmlContent.replace(/<[^>]*>/g, '').trim();
    // Décoder les entités HTML
    const decodedText = decodeHtmlEntities(text);

    headings.push({ id, text: decodedText });
  }

  return headings;
}
