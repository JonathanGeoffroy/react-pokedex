export function idFromUrl(url: string): number {
  const matcher = /https:\/\/pokeapi.co\/api\/v2\/.*\/([0-9]+)\//g.exec(url);

  if (!matcher || matcher[1] === undefined) {
    console.log(url);
    throw new Error('Unparsable id');
  }
  return parseInt(matcher[1]);
}
