import * as React from 'react';
import * as style from './style.css';
import * as styleCommon from '../../styles/style.css';
import * as classNames from 'classnames';
import * as boundClassNames from 'classnames/bind';
import { IInsurance } from "app/interfaces";
import { Pie, Bar } from 'react-chartjs-2';

export namespace Overview {
  export interface Props {
    insurances: IInsurance[];
    isMobile: boolean;
  }

  export interface State {
    width: number;
  }
}

export class Overview extends React.Component<Overview.Props, Overview.State> {

  constructor(props: Overview.Props, context?: any) {
    super(props, context);
    this.state = {
      width: window.innerWidth,
    };
  }

  public get sum(): number {
    return this.props.insurances
      .map((insurance: IInsurance) => insurance.premium)
      .reduce((sum: number, premium: number) => sum + premium, 0);
  }

  private getUniqueActiveCategories = (): string[] =>
    Array.from(new Set(this.props.insurances.map((i) => i.category)));

  private getUniqueActiveCategorySums = (): number[] =>
    this.getUniqueActiveCategories().map((category: string) => {
      return this.props.insurances
        .filter((insurance: IInsurance) => insurance.category === category)
        .map((insurance: IInsurance) => insurance.premium)
        .reduce((sum: number, premium: number) => sum + premium, 0);
    });

  render() {
    const { insurances, isMobile } = this.props;
    const sum = this.sum;
    const titles = insurances.map((i: IInsurance) => i.title);

    const myData = {
      backgroundColor: ['#1976d2', '#ffeb3b', '#004ba0', '#c8b900', '#63a4ff', '#ffff72'],
      data: insurances.map((i: IInsurance) => i.premium) //sum per category
    };

    const pieData = {
      labels: titles,
      datasets: [
        myData
      ],
    };

    const uniqueCategories = this.getUniqueActiveCategories();
    const uniqueCategoryPremiums = this.getUniqueActiveCategorySums();

    const bar = {
      data: {
        labels: uniqueCategories,
        datasets: [
          {
            label: 'My Insurances',
            backgroundColor: ['#1976d2', '#ffeb3b', '#004ba0', '#c8b900', '#63a4ff', '#ffff72'],
            data: uniqueCategoryPremiums
          },
          {
            label: 'Averages',
            backgroundColor: insurances.map(() => '#a5a5a5'),
            data: uniqueCategoryPremiums.map((i: number) => i* Math.random())
          },
        ],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

    const responsiveClasses = boundClassNames.bind(style)(
      { 'chartHalf': !isMobile },
      { 'chart': true }
    );

    return (
      <div className={classNames(style.header, style.sums)}>
        {!!insurances.length &&
        <div className={style.chartContainer}>
          <div className={responsiveClasses}>
            <Pie data={pieData}/>
          </div>
          {!isMobile &&
          <div className={classNames(style.chart, style.chartHalf)}>
            <Bar data={bar.data} options={bar.options}/>
          </div>
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
