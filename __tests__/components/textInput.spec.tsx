import * as React from 'react';
import { mount } from 'enzyme';
import { TextInput } from "../../src/app/components/textInput";

describe('TextInput:', () => {
  const validators = {
    required: (value: string) => !!value ? null : { error: 'This field is required' },
    numeric: (value: string) => Number.parseFloat(value) ? null : { error: 'This field should only contain valid numbers' },
  };

  const wrap = mount(
    <TextInput
      validator={validators.required}
      onSave={() => null}
      title="Title"
    />
  );

  it('should render the title passed to it', () => {
    const title = wrap.find('p').text();
    expect(title).toEqual('Title');
  });

  it('should invalidate zero-length input', () => {
    wrap.setProps({ validator: validators.required });
    wrap.find('input').simulate('input', {
        target: { value: '' }
      }
    );
    expect(wrap.state().valid).toEqual(false);
    expect(wrap.state().errors.error).toEqual('This field is required');
  });

  it('should invalidate non-numeric input', () => {
    wrap.setProps({ validator: validators.numeric });
    wrap.find('input').simulate('input', {
        target: { value: 'a string, not a number' }
      }
    );
    expect(wrap.state().valid).toEqual(false);
    expect(wrap.state().errors.error).toEqual('This field should only contain valid numbers');
  });
});
