/**
 * Extrait les titres H2 du contenu HTML avec leurs IDs
 */
export interface Heading {
  id: string;
  text: string;
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

    headings.push({ id, text });
  }

  return headings;
}
