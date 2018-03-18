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

  public render() {
    const { insurances, isMobile } = this.props;
    const sum = sumProperty(insurances, 'premium');
    const allColors = ['#1976d2', '#ffeb3b', '#004ba0', '#c8b900', '#63a4ff', '#ffff72'];
    const colors = insurances.map((insurance, index) => allColors[index % allColors.length]);

    return (
      !!insurances.length ?
        <div className={classNames(style.header, style.sums)}>
          <div className={style.chartContainer}>
            <PieChart colors={colors} isMobile={isMobile} insurances={insurances}/>
            {!isMobile &&
            <BarChart colors={colors} insurances={insurances}/>
            }
          </div>
          <div className={styleCommon.row}>
            <h3>Annual Premium Total:</h3>
            <div className={styleCommon.flex}><h2>{sum}</h2><h3> CHF</h3></div>
          </div>
        </div>
        :
        <div className={styleCommon.container}>
          <h3 className={styleCommon.centered}>Uh Oh! You're not really uninsured, are you?</h3>
          <h4 className={styleCommon.centered}>Use the menu below to add any insurances that you might have.</h4>
        </div>
    );
  }
}
