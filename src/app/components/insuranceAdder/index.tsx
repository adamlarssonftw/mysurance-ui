import * as React from 'react';
import { TextInput } from '../textInput';
import { InsuranceActions } from 'app/actions';
import * as styleCommon from '../../styles/style.css';
import * as style from './style.css';
import * as boundClassNames from 'classnames/bind';
import * as classNames from 'classnames';
import { INewInsurance } from "app/interfaces";
import { Dropdown } from "app/components/dropdown";

export namespace InsuranceAdder {
  export interface Props {
    addInsurance: typeof InsuranceActions.addINSURANCE;
    categories: string[];
    isMobile: boolean;
  }
}

export class InsuranceAdder extends React.Component<InsuranceAdder.Props> {
  private insurance: INewInsurance = {
    title: '',
    premium: 0,
    category: '',
  };

  constructor(props: InsuranceAdder.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  public handleSave(e: any) {
    e.preventDefault();
    this.props.addInsurance(this.insurance);
  }

  public render() {
    const responsiveClasses = boundClassNames.bind(styleCommon)(
      { 'mobileRow': this.props.isMobile }
    );

    return (
      <div className={style.adder}>
        <h1>Insurances</h1>
        <div className={classNames(responsiveClasses, style.row)}>
          <Dropdown list={this.props.categories}
                    onSave={(index) => this.insurance.category = this.props.categories[index]}/>
          <TextInput onSave={(title) => this.insurance.title = title} placeholder="Title"/>
          <TextInput onSave={(premium) => this.insurance.premium = Number.parseFloat(premium)} placeholder="Premium"/>
          <button className={classNames(styleCommon.cell, style.add)} onClick={this.handleSave}>Add</button>
        </div>
      </div>
    );
  }
}
