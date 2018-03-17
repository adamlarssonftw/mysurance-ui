import * as React from 'react';
import * as style from '../../style.css';
import * as classNames from 'classnames';
import { IInsurance } from "app/interfaces";
import { Bar } from 'react-chartjs-2';
import { sumProperty } from "app/utils";

export namespace BarChart {
  export interface Props {
    insurances: IInsurance[];
    colors: string[];
  }
}

export class BarChart extends React.Component<BarChart.Props> {

  constructor(props: BarChart.Props, context?: any) {
    super(props, context);
  }
  private chartOptions = {
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

  private getUnique = (list: any[], propKey: string): string[] =>
    Array.from(new Set(list.map((item) => item[propKey])));

  private sumCategoryPremiums = (list: IInsurance[], categories: string[]): number[] => {
    return categories.map((category: string) => {
      const insurancesInCategory = list.filter((insurance: IInsurance) => insurance.category === category);
      return sumProperty(insurancesInCategory, 'premium');
    });
  };

  public shouldComponentUpdate(nextProps: BarChart.Props) {
    return nextProps.insurances.length !== this.props.insurances.length;
  }

  public render() {
    const insurances = this.props.insurances;
    const uniqueCategories = this.getUnique(insurances, 'category');
    const summedPremiumsByCategory = this.sumCategoryPremiums(insurances, uniqueCategories);
    const bar = {
      data: {
        labels: uniqueCategories,
        datasets: [
          {
            label: 'My Insurances',
            backgroundColor: this.props.colors,
            data: summedPremiumsByCategory
          },
          {
            label: 'Averages',
            backgroundColor: insurances.map(() => '#a5a5a5'),
            data: summedPremiumsByCategory.map((i: number) => i * Math.random())
          },
        ],
      },
        ...this.chartOptions
    };

    return (
      <div className={classNames(style.chart, style.chartHalf)}>
        <Bar data={bar.data} options={bar.options}/>
      </div>
    );
  }
}
