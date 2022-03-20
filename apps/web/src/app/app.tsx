import ColorProvider from './color-provider';
import GraphQLProvider from './graphql';
import Router from './router';
import './app.module.scss';
import LanguageProvider from './language-provider';

export function App() {
  return (
    <LanguageProvider>
      <GraphQLProvider>
        <ColorProvider>
          <Router />
        </ColorProvider>
      </GraphQLProvider>
    </LanguageProvider>
  );
}

export default App;
