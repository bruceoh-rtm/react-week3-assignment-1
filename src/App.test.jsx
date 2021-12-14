import { useState as useStateMock } from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('App', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
  });

  it('renders Page component', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('To-do');
  });

  it('calls setState when input chaged', () => {
    const { getByRole } = render(<App />);

    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });

    expect(setState).toBeCalled();
  });

  it('calls setState when click add task', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('추가'));

    expect(setState).toBeCalled();
  });

  it('calls setState when click delete task', async () => {});
});
