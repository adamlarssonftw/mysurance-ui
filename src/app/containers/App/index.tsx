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
import { Overview } from "app/components/overview";
import { ToastContainer } from "react-toastify";

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    insurances: IInsurance[];
    actions: InsuranceActions;
    mobileBreakpoint: number;
  }

  export interface State {
    categories: string[];
    width: number;
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
    insurances: [],
    mobileBreakpoint: 768
  };

  public constructor(props: App.Props, context?: any) {
    super(props, context);
    this.state = {
      categories: [],
      width: window.innerWidth
    };
  }

  public componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  private handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  public componentDidMount() {
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

  public render() {
    const { insurances, actions, mobileBreakpoint } = this.props;
    const isMobile = this.state.width < mobileBreakpoint;

    return (
      <div>
        <div className={classNames(style.normal, style.header)}>
          <h2>Overview</h2>
          <Overview isMobile={isMobile} insurances={insurances}/>
        </div>
        {this.state && this.state.categories.length &&
        <div className={style.normal}>
          <h2>Add Insurance</h2>
          <InsuranceAdder isMobile={isMobile} categories={this.state.categories} addInsurance={actions.addINSURANCE}/>
        </div>
        }
        {!!insurances.length &&
        <div className={style.normal}>
          <h2>My Insurances</h2>
          <InsuranceList insurances={insurances} actions={actions}/>
        </div>
        }
        <ToastContainer className={style.toastError}/>
      </div>
    );
  }
}
