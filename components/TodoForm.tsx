import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux"
import { addTodo } from '../store/actions/TodoActions';

const TodoForm: React.FC = () => {
  const [todo, setTodo] = React.useState('');
  const dispatch: Dispatch<any> = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo('');
  };
  
  return (
    <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
      <div className="w-full sm:max-w-xs">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="block w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="mt-3 inline-flex w-full h-10 items-center justify-center rounded-md border border-transparent bg-green-600 px-4 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
