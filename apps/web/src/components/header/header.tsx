import './header.module.scss';
import { TopBar } from '@react-pokedex/ui';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useColor from '../../app/useColor';
import LanguageSelect from './language-select/language-select';

export function Header() {
  const { color } = useColor();

  return (
    <TopBar className={classNames('sticky top-0 mb-4 z-10', color.darker)}>
      <Link to="/">
        <h1 className="text-gray-200">React-Pokedex</h1>
      </Link>
      <LanguageSelect />
    </TopBar>
  );
}

export default Header;
