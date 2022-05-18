import { Key, useRef } from 'react';
import { useListBox, useMenuItem } from 'react-aria';
import { useListState, ListProps } from '@react-stately/list';
import { Item } from '@react-stately/collections';
import { Node } from '@react-types/shared';
import { Link } from 'react-router-dom';
import { SearchPokemonQuery } from '../../../../__generated/pokeapi.graphql';
import PokemonType from '../../../pokemon/type/pokemon-type';
import { pokemonDetailsRoute } from '../../../../app/router';
import './results.module.scss';

export interface ResultsProps {
  data: SearchPokemonQuery;
  onSelect: () => void;
}

export function Results({ data, onSelect }: ResultsProps) {
  return (
    <ResultBox aria-label="Search">
      {data.searchPokemon.map(({ pokemon }) => (
        <Item key={pokemon.id} aria-label={pokemon.name}>
          <PokemonItem
            data-testid={`searchbar-result-${pokemon.id}`}
            pokemon={pokemon}
            onSelect={onSelect}
          />
        </Item>
      ))}
    </ResultBox>
  );
}

type Pokemon = SearchPokemonQuery['searchPokemon'][0]['pokemon'];

interface PokemonItemProps extends React.HTMLProps<HTMLDivElement> {
  pokemon: Pokemon;
  onSelect: () => void;
}
function PokemonItem({ pokemon, onSelect, ...passThrough }: PokemonItemProps) {
  return (
    <Link onClick={onSelect} to={pokemonDetailsRoute(pokemon.id)}>
      <div className="flex flex-row justify-between gap-4" {...passThrough}>
        <img className="w-16 h-16" src={pokemon.imageUrl} alt={pokemon.name} />
        <div>{pokemon.name}</div>
        <div className="flex flex-col gap-2">
          {pokemon.types.map((type) => (
            <PokemonType className="w-32" key={type.type} type={type} />
          ))}
        </div>
      </div>
    </Link>
  );
}

interface ResultBoxProps extends ListProps<object> {
  onPress?: () => void;
}

function ResultBox(props: ResultBoxProps) {
  const state = useListState(props);

  const ref = useRef(null);
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <ul {...listBoxProps} ref={ref}>
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

interface OptionProps {
  item: Node<object>;
  state: any;
  onAction?: (key: Key) => void;
}

function Option({ item, state, onAction }: OptionProps) {
  const ref = useRef(null);
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction,
    },
    state,
    ref
  );

  return (
    <li className="p-2" {...menuItemProps} ref={ref}>
      {item.rendered}
    </li>
  );
}

export default Results;
