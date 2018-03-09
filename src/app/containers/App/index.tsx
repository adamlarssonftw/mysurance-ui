import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { InsuranceActions } from 'app/actions/insurances';
import { RootState } from 'app/reducers';
import { InsuranceModel } from 'app/models';
import { omit } from 'app/utils';
import { Header, InsuranceList } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    insurances: InsuranceModel[];
    actions: InsuranceActions;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'insurances'> => {
    return { insurances: state.insurances };
  },
  (dispatch: Dispatch<RootState>): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    insurances: []
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { insurances, actions } = this.props;

    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
      <InsuranceList insurances={insurances} actions={actions} />
      </div>
    );
  }
}
