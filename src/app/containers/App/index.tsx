import * as React from 'react';
import * as style from './style.css';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import axios from 'axios';
import { fromPromise } from "rxjs/observable/fromPromise";
import { RouteComponentProps } from 'react-router';
import { InsuranceActions } from 'app/actions/insurances';
import { RootState } from 'app/reducers';
import { IInsurance } from 'app/interfaces';
import { omit } from 'app/utils';
import { InsuranceAdder, InsuranceList } from 'app/components';
import { pluck } from "rxjs/operators";
import State = App.State;

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    insurances: IInsurance[];
    actions: InsuranceActions;
  }

  export interface State {
    categories: string[];
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
export class App extends React.Component<App.Props, State> {
  private categoryURL =
    `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Types_of_insurance&cmtype=subcat&format=json&origin=*`;
  private categories$ = fromPromise(axios.get(this.categoryURL));

  static defaultProps: Partial<App.Props> = {
    insurances: []
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.state = { categories: [] };
  }

  componentDidMount() {
    this.categories$.pipe(
      pluck('data', 'query', 'categorymembers'),
    ).subscribe(
      (data: any) => {
        const categories = data
          .map((categoryRaw: any) => categoryRaw.title.split(':')[1]);
        this.setState({ categories: categories });
      },
      (err: Error) => console.log(err)
    );
  }

  render() {
    const { insurances, actions } = this.props;

    return (
      <div>
        <div className={style.normal}>
          <InsuranceList insurances={insurances} actions={actions}/>
        </div>
        {this.state && this.state.categories &&
        <div className={classNames(style.normal, style.footer)}>
          <h2>Add Insurance</h2>
          <InsuranceAdder categories={this.state.categories} addInsurance={actions.addINSURANCE}/>
        </div>
        }
      </div>
    );
  }
}
