import * as React from 'react';
import { TextInput } from '../textInput';
import { InsuranceActions } from 'app/actions';
import * as styleCommon from '../../styles/style.css';
import * as boundClassNames from 'classnames/bind';
import * as classNames from 'classnames';
import { INewInsurance } from "app/interfaces";
import { Dropdown } from "app/components/dropdown";

export namespace InsuranceAdder {
  export interface Props {
    addInsurance: typeof InsuranceActions.addINSURANCE;
    categories: string[];
    mobileBreakpoint: number;
  }

  export interface State {
    width: number;
  }
}

export class InsuranceAdder extends React.Component<InsuranceAdder.Props, InsuranceAdder.State> {
  private insurance: INewInsurance = {
    title: '',
    premium: 0,
    category: '',
  };

  constructor(props: InsuranceAdder.Props, context?: any) {
    super(props, context);
    this.state = {
      width: window.innerWidth,
    };
    this.handleSave = this.handleSave.bind(this);
  }

  public handleSave(e: any) {
    e.preventDefault();
    this.props.addInsurance(this.insurance);
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

  public render() {
    const isMobile = this.state.width < this.props.mobileBreakpoint;
    const responsiveClasses = boundClassNames.bind(styleCommon)(
      { 'mobileRow': isMobile },
      { 'row': true }
    );

    return (
      <div className={'adder'}>
        <h1>Insurances</h1>
        <div className={responsiveClasses}>
          <Dropdown list={this.props.categories}
                    onSave={(index) => this.insurance.category = this.props.categories[index]}/>
          <TextInput onSave={(title) => this.insurance.title = title} placeholder="Title"/>
          <TextInput onSave={(premium) => this.insurance.premium = Number.parseFloat(premium)} placeholder="Premium"/>
          <button className={classNames(styleCommon.add, styleCommon.cell)} onClick={this.handleSave}>Add</button>
        </div>
      </div>
    );
  }
}
