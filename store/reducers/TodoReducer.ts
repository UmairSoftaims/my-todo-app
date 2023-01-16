import { ADD_TODO, GET_TODOS, TOGGLE_TODO, EDIT_TODO, DELETE_TODO, SET_FILTER, SEARCH_TODOS, Todo } from "../types/TodoTypes";

const initialState = {
  todos: Array<Todo>(),
  filter: 'all',
  searchTerm: String(''),
};

const TodoReducer = (state = initialState, action: any) => {
	switch (action.type) {
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
				todos: [...state.todos, { name: todo, complete: false }],
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
			const name = action.payload.name;
			return {
				...state,
				todos: state.todos.map((todo, i) => {
					if (i === index) {
						return { ...todo, name };
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

export default TodoReducer
