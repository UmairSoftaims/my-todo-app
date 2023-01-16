import { ADD_TODO, GET_TODOS, TOGGLE_TODO, EDIT_TODO, DELETE_TODO, SET_FILTER, SEARCH_TODOS, GetTodos, AddTodo, ToggleTodo, EditTodo, DeleteTodo } from "../types/TodoTypes";
import axios from 'axios';
// define action creators
//done
export const getTodos: GetTodos = () => async (dispatch) => {
    console.log(process.env.API_URL)
  const res = await axios.get(`/api/todos`);
  console.log(res)
  dispatch({
    type: GET_TODOS,
    payload: {
      todos: res.data || [],
    },
  });
};

//done
export const addTodo: AddTodo = (todo) => async (dispatch) => {
  let res = await axios.post('/api/todos', { name: todo, complete: false });
  console.log(res)
  dispatch({
    type: ADD_TODO,
    payload: {
      todo,
    },
  });
};

//done
export const toggleTodo: ToggleTodo = (index) => async (dispatch) => {
  const res = await axios.put(`/api/todos/${index}/toggle`);
  console.log(res)
  dispatch({
    type: TOGGLE_TODO,
    payload: {
      index,
    },
  });
};

// done
export const editTodo: EditTodo = (index: number, name: string) => async (dispatch) => {
  let res = await axios.put(`/api/todos/${index}`, { name });
  console.log(res)
  dispatch({
    type: EDIT_TODO,
    payload: {
      index,
      name,
    },
  });
};

// done
export const deleteTodo: DeleteTodo = (index) => async (dispatch) => {
  let res = await axios.delete(`/api/todos/${index}`);
  console.log(res)
  dispatch({
    type: DELETE_TODO,
    payload: {
      index,
    },
  });
};

export const setFilter = (filter: 'all' | 'active' | 'completed') => ({
  type: SET_FILTER,
  payload: {
    filter,
  },
});

export const searchTodos = (searchTerm: string) => ({
  type: SEARCH_TODOS,
  payload: {
    searchTerm,
  },
});