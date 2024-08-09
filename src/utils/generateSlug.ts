export function generateSlug(input: string): string {
  const cyrillicToLatinMap: { [key: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  let slug = '';
  for (const char of input.toLowerCase()) {
    if (/[a-z0-9_-]/.test(char)) {
      slug += char;
    } else if (cyrillicToLatinMap[char]) {
      slug += cyrillicToLatinMap[char];
    } else if (/\s/.test(char)) {
      slug += '_';
    }
  }

  slug = slug.replace(/_+/g, '_');

  slug = slug.replace(/^_|_$/g, '');

  return slug;
}