import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from "redux"
import TodoItem from './TodoItem';
import { getTodos, editTodo } from '../store/actions/TodoActions';
import { Todo } from '../store/types/TodoTypes';

const TodoList: React.FC = () => {
  const todos = useSelector((state: any) => state.todos);
  const filter = useSelector((state: any) => state.filter);
  const searchTerm = useSelector((state: any) => state.searchTerm);
  const dispatch: Dispatch<any> = useDispatch();

  const [editingIndex, setEditingIndex] = React.useState(-1);
  const [editName, setEditName] = React.useState('');

  React.useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleEdit = (index: number, name: string) => {
    setEditingIndex(index);
    setEditName(name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editTodo(editingIndex, editName));
    setEditingIndex(-1);
    setEditName('');
  };
  return (
    <div className='space-y-4'>
      {todos
        .filter((todo: Todo) => {
          if (filter === 'all') {
            return true;
          }
          if (filter === 'active') {
            return !todo.complete;
          }
          if (filter === 'completed') {
            return todo.complete;
          }
          return false;
        })
        .filter((todo: Todo) => {
          if (searchTerm.length > 0) {
            return todo.name.toLowerCase().includes(searchTerm.toLowerCase())
          } else {
            return true;
          }
        })
        .map((todo: Todo, index: number) =>
          editingIndex === index ? (
            <div key={index} className="text-gray-800 bg-gray-200 max-h-96 overflow-y-scroll">
              <form className="mt-5 sm:flex sm:items-center" onSubmit={handleEditSubmit}>
                <div className="w-full sm:max-w-xs">
                  <input
                    type="text"
                    value={editName}
                    onChange={handleEditChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
              </form>
            </div>
          ) : (
            <div className='text-gray-800 bg-gray-200'>
              <TodoItem key={index}  todo={todo} index={index} onEdit={handleEdit} />
            </div>
          )
        )}
    </div>
    
  );
};

export default TodoList;