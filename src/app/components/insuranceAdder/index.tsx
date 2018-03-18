import * as React from 'react';
import { TextInput } from '../textInput';
import { InsuranceActions } from 'app/actions';
import * as styleCommon from '../../styles/style.css';
import * as style from './style.css';
import * as boundClassNames from 'classnames/bind';
import * as classNames from 'classnames';
import { Dropdown } from "app/components/dropdown";
import { ValidationError } from "app/interfaces";
import { toast } from "react-toastify";

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
    const errors = this.getErrorsInState();
    if (errors.length) {
      this.popToast(errors);
    }
    else {
      this.props.addInsurance(this.state);
    }
  }

  private popToast(errors: ValidationError[]): void {
    const allErrors = errors.reduce((acc, e) => [...acc, e.error], []).join(', ');
    toast.error(allErrors, {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
    });
  }

  private getErrorsInState(): any {
    const errors: ValidationError[] =
      ['title', 'premium'].reduce((acc: ValidationError[], key: string) => {
          const e = this.validationMap[key](this.state[key]);
          return !!e ? [...acc, e] : acc;
        }
        , []);
    return errors;
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
            title="Category"
          />
          <TextInput
            validator={this.validators.required}
            onSave={(title) => this.setState({ title: title })}
            title="Title"
          />
          <TextInput
            validator={this.validators.required && this.validators.numeric}
            onSave={(premium) => this.setState({ premium: Number.parseFloat(premium) })}
            title="Annual Premium"
          />
          <button className={classNames(styleCommon.cell, style.add)} onClick={this.handleSave}>Add</button>
        </div>
      </div>
    );
  }
}
