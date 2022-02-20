import { render, screen } from '@testing-library/react';
import { Item } from '@react-stately/collections';
import userEvent from '@testing-library/user-event';
import Tabs from './tabs';

describe('Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Tabs aria-label="History of Ancient Rome">
        <Item key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </Item>
        <Item key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </Item>
        <Item key="Emp" title="Empire">
          Alea jacta est.
        </Item>
      </Tabs>
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText(/Founding of Rome/g)).toBeInTheDocument();
    expect(screen.getByText(/Monarchy and Republic/g)).toBeInTheDocument();
    expect(screen.getByText(/Empire/g)).toBeInTheDocument();

    expect(
      screen.queryByText(/Arma virumque cano, Troiae qui primus ab oris./g)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Senatus Populusque Romanus./g)).toBeNull();
    expect(screen.queryByText(/Alea jacta est./g)).toBeNull();

    userEvent.click(screen.getByText(/Empire/g));
    expect(
      screen.queryByText(/Arma virumque cano, Troiae qui primus ab oris./g)
    ).toBeNull();
    expect(screen.queryByText(/Senatus Populusque Romanus./g)).toBeNull();
    expect(screen.queryByText(/Alea jacta est./g)).toBeInTheDocument();
  });
});
