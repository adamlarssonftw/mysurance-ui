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
  private captions = ['Id', 'Title', 'Premium'];

  private renderTableCaptions(insurances: any[]): JSX.Element | void {
    if (insurances.length) {
      return (<div className={styleCommon.row}>
        {this.captions.map((caption: string, i) => (<h3 className={styleCommon.flex} key={i}>{caption}</h3>))}
      </div>);
    }
  }

  render() {
    const { insurances, actions } = this.props;
    return (
      <section className={style.main}>
        {this.renderTableCaptions(insurances)}
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
