export interface PokemonSpeciesDTO {
  id: number;
  name: string;
  order: number;
  flavor_text_entries: FlavorTextEntry[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}
