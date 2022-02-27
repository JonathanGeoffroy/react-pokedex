export class PokemonTypeDTO {
  id: number;
  name: string;
  names: PokemonTypeTranslation[];
}

export class PokemonTypeTranslation {
  name: string;
  language: {
    name: string;
  };
}
