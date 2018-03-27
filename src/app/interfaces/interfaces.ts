export interface IInsurance extends INewInsurance {
  id: number;
}

export interface INewInsurance {
  category: string;
  title?: string;
  premium: number;
}

export interface IValidatedField {
  value: string;
  valid?: boolean;
  touched?: boolean;
  errors?: any[];
}
