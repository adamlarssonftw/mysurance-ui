import * as React from 'react';
import { TextInput } from '../textInput';
import { InsuranceActions } from 'app/actions';
import * as styleCommon from '../../styles/style.css';
import * as style from './style.css';
import * as boundClassNames from 'classnames/bind';
import * as classNames from 'classnames';
import { Dropdown } from "app/components/dropdown";
import { IValidatedField } from "app/interfaces";
import { toast } from "react-toastify";
import { Validators } from "app/components/insuranceAdder/validators/validators";

export namespace InsuranceAdder {
  export interface Props {
    addInsurance: typeof InsuranceActions.addINSURANCE;
    categories: string[];
    isMobile: boolean;
  }

  export interface State {
    title: IValidatedField,
    premium: IValidatedField
    category: string;
  }
}

export class InsuranceAdder extends React.Component<InsuranceAdder.Props, InsuranceAdder.State> {
  private fieldsToValidate = ['title', 'premium'];
  private initialState = {
    title: {
      ...this.initialFieldState(''),
      validators: [Validators.required],
    },
    premium: {
      ...this.initialFieldState(''),
      validators: [Validators.required, Validators.numeric],
    },
    category: this.props.categories[0],
  };

  public constructor(props: InsuranceAdder.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
    this.state = this.initialState;
  }

  public handleSave(e: any): void {
    e.preventDefault();
    const allInputErrors = this.getAllValidationErrors();
    const allInputsValid = this.checkInputsProperty('valid');
    const allInputsTouched = this.checkInputsProperty('touched');

    if (!!allInputErrors.length) {
      this.popToast(allInputErrors[0].error);
    }
    else if (allInputsValid && allInputsTouched) {
      const { title, premium, category } = this.state;
      this.setInitialState();

      this.props.addInsurance({
        title: title.value,
        premium: Number.parseFloat(premium.value),
        category
      });
    }
    else if (!allInputsTouched) {
      this.fieldsToValidate.forEach((key: string) => this.handleChange(this.state[key].value, key));
    }
  }

  private checkInputsProperty = (prop: string): boolean =>
    this.fieldsToValidate.every((key) => this.state[key][prop]);

  private getAllValidationErrors = (): any[] =>
    this.fieldsToValidate.reduce((acc, key) =>
        this.state[key].errors ?
          [...acc, ...this.state[key].errors] :
          acc
      , []);

  private initialFieldState(value): IValidatedField {
    return {
      valid: false,
      touched: false,
      errors: [],
      value,
      validators: []
    };
  };

  private setInitialState() {
    this.setState(this.initialState);
  }

  private popToast(errors: string): void {
    toast.error(errors, {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
    });
  }

  private handleChange(value: string, key: string) {
    const errors = this.state[key].validators.map((fn) => fn(value)).filter((val) => !!val);
    const valid = !errors.length;

    const newState = {
      [key]: {
        ...this.state[key],
        valid,
        touched: true,
        errors,
        value
      },
    };

    // @ts-ignore (doesn't like dynamic keys)
    this.setState(newState);
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
            state={this.state.title}
            onSave={(title) => this.handleChange(title, 'title')}
            title="Title"
          />
          <TextInput
            state={this.state.premium}
            onSave={(premium) => this.handleChange(premium, 'premium')}
            title="Annual Premium"
          />
          <button className={classNames(styleCommon.cell, style.add)} onClick={this.handleSave}>Add</button>
        </div>
      </div>
    );
  }
}
