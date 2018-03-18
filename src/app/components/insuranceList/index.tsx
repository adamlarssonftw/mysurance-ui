import * as React from 'react';
import * as style from './style.css';
import * as styleCommon from '../../styles/style.css';
import * as classNames from 'classnames';
import { InsuranceActions } from 'app/actions/insurances';
import { Insurance } from '../insurance';
import { IInsurance } from '../../interfaces/interfaces';

export namespace InsuranceList {
  export interface Props {
    insurances: IInsurance[];
    actions: InsuranceActions;
  }
}

export class InsuranceList extends React.Component<InsuranceList.Props> {
  private captions = ['Category', 'Title', 'Annual Premium'];

  public render() {
    const { insurances, actions } = this.props;
    return (
      <section className={style.main}>
        <div className={classNames(styleCommon.row, styleCommon.captions)}>
          {this.captions.map((caption: string, i) => (<h3 className={styleCommon.cell} key={i}>{caption}</h3>))}
        </div>
        <ul className={style.normal}>
          {insurances.map((insurance) => (
            <Insurance
              key={insurance.id}
              insurance={insurance}
              deleteinsurance={actions.deleteINSURANCE}
              editinsurance={actions.editINSURANCE}
            />
          ))}
        </ul>
      </section>
    );
  }
}
