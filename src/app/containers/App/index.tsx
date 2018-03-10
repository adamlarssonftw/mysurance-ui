import * as React from 'react';
import * as style from './style.css';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { InsuranceActions } from 'app/actions/insurances';
import { RootState } from 'app/reducers';
import { IInsurance } from 'app/interfaces';
import { omit } from 'app/utils';
import { InsuranceAdder, InsuranceList } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    insurances: IInsurance[];
    actions: InsuranceActions;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'insurances'> => {
    return { insurances: state.insurances };
  },
  (dispatch: Dispatch<RootState>): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(InsuranceActions, 'Type'), dispatch)
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
      <div>
        <div className={style.normal}>
          <InsuranceList insurances={insurances} actions={actions}/>
        </div>
        <div className={classNames(style.normal, style.footer)}>
          <h2>Add Insurance</h2>
          <InsuranceAdder addInsurance={actions.addINSURANCE}/>
        </div>
      </div>
    );
  }
}
