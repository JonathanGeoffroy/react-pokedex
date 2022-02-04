export class PokemonDetailsDTO {
  id: number;
  name: string;
  order: number;
  sprites: {
    back_default: string;
  };
  types: PokemonTypeDTO[];
  height: number;
  weight: number;
}

export class PokemonTypeDTO {
  slots: number;
  type: {
    name: string;
    url: string;
  };
}
