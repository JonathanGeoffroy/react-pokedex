export class PokemonListDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDTO[];
}

export class PokemonDTO {
  url: string;
  name: string;
}
