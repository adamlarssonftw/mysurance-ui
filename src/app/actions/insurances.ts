import { createAction } from 'redux-actions';
import {IInsurance, INewInsurance} from 'app/interfaces';

export namespace InsuranceActions {
  export enum Type {
    ADD_INSURANCE = 'ADD_INSURANCE',
    EDIT_INSURANCE = 'EDIT_INSURANCE',
    DELETE_INSURANCE = 'DELETE_INSURANCE',
  }

  export const addINSURANCE = createAction<INewInsurance>(Type.ADD_INSURANCE);
  export const editINSURANCE = createAction<PartialPick<IInsurance, 'id'>>(Type.EDIT_INSURANCE);
  export const deleteINSURANCE = createAction<IInsurance['id']>(Type.DELETE_INSURANCE);
}

export type InsuranceActions = Omit<typeof InsuranceActions, 'Type'>;
