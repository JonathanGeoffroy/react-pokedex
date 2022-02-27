import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { PokemonTypeDTO } from './pokemon-type.dto';

@Injectable()
export class PokemonTypeService extends RESTDataSource {
  constructor() {
    super();
    this.initialize({ context: {}, cache: new InMemoryLRUCache() });
  }

  async findByUrl(url: string): Promise<PokemonTypeDTO> {
    return this.get<PokemonTypeDTO>(url);
  }
}
