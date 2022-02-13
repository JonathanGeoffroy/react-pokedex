import ColorProvider from './color-provider';
import GraphQLProvider from './graphql';
import Router from './router';
import './app.module.scss';

export function App() {
  return (
    <GraphQLProvider>
      <ColorProvider>
        <Router />
      </ColorProvider>
    </GraphQLProvider>
  );
}

export default App;
