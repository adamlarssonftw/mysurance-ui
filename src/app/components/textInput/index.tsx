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
  }

  export interface State {
    text: string;
  }
}

export class TextInput extends React.Component<TextInput.Props, TextInput.State> {
  constructor(props: TextInput.Props, context?: any) {
    super(props, context);
    this.state = { text: this.props.text || '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onSave(event.target.value);
    this.setState({ text: event.target.value });
  }

  render() {
    const classes = classNames(style.new, styleCommon.flex);

    return (
      <input
        className={classes}
        type="text"
        autoFocus
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChange={this.handleChange}
      />
    );
  }
}
