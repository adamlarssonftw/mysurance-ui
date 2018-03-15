import * as React from 'react';
import { shallow } from 'enzyme';
import { TextInput } from "../../src/app/components/textInput";

describe('TextInput:', () => {
  const wrap = shallow(
    <TextInput
      validator={() => null}
      onSave={() => null}
      title="Title"
    />
  );

  it('should render the title passed to it', () => {
    const title = wrap.find('p').text();
    expect(title).toEqual('Title');
  });
});
