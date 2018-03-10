import * as React from 'react';
import * as style from './style.css';
import * as styleCommon from '../../styles/style.css';
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
  renderToggleAll(): JSX.Element | void {
    const { insurances } = this.props;
    if (insurances.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
        />
      );
    }
  }

  render() {
    const { insurances, actions } = this.props;
    return (
      <section className={style.main}>
        {this.renderToggleAll()}
        <ul className={style.normal}>
          {insurances.map((insurance) => (
            <Insurance
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
