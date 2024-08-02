import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherData from './Component.jsx/WeatherData';
import React from 'react';

test('renders input and button', () => {
  render(<WeatherData />);
  expect(screen.getByPlaceholderText(/enter city or zip code/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('fetches weather data on submit', async () => {
  render(<WeatherData />);
  
  const input = screen.getByPlaceholderText(/enter city or zip code/i);
  const button = screen.getByRole('button');

  fireEvent.change(input, { target: { value: 'London' } });
  fireEvent.click(button);

  // Check for the presence of the loader
  await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
  // Check for the absence of the loader
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  // Check for the presence of the weather data
  await waitFor(() => expect(screen.getByText(/London/i)).toBeInTheDocument());
});