import React from 'react';

import './styles/App.scss';

import TodoForm from './components/TodoForm';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <TodoForm />
    </>
  );
}

export default App;
