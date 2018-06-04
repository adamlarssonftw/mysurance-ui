export class Validators {
  public static required = (value: any) => !!value ? null : { error: 'This field is required' };
  public static numeric = (value: any) => !!Number.parseFloat(value) ? null : { error: 'This field should only contain valid numbers' };
};
