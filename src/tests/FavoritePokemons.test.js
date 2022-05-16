import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se exibe a mensagem de erro', () => {
    renderWithRouter(<App />);
    const linkParaFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkParaFavorites).toBeInTheDocument();
    userEvent.click(linkParaFavorites);
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Testa se exibe todos os pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /more details/i });
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const favoritado = screen.getByRole('checkbox', { name: /pokémon favorito?/i });
    expect(favoritado).toBeInTheDocument();
    userEvent.click(favoritado);

    const linkParaFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkParaFavorites).toBeInTheDocument();
    userEvent.click(linkParaFavorites);

    const pokeFavorito = screen.getAllByRole('img', { name: /is marked as favorite/i });
    expect(pokeFavorito[0]).toBeInTheDocument();
  });
});
