import './header.module.scss';
import { TopBar } from '@react-pokedex/ui';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useColor from '../../app/useColor';
import LanguageSelect from './language-select/language-select';
import Searchbar from './searchbar/searchbar';

export function Header() {
  const { color } = useColor();

  return (
    <TopBar
      className={classNames('sticky top-0 mb-4 z-10 gap-4', color.darker)}
    >
      <Link to="/" className="shrink-0">
        <h1 className="text-gray-200">React-Pokedex</h1>
      </Link>
      <Searchbar />
      <LanguageSelect />
    </TopBar>
  );
}

export default Header;
