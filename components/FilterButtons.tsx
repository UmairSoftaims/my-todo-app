import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/actions/TodoActions';

const FilterButtons: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.filter);

  return (
    <div className='space-x-4'>
      <button className={`text-white font-bold py-2 px-4 rounded ${filter == 'all' ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => dispatch(setFilter('all'))}>All</button>
      <button className={`text-white font-bold py-2 px-4 rounded ${filter == 'active' ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => dispatch(setFilter('active'))}>Active</button>
      <button className={`text-white font-bold py-2 px-4 rounded ${filter == 'completed' ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => dispatch(setFilter('completed'))}>
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
