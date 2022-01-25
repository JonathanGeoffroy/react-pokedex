export class PokemonDetailsDTO {
  id: number;
  name: string;
  sprites: {
    back_default: string;
  };
  types: PokemonTypeDTO[];
}

export class PokemonTypeDTO {
  slots: number;
  type: {
    name: string;
    url: string;
  };
}
