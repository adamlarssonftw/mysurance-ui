import * as React from 'react';
import * as style from './style.css';
import { IInsurance } from 'app/interfaces';
import { InsuranceActions } from 'app/actions';

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
    const element = (
        <div><p>{insurance.id} {insurance.title} {insurance.premium}</p></div>
      );

    return <li className={style.normal}>{element}</li>;
  }
}
