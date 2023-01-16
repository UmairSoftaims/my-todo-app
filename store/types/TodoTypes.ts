// define the initial state for our store
export interface Todo {
    name: string,
    complete: boolean,
  }
  
// define action types
export const ADD_TODO = 'ADD_TODO';
export const GET_TODOS = 'GET_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_FILTER = 'SET_FILTER';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SEARCH_TODOS = 'SEARCH_TODOS';


export type GetTodos = () => (dispatch: any) => Promise<void>;
export type AddTodo = (todo: string) => (dispatch: any) => Promise<void>;
export type ToggleTodo = (index: number) => (dispatch: any) => Promise<void>;
export type EditTodo = (index: number, name: string) => (dispatch: any) => Promise<void>;
export type DeleteTodo = (index: number) => (dispatch: any) => Promise<void>;