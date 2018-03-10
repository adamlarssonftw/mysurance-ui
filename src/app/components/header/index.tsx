import * as React from 'react';
import { TextInput } from '../textInput';
import { InsuranceActions } from 'app/actions';
import * as styleCommon from '../../styles/style.css';
import * as classNames from 'classnames';
import { INewInsurance } from "app/interfaces";

export namespace Header {
  export interface Props {
    addInsurance: typeof InsuranceActions.addINSURANCE;
  }
}

export class Header extends React.Component<Header.Props> {
  private insurance: INewInsurance = {
    title: '',
    premium: 0,
    category: '',
  };

  constructor(props: Header.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  public handleSave(e: any) {
    e.preventDefault();
    this.props.addInsurance(this.insurance);
  }

  render() {
    return (
      <div>
        <h1>Insurances</h1>
        <div className={styleCommon.row}>
          <TextInput onSave={(title) => this.insurance.title = title} placeholder="Title"/>
          <TextInput onSave={(premium) => this.insurance.premium = premium} placeholder="Premium"/>
          <button className={classNames(styleCommon.add, styleCommon.flex)} onClick={this.handleSave}>Add</button>
        </div>
      </div>
    );
  }
}
