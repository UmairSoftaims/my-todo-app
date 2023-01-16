import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchTodos } from '../store/actions/TodoActions';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState('');


  useEffect(() => {
    dispatch(searchTodos(searchTerm));
  },[searchTerm])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
    <div className="w-full sm:max-w-xs">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="block w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
      />
    </div>
    <button
      type="submit"
      className="mt-3 inline-flex w-full h-10 items-center justify-center rounded-md border border-transparent bg-green-600 px-4 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Search
    </button>
  </form>
  );
};

export default SearchBar;
