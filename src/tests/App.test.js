import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1 - Teste o componente App', () => {
  it('Testa o conjunto de links de navegação na tela', () => {
    renderWithRouter(<App />);
    const linkParaHome = screen.getByText('Home');
    const linkParaAbout = screen.getByRole('link', { name: /about/i });
    const linkParaFavorites = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(linkParaHome).toBeInTheDocument();
    expect(linkParaAbout).toBeInTheDocument();
    expect(linkParaFavorites).toBeInTheDocument();
  });

  it('Testa se é redirecionado para a pagina inicial ao clicar no link HOME', () => {
    const { history } = renderWithRouter(<App />);
    const linkParaHome = screen.getByText('Home');
    userEvent.click(linkParaHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se é redirecionado para pagina Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const linkParaFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkParaFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se a pagina Not Found é encontrada quando entrar em outra URl ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existe');

    const { pathname } = history.location;
    expect(pathname).toBe('/pagina-nao-existe');
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
