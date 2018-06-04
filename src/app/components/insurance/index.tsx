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
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  public handleDeletion() {
    this.props.deleteinsurance(this.props.insurance.id);
  }

  render() {
    const { insurance } = this.props;
    return <li className={style.normal}>
      <div className={styleCommon.row}>
        <p className={styleCommon.cell}>{insurance.id}</p>
        <p className={styleCommon.cell}>{insurance.category}</p>
        <p className={styleCommon.cell}>{insurance.title}</p>
        <p className={styleCommon.cell}>{insurance.premium}</p>
        <svg className={style.cross} onClick={this.handleDeletion} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"
             aria-labelledby="title">
          <title id="title">Cross</title>
          <path
            d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
        </svg>
      </div>
    </li>;
  }
}
