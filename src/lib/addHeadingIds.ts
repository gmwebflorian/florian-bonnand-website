/**
 * Ajoute des IDs aux titres H2 pour les ancres du sommaire
 */
export function addHeadingIds(html: string): string {
  // Utiliser une regex pour trouver tous les H2
  let index = 0;

  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attributes, content) => {
    // Créer un ID slugifié à partir du contenu
    const textContent = content.replace(/<[^>]*>/g, ''); // Retirer les balises HTML
    const id = `heading-${index}-${textContent
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // Retirer les accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`;

    index++;

    // Si l'attribut id existe déjà, ne pas le remplacer
    if (attributes.includes('id=')) {
      return match;
    }

    // Ajouter l'ID au H2
    return `<h2${attributes} id="${id}">${content}</h2>`;
  });
}
