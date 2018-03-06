import { createAction } from 'redux-actions';
import { TodoModel } from 'app/models';

export namespace TodoActions {
  export enum Type {
    ADD_TODO = 'ADD_TODO',
    EDIT_TODO = 'EDIT_TODO',
    DELETE_TODO = 'DELETE_TODO',
  }

  export const addTodo = createAction<PartialPick<TodoModel, 'text'>>(Type.ADD_TODO);
  export const editTodo = createAction<PartialPick<TodoModel, 'id'>>(Type.EDIT_TODO);
  export const deleteTodo = createAction<TodoModel['id']>(Type.DELETE_TODO);
}

export type TodoActions = Omit<typeof TodoActions, 'Type'>;
