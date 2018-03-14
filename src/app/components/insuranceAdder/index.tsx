import * as React from 'react';
import { TextInput } from '../textInput';
import { InsuranceActions } from 'app/actions';
import * as styleCommon from '../../styles/style.css';
import * as style from './style.css';
import * as boundClassNames from 'classnames/bind';
import * as classNames from 'classnames';
import { INewInsurance } from "app/interfaces";
import { Dropdown } from "app/components/dropdown";
import { ValidationError } from "app/interfaces";

export namespace InsuranceAdder {
  export interface Props {
    addInsurance: typeof InsuranceActions.addINSURANCE;
    categories: string[];
    isMobile: boolean;
  }

  export interface State {
    title: string;
    premium: any;
    category: string;
  }
}

export class InsuranceAdder extends React.Component<InsuranceAdder.Props, InsuranceAdder.State> {
  private validators = {
    required: (value: string) => !!value ? null : { error: 'This field is required' },
    numeric: (value: string) => Number.parseFloat(value) ? null : { error: 'This field should only contain valid numbers' },
  };

  private validationMap: { [key: string]: (value: string) => ValidationError } = {
    title: this.validators.required,
    premium: this.validators.required && this.validators.numeric
  };

  public constructor(props: InsuranceAdder.Props, context?: any) {
    super(props, context);
    this.state = {
      title: '',
      premium: null,
      category: props.categories[0],
    };

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
          <Dropdown
            list={this.props.categories}
            onSave={(index: number) => this.setState({ category: this.props.categories[index] })}
          />
          <TextInput
            validator={this.validators.required}
            onSave={(title) => this.setState({ title: title })}
          />
          <TextInput
            validator={this.validators.required && this.validators.numeric}
            onSave={(premium) => this.setState({ premium: Number.parseFloat(premium) })}
          />
          <button className={classNames(styleCommon.cell, style.add)} onClick={this.handleSave}>Add</button>
        </div>
      </div>
    );
  }
}
