import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { TodoTextInput } from '../TodoTextInput';
import { InsuranceModel } from 'app/models';
import { InsuranceActions } from 'app/actions';

export namespace TodoItem {
  export interface Props {
    insurance: InsuranceModel;
    editinsurance: typeof InsuranceActions.editINSURANCE;
    deleteinsurance: typeof InsuranceActions.deleteINSURANCE;
  }

  export interface State {
    editing: boolean;
  }
}

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {
  constructor(props: TodoItem.Props, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id: number, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo({ id, text });
    }
    this.setState({ editing: false });
  }

  render() {
    const { todo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => todo.id && this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={() => todo.id}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button
            className={style.destroy}
            onClick={() => {
              if (todo.id) deleteTodo(todo.id);
            }}
          />
        </div>
      );
    }

    // TODO: compose
    const classes = classNames({
      [style.completed]: todo.completed,
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return <li className={classes}>{element}</li>;
  }
}
