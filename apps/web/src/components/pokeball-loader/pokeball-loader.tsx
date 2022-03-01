import classNames from 'classnames';
import './pokeball-loader.module.scss';
import { ReactComponent as Pokeball } from './pokeball.svg';

export type PokeballLoaderProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export function PokeballLoader({ className, ...others }: PokeballLoaderProps) {
  return (
    <Pokeball
      className={classNames('animate-pulse', className)}
      {...others}
    />
  );
}

export default PokeballLoader;
