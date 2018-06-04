import * as React from 'react';
import * as style from '../../style.css';
import * as classNames from 'classnames';
import { IInsurance } from "app/interfaces";
import { Bar } from 'react-chartjs-2';
import { sumProperty } from "app/utils";

export namespace BarChart {
  export interface Props {
    insurances: IInsurance[];
  }
}

export class BarChart extends React.Component<BarChart.Props> {

  constructor(props: BarChart.Props, context?: any) {
    super(props, context);
  }

  private getUnique = (list: any[], propKey: string): string[] =>
    Array.from(new Set(list.map((item) => item[propKey])));

  private sumCategoryPremiums = (list: IInsurance[], categories: string[]): number[] => {
    return categories.map((category: string) => {
      const insurancesInCategory = list.filter((insurance: IInsurance) => insurance.category === category);
      return sumProperty(insurancesInCategory, 'premium');
    });
  };

  render() {
    const insurances = this.props.insurances;
    const uniqueCategories = this.getUnique(insurances, 'category');
    const summedPremiumsByCategory = this.sumCategoryPremiums(insurances, uniqueCategories);
    const bar = {
      data: {
        labels: uniqueCategories,
        datasets: [
          {
            label: 'My Insurances',
            backgroundColor: ['#1976d2', '#ffeb3b', '#004ba0', '#c8b900', '#63a4ff', '#ffff72'],
            data: summedPremiumsByCategory
          },
          {
            label: 'Averages',
            backgroundColor: insurances.map(() => '#a5a5a5'),
            data: summedPremiumsByCategory.map((i: number) => i * Math.random())
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

    return (
      <div className={classNames(style.chart, style.chartHalf)}>
        <Bar data={bar.data} options={bar.options}/>
      </div>
    );
  }
}
