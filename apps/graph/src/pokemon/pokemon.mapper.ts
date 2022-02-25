import { PokemonDetailsDTO } from './pokemon-details.dto';
import { PokemonDetails, PokemonStat } from './pokemon-details.model';

function toStats(dto: PokemonDetailsDTO): PokemonStat {
  return dto.stats.reduce((acc, stat) => {
    acc[toStatsKey(stat.stat.name)] = stat.base_stat;
    return acc;
  }, {} as PokemonStat);
}

function toStatsKey(key: string): keyof PokemonStat {
  switch (key) {
    case 'special-attack':
      return 'specialAttack';
    case 'special-defense':
      return 'specialDefense';
    default:
      return key as keyof PokemonStat;
  }
}

export default function toModel(
  dto: PokemonDetailsDTO
): Partial<PokemonDetails> {
  return {
    ...dto,
    types: dto.types.map(({ type }) => type.name),
    imageUrl:
      dto.sprites.other?.dream_world?.front_default ||
      dto.sprites.front_default,
    abilities: dto.abilities.map(({ ability }) => ability.name),
    stats: toStats(dto),
  };
}
