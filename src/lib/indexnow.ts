/**
 * Soumet une ou plusieurs URLs à IndexNow pour indexation rapide
 * Documentation: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = '86f668811c774c08ae8485a793ed7e64';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export async function submitToIndexNow(urls: string | string[]): Promise<boolean> {
  // Convertir en tableau si c'est une seule URL
  const urlList = Array.isArray(urls) ? urls : [urls];

  // Préparer la requête
  const submission: IndexNowSubmission = {
    host: 'florian-bonnand.eu',
    key: INDEXNOW_KEY,
    keyLocation: `https://florian-bonnand.eu/${INDEXNOW_KEY}.txt`,
    urlList: urlList,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(submission),
    });

    // Les codes de succès possibles: 200, 202
    if (response.ok) {
      console.log('✅ IndexNow: URLs soumises avec succès', urlList);
      return true;
    } else {
      console.error('❌ IndexNow: Erreur lors de la soumission', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ IndexNow: Erreur réseau', error);
    return false;
  }
}

/**
 * Soumet les URLs principales du site à IndexNow
 */
export async function submitMainPages() {
  const mainPages = [
    'https://florian-bonnand.eu/',
    'https://florian-bonnand.eu/blog',
    'https://florian-bonnand.eu/blog/categorie/catalogue',
    'https://florian-bonnand.eu/blog/categorie/amazon-ads',
    'https://florian-bonnand.eu/blog/categorie/conformite',
    'https://florian-bonnand.eu/blog/categorie/logistique-fba',
  ];

  return submitToIndexNow(mainPages);
}
