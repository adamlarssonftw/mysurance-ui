import * as React from 'react';
import * as style from '../../style.css';
import * as boundClassNames from 'classnames/bind';
import { IInsurance } from "app/interfaces";
import { Pie } from 'react-chartjs-2';

export namespace PieChart {
  export interface Props {
    insurances: IInsurance[];
    isMobile: boolean;
  }
}

export class PieChart extends React.Component<PieChart.Props> {

  constructor(props: PieChart.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { insurances, isMobile } = this.props;

    const pieData = {
      labels: insurances.map((i: IInsurance) => i.title),
      datasets: [{
        backgroundColor: ['#1976d2', '#ffeb3b', '#004ba0', '#c8b900', '#63a4ff', '#ffff72'],
        data: insurances.map((i: IInsurance) => i.premium)
      }],
    };

    const responsiveClasses = boundClassNames.bind(style)(
      { 'chartHalf': !isMobile },
      { 'chart': true }
    );

    return (
      <div className={responsiveClasses}>
        <Pie data={pieData}/>
      </div>
    );
  }
}