import { Injectable } from '@nestjs/common';
import { SearchPokemonDto } from '@react-pokedex/dto';
import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';

@Injectable()
export class PokemonSearchService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SEARCH_API;
    this.initialize({ context: {}, cache: new InMemoryLRUCache() });
  }

  async search(term: string, lang: string): Promise<SearchPokemonDto[]> {
    return this.get<SearchPokemonDto[]>('/api/pokemon', { term, lang });
  }
}
