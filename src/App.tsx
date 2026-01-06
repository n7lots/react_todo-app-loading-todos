import React, { useState, useEffect } from 'react';
import { TodoappHeader } from './components/TodoappHeader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoappErrorsBlock } from './components/TodoappErrorsBlock';
import { TodoappFooter } from './components/TodoappFooter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const visibleTodos = [...todos].filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoappHeader inputValue={inputValue} onInputChange={setInputValue} />
        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoappFooter
              todos={todos}
              selectedFilter={filter}
              onFilterChange={setFilter}
            />
          </>
        )}
        <TodoappErrorsBlock
          errorMessage={errorMessage}
          onDelete={setErrorMessage}
        />
      </div>
    </div>
  );
};
