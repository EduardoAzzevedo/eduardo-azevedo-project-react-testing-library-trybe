import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Testa se contém mensagem de erro', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se contém o Pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const imagem = screen.getByRole('img', { name: /pikachu crying/i });
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
