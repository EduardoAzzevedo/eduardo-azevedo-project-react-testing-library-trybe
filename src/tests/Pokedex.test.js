import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonList = pokemons.filter((_, i) => i !== 0);

describe('Testa componente Pokedex', () => {
  it('Testa se contém um h2 com o texto "encountered pokémon"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se mostra o próximo pokémon quando apertar botão de proximo', () => {
    renderWithRouter(<App />);
    const botaoProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(botaoProximo).toBeInTheDocument();

    pokemonList.forEach((pokemon, i) => {
      userEvent.click(botaoProximo);
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.queryByText(pokemons[i].name)).not.toBeInTheDocument();
    });
    userEvent.click(botaoProximo);
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('Testa botão de filtro', () => {
    renderWithRouter(<App />);
    const tipoPokemon = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
      // data.js

    tipoPokemon.forEach((tipo) => {
      expect(screen.getByRole('button', { name: tipo })).toBeInTheDocument();
    });

    const escolheTipo = screen.getAllByTestId('pokemon-type-button');
    expect(escolheTipo).toHaveLength(tipoPokemon.length);
  });

  it('Testa se a Pokedex possui botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const botaoAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(botaoAll);

    expect(botaoAll).toBeInTheDocument();
    expect(botaoAll).toHaveTextContent(/all/i);
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
