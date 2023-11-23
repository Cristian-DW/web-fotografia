import React from 'react';
import { render } from '@testing-library/react';
import Gallery from './Gallery';

test('renders gallery component', () => {
  render(<Gallery />);
});

test('renders gallery title', () => {
  const { getByText } = render(<Gallery />);
  const titleElement = getByText('Galería');
  expect(titleElement).toBeInTheDocument();
});

test('renders correct number of photos', () => {
  const { getAllByRole } = render(<Gallery />);
  const photoElements = getAllByRole('img');
  expect(photoElements.length).toBe(8);
});

test('renders photos with correct dimensions', () => {
  const { getAllByRole } = render(<Gallery />);
  const photoElements = getAllByRole('img');

  photoElements.forEach((photoElement) => {
    expect(photoElement).toHaveAttribute('width', '100%');
    expect(photoElement).toHaveAttribute('height', 'auto');
  });
});