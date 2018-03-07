import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { InsuranceActions } from 'app/actions/insurances';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import { Header, TodoList } from 'app/components';

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
};

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    filter: TodoModel.Filter;
    actions: InsuranceActions;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'todos' | 'filter'> => {
    const hash = state.router.location && state.router.location.hash.replace('#', '');
    const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { todos: state.todos, filter };
  },
  (dispatch: Dispatch<RootState>): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    filter: TodoModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { todos, actions, filter } = this.props;
    const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;

    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <TodoList todos={filteredTodos} actions={actions} />
      </div>
    );
  }
}
