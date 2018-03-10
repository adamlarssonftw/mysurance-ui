import * as React from 'react';
import * as style from './style.css';
import { IInsurance } from 'app/interfaces';
import { InsuranceActions } from 'app/actions';
import * as styleCommon from '../../styles/style.css';

export namespace Insurance {
  export interface Props {
    insurance: IInsurance;
    editinsurance: typeof InsuranceActions.editINSURANCE;
    deleteinsurance: typeof InsuranceActions.deleteINSURANCE;
  }
}

export class Insurance extends React.Component<Insurance.Props> {
  constructor(props: Insurance.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { insurance } = this.props;
    return <li className={style.normal}>
      <div className={styleCommon.row}>
        <p className={styleCommon.flex}>{insurance.id}</p>
        <p className={styleCommon.flex}>{insurance.title}</p>
        <p className={styleCommon.flex}>{insurance.premium}</p>
      </div>
    </li>;
  }
}
