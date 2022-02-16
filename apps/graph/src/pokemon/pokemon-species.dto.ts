export interface PokemonSpeciesDTO {
  id: number;
  name: string;
  order: number;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}
