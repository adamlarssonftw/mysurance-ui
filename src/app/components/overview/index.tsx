import * as React from 'react';
import * as style from './style.css';
import * as styleCommon from '../../styles/style.css';
import * as classNames from 'classnames';
import { IInsurance } from "app/interfaces";

export namespace Overview {
  export interface Props {
    insurances: IInsurance[];
  }
}

export class Overview extends React.Component<Overview.Props> {

  constructor(props: Overview.Props, context?: any) {
    super(props, context);
  }

  public get sum(): number {
    return this.props.insurances
      .map((insurance: IInsurance) => insurance.premium)
      .reduce((sum: number, premium: number) => sum + premium, 0);
  }

  render() {
    const sum = this.sum;
    return (
      <div className={classNames(style.header, style.sums)}>
        <div className={styleCommon.row}>
          <h3>Annual Premium Total:</h3><h2>{sum}</h2>
        </div>
      </div>
    );
  }
}
