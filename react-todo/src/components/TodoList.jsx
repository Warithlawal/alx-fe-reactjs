import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders the initial todos', () => {
    render(<TodoList />);
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3); // Assuming initial state has 3 todos
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(4); // 3 initial todos + 1 new todo
    expect(screen.getByText(/New Todo/i)).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    const firstTodo = screen.getByText(/First Todo/i);
    fireEvent.click(firstTodo);

    expect(firstTodo).toHaveClass('completed'); // Assuming a 'completed' class is added on toggle
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]); // Click on the first delete button

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2); // One less than initial state
  });
});
