import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// define the initial state for our store
export interface Todo {
  text: string,
  complete: boolean,
}

type AddTodo = (todo: string) => (dispatch: any) => Promise<void>;
type ToggleTodo = (index: number) => (dispatch: any) => Promise<void>;
type EditTodo = (index: number, text: string) => (dispatch: any) => Promise<void>;
type DeleteTodo = (index: number) => (dispatch: any) => Promise<void>;

const initialState = {
  todos: Array<Todo>(),
  filter: 'all',
  searchTerm: String(''),
};

// define action types
const ADD_TODO = 'ADD_TODO';
const GET_TODOS = 'GET_TODOS';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_FILTER = 'SET_FILTER';
// define action types
const EDIT_TODO = 'EDIT_TODO';
const DELETE_TODO = 'DELETE_TODO';
// define action types
const SEARCH_TODOS = 'SEARCH_TODOS';

const API_FAILURE = 'API_FAILURE';
const API_REQUEST = 'API_REQUEST';

// define action creators
export const getTodos = () => async (dispatch: any) => {
  const res = await axios.get('http://localhost:3000/todos');
  console.log(res)
  dispatch({
    type: GET_TODOS,
    payload: {
      todos: res.data || [],
    },
  });
};

export const addTodo: AddTodo = (todo) => async (dispatch) => {
  let res = await axios.post('http://localhost:3000/todos', { text: todo });
  console.log(res)
  dispatch({
    type: ADD_TODO,
    payload: {
      todo,
    },
  });
};

export const toggleTodo: ToggleTodo = (index) => async (dispatch) => {
  const res = await axios.put(`http://localhost:3000/todos/${index}/toggle`);
  console.log(res)
  dispatch({
    type: TOGGLE_TODO,
    payload: {
      index,
    },
  });
};

export const editTodo: EditTodo = (index: number, text: string) => async (dispatch) => {
  let res = await axios.put(`http://localhost:3000/todos/${index}`, { text });
  console.log(res)
  dispatch({
    type: EDIT_TODO,
    payload: {
      index,
      text,
    },
  });
};

export const deleteTodo: DeleteTodo = (index) => async (dispatch) => {
  let res = await axios.delete(`http://localhost:3000/todos/${index}`);
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

// define the root reducer
const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case API_REQUEST: {
      return state
    }
    case API_FAILURE: {
      return state
    }
    case GET_TODOS: {
      const todos = action.payload.todos;
      return {
        ...state,
        todos: todos,
      }
    }
    case ADD_TODO: {
      const todo = action.payload.todo;
      return {
        ...state,
        todos: [...state.todos, { text: todo, complete: false }],
      };
    }
    case TOGGLE_TODO: {
      const index = action.payload.index;
      return {
        ...state,
        todos: state.todos.map((todo, i) => {
          if (i === index) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        }),
      };
    }
    case EDIT_TODO: {
      const index = action.payload.index;
      const text = action.payload.text;
      return {
        ...state,
        todos: state.todos.map((todo, i) => {
          if (i === index) {
            return { ...todo, text };
          }
          return todo;
        }),
      };
    }
    case DELETE_TODO: {
      const index = action.payload.index;
      return {
        ...state,
        todos: state.todos.filter((_, i) => i !== index),
      };
    }
    case SET_FILTER: {
      const filter = action.payload.filter;
      return {
        ...state,
        filter,
      };
    }
    case SEARCH_TODOS: {
      const searchTerm = action.payload.searchTerm;
      return {
        ...state,
        searchTerm,
      };
    }
    default:
      return state;
  }
};


// create the store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
