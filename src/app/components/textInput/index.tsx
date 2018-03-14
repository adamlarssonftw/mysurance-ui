import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import * as styleCommon from '../../styles/style.css';

export namespace TextInput {
  export interface Props {
    text?: string | string;
    placeholder?: string;
    editing?: boolean;
    onSave: (text: any) => void;
    validator: (value: any) => ValidationError;
  }

  export interface State {
    text: string;
    valid: boolean;
    errors: ValidationError;
  }
}

export class TextInput extends React.Component<TextInput.Props, TextInput.State> {
  constructor(props: TextInput.Props, context?: any) {
    super(props, context);
    this.state = { text: this.props.text || '', valid: true, errors: null };
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const errors = this.props.validator(event.target.value);
    this.setState({ text: event.target.value, errors: errors, valid: !errors });
    this.props.onSave(event.target.value);
  }

  public render() {
    const validationStyling = boundClassNames.bind(styleCommon)(
      { 'input--invalid': !this.state.valid }
    );

    const classes = classNames(style.new, styleCommon.cell, validationStyling);

    return (
      <div className={style.inputContainer}>
        <div>
          <input
            className={classes}
            type="text"
            autoFocus
            placeholder={this.props.title}
            value={this.state.text}
            onInput={this.handleChange}
          />
        </div>
        { this.state.errors &&
          <p className={styleCommon.invalid}>{this.state.errors.error}</p>
        }
      </div>
    );
  }
}
