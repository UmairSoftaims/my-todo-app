import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from "redux"
import { FaTimes, FaPencilAlt } from 'react-icons/fa'
import { toggleTodo, deleteTodo } from '../store/actions/TodoActions';

type TodoItemProps = {
  todo: {
    name: string;
    complete: boolean;
  };
  index: number;
  onEdit: (index: number, name: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({todo, index, onEdit}) => {
    const dispatch: Dispatch<any> = useDispatch();
  
    const handleToggle = () => {
      dispatch(toggleTodo(index));
    };

  
    const handleDelete = () => {
      dispatch(deleteTodo(index));
    };
  return (
    <div
      className="flex items-center justify-between p-2 rounded border border-gray-600"
      onDoubleClick={handleToggle}
    >
      <span
        style={{
          textDecoration: todo.complete ? 'line-through' : 'none',
        }}
      >
        {todo.name}{' '}
      </span>
      <div className="flex gap-2">
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={handleDelete}
        />
        <FaPencilAlt
            style={{ color: 'yellow', cursor: 'pointer' }}
            onClick={() => onEdit(index, todo.name)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
