import { createAction } from 'redux-actions';
import { InsuranceModel } from 'app/models';

export namespace InsuranceActions {
  export enum Type {
    ADD_INSURANCE = 'ADD_INSURANCE',
    EDIT_INSURANCE = 'EDIT_INSURANCE',
    DELETE_INSURANCE = 'DELETE_INSURANCE',
  }

  export const addINSURANCE = createAction<PartialPick<InsuranceModel, 'id'>>(Type.ADD_INSURANCE);
  export const editINSURANCE = createAction<PartialPick<InsuranceModel, 'id'>>(Type.EDIT_INSURANCE);
  export const deleteINSURANCE = createAction<InsuranceModel['id']>(Type.DELETE_INSURANCE);
}

export type InsuranceActions = Omit<typeof InsuranceActions, 'Type'>;
