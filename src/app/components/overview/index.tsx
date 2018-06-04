import * as React from 'react';
import * as style from './style.css';
import * as styleCommon from '../../styles/style.css';
import * as classNames from 'classnames';
import { IInsurance } from "app/interfaces";
import { BarChart } from "app/components/overview/charts/bar";
import { PieChart } from "app/components/overview/charts/pie";
import { sumProperty } from "app/utils";

export namespace Overview {
  export interface Props {
    insurances: IInsurance[];
    isMobile: boolean;
  }
}

export class Overview extends React.Component<Overview.Props> {

  constructor(props: Overview.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { insurances, isMobile } = this.props;
    const sum = sumProperty(insurances, 'premium');

    return (
      <div className={classNames(style.header, style.sums)}>
        {!!insurances.length &&
        <div className={style.chartContainer}>
          <PieChart isMobile={isMobile} insurances={insurances}/>
          {!isMobile &&
          <BarChart insurances={insurances}/>
          }
        </div>
        }
        <div className={styleCommon.row}>
          <h3>Annual Premium Total:</h3>
          <div className={styleCommon.flex}><h2>{sum}</h2><h3> CHF</h3></div>
        </div>
      </div>
    );
  }
}
