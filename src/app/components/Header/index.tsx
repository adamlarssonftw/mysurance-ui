import * as React from 'react';
import { TextInput } from '../TextInput';
import { InsuranceActions } from 'app/actions';

export namespace Header {
  export interface Props {
    addInsurance: typeof InsuranceActions.addINSURANCE;
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.addInsurance({ id: 1, title: text });
    }
  }

  render() {
    return (
      <header>
        <h1>Todos</h1>
      <TextInput newInsurance onSave={this.handleSave} placeholder="What needs to be done?" />
      </header>
    );
  }
}
