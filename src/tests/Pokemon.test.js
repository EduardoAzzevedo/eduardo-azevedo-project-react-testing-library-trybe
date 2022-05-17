import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  const { averageWeight: { measurementUnit, value },
    image, name, type, id } = pokemons[0];

  it('Testa se mostra um card com detalhes do pokémon selecionado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const nomePokemon = screen.getByText(name);
    expect(nomePokemon).toBeInTheDocument();

    const tipoPokemon = screen.getByTestId('pokemon-type');
    expect(tipoPokemon).toBeInTheDocument();
    expect(tipoPokemon).toHaveTextContent(type);

    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toBeInTheDocument();
    expect(pesoPokemon).toHaveTextContent(value, measurementUnit);

    const figuraPokemon = screen.getByRole('img', { name: `${name} sprite` });
    expect(figuraPokemon).toBeInTheDocument();
    expect(figuraPokemon).toHaveAttribute('src', image);
  });

  it('Testa se o link "More details" vai para detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /more details/i });
    expect(linkDetalhes).toBeInTheDocument();

    userEvent.click(linkDetalhes);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se existe um ícone de estrela no pokémon favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const icone = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(icone).toBeInTheDocument();
    expect(icone).toHaveAttribute('src', '/star-icon.svg');
  });
});
