import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  it('Testa se a página contém info sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const titulo = screen.getByRole('heading', { level: 2, nome: /about pokédex/i });
    const frase = screen.getAllByText(/Pokémons/i);
    const img = screen.getByRole('img', { nome: 'Pokédex' });
    expect(titulo).toBeInTheDocument();
    expect(frase[0]).toBeInTheDocument();
    expect(frase[1]).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
