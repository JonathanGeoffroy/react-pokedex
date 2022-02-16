import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { PokemonEvolutionDTO } from './pokemon-evolution.dto';

@Injectable()
export class PokemonEvolutionService extends RESTDataSource {
  constructor() {
    super();
    this.initialize({ context: {}, cache: new InMemoryLRUCache() });
  }

  async findByUrl(url: string): Promise<PokemonEvolutionDTO> {
    return this.get<PokemonEvolutionDTO>(url);
  }
}
