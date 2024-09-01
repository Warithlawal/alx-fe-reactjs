import React from 'react';
import TodoList from './components/TodoList'; // Import the TodoList component

function App() {
  return (
    <div className="App">
      <h1>My Todo App</h1>
      <TodoList /> {/* Render the TodoList component */}
    </div>
  );
}

export default App;
