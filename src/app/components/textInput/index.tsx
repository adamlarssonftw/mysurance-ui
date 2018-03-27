import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import * as boundClassNames from 'classnames/bind';
import * as styleCommon from '../../styles/style.css';
import { IValidatedField } from "app/interfaces";

export namespace TextInput {
  export interface Props {
    state: IValidatedField,
    title: string;
    onSave: (text: any) => void;
  }
}

function ErrorMsg(props) {
  const { errors } = props;

  if (!!errors && errors.length) {
    return (<p className={styleCommon.invalid}>{errors[0] ? errors[0].error : ''}</p>);
  }
  else {
    return null;
  }
};

export class TextInput extends React.Component<TextInput.Props> {
  constructor(props: TextInput.Props, context?: any) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onSave(event.target.value);
  }

  public render() {
    const { valid, errors } = this.props.state;
    const validationStyling = boundClassNames.bind(styleCommon)(
      { 'input--invalid': !valid }
    );

    const classes = classNames(style.new, styleCommon.cell, validationStyling);

    const errorMsg = (errors) => {
      if (!!errors && errors.length) {
        return (<p className={styleCommon.invalid}>{errors[0] ? errors[0].error : ''}</p>);
      }
      else {
        return null;
      }
    };

    return (
      <div className={style.inputContainer}>
        <p>{this.props.title}</p>
        <div>
          <input
            className={classes}
            type="text"
            autoFocus
            placeholder={this.props.title}
            value={value || ''}
            onChange={this.handleChange}
          />
        </div>
        <ErrorMsg errors={errors}></ErrorMsg>
      </div>
    );
  }
}
