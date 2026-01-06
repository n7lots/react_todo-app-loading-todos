import React from 'react';
import cl from 'classnames';

import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[];
  selectedFilter: string;
  onFilterChange: (value: Filter) => void;
};

export const TodoappFooter: React.FC<Props> = ({
  todos,
  selectedFilter,
  onFilterChange,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cl('filter__link', { selected: selectedFilter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cl('filter__link', {
            selected: selectedFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cl('filter__link', {
            selected: selectedFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
