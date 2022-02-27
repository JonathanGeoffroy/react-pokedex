export interface PokemonSpeciesDTO {
  id: number;
  name: string;
  names: NameEntry[];
  order: number;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
}

export interface NameEntry {
  name: string;
  language: Language;
}

export interface Language {
  name: string;
}
