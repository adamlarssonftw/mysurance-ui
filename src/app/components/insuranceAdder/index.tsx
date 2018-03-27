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
  private initialState = {
    title: {
      ...this.initialFieldState(''),
    },
    premium: {
      ...this.initialFieldState(''),
    },
    category: this.props.categories[0],
  };

  public constructor(props: InsuranceAdder.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
    this.state = this.initialState;
  }

  public handleSave(e: any) {
    e.preventDefault();
    const errors = ['title', 'premium'].reduce((acc: string, key: string) => {
      const error = this.state[key] && this.state[key].errors ? this.state[key].errors : null;
      return !!error ? acc + ', ' + error : acc;
    }, '');

    if (errors.length) {
      this.popToast(errors);
    }
    else {
      const insurance: INewInsurance = {
        title: this.state.title.value,
        premium: this.state.premium.value,
        category: this.state.category
      };
      this.props.addInsurance(insurance);
    }
  }


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

  private trySetState(validationFunctions, value: string, key: string) {
    const errors = validationFunctions.map((fn) => fn(value)).filter((x) => !!x);
    if (errors.length) {
      // @ts-ignore (doesn't like dynamic keys)
      this.setState({
        [key]: {
          valid: false,
          errors: errors,
          value
        },
      });
    }
    else {
      // @ts-ignore (doesn't like dynamic keys)
      this.setState({
        [key]: {
          valid: true,
          errors: null,
        }
      });
    }
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
            onSave={(title) => this.trySetState([this.validators.required], title, 'title')}
            title="Title"
          />
          <TextInput
            state={this.state.premium}
            onSave={(premium) =>
              this.trySetState(
                [this.validators.required, this.validators.numeric], premium, 'premium')}
            title="Annual Premium"
          />
          <button className={classNames(styleCommon.cell, style.add)} onClick={this.handleSave}>Add</button>
        </div>
      </div>
    );
  }
}
