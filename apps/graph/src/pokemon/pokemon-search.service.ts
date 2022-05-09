import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { PokemonSearchDTO } from './pokemon-search.dto';

@Injectable()
export class PokemonSearchService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000'; // process.env.SEARCH_API;
    this.initialize({ context: {}, cache: new InMemoryLRUCache() });
  }

  async search(term: string, lang: string): Promise<PokemonSearchDTO[]> {
    return this.get<PokemonSearchDTO[]>('/api/pokemon', { term, lang });
  }
}
