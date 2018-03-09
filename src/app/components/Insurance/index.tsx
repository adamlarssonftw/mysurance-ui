import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { IInsurance } from 'app/interfaces';
import { InsuranceActions } from 'app/actions';
import { TextInput } from '../TextInput';

export namespace Insurance {
  export interface Props {
    insurance: IInsurance;
    editinsurance: typeof InsuranceActions.editINSURANCE;
    deleteinsurance: typeof InsuranceActions.deleteINSURANCE;
  }

  export interface State {
    editing: boolean;
  }
}

export class Insurance extends React.Component<Insurance.Props, Insurance.State> {
  constructor(props: Insurance.Props, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id: number, title: string) {
    if (title.length === 0) {
      this.props.deleteinsurance(id);
    } else {
      this.props.editinsurance({ id, title });
    }
    this.setState({ editing: false });
  }

  render() {
    const { insurance, deleteinsurance } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TextInput
          text={insurance.title}
          editing={this.state.editing}
          onSave={(title) => insurance.id && this.handleSave(insurance.id, title)}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            onChange={() => insurance.id}
          />
          <label onDoubleClick={this.handleDoubleClick}>{insurance.title}</label>
          <button
            className={style.destroy}
            onClick={() => {
              if (insurance.id) deleteinsurance(insurance.id);
            }}
          />
        </div>
      );
    }

    // insurance: compose
    const classes = classNames({
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return <li className={classes}>{element}</li>;
  }
}
