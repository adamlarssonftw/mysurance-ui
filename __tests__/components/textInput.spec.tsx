import * as React from 'react';
import { mount } from 'enzyme';
import { TextInput } from '../../src/app/components/textInput';
import { IValidatedField } from 'app/interfaces';

describe('TextInput:', () => {
  const mockedInitialState: IValidatedField = {
    value: 'mocked value',
    valid: true,
    touched: false,
    errors: [],
    validators: []
  };

  const mockedSaveHandler = jest.fn();

  const wrap = mount(
    <TextInput
      state={mockedInitialState}
      onSave={mockedSaveHandler}
      title="Title"
    />
  );

  it('should render the title passed to it', () => {
    const title = wrap.find('p').text();
    expect(title).toEqual('Title');
  });

  it('should bubble input to parent through handleChange()', () => {
    wrap.find('input').simulate('change', {
        target: { value: 'any input' }
      }
    );
    expect(mockedSaveHandler).toHaveBeenCalledWith('any input');
  });

  it(`should remain in the 'normal' state if input is invalid but has not yet been touched`, () => {
    wrap.setProps({ state: { valid: false, errors: [{ error: `something is wrong, but I can't scream yet` }] } });
    const input = wrap.find('input');
    expect(input.hasClass('input--invalid')).toEqual(false);
  });

  it(`should assign an 'invalid'-class if props.state.errors contains something`, () => {
    wrap.setProps({ state: { valid: false, touched: true, errors: [{ error: 'something is wrong, I scream' }] } });
    const input = wrap.find('input');
    expect(input.hasClass('input--invalid')).toEqual(true);
  });
});
