import React from 'react';
import Layout from '../components/Layout';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import FilterButtons from '../components/FilterButtons';
import SearchBar from '../components/SearchBar';
const IndexPage: React.FC = () => {
  return (
    <Layout>
      <TodoForm />
      <FilterButtons />
      <SearchBar />
      <TodoList />
    </Layout>
  );
};

export default IndexPage;
