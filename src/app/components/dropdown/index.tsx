import * as React from 'react';
import * as classNames from 'classnames';
import * as styleCommon from '../../styles/style.css';

export namespace Dropdown {
  export interface Props {
    list: string[];
    onSave: (text: any) => void;
    title: string;
  }

  export interface State {
    index: number;
  }
}

export class Dropdown extends React.Component<Dropdown.Props, Dropdown.State> {
  constructor(props: Dropdown.Props, context?: any) {
    super(props, context);
    this.state = { index: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.props.onSave(event.target.selectedIndex);
    this.setState({ index: event.target.selectedIndex });
  }

  public render() {
    const classes = classNames(styleCommon.new, styleCommon.select);

    return (
      <div className={styleCommon.inputContainer}>
        <p>{this.props.title}</p>
        <select
          className={classes}
          value={this.props.list[this.state.index]}
          onChange={this.handleChange}>
          {this.props.list.map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </select>
      </div>
    );
  }
}
