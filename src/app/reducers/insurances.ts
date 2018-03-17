import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { InsuranceActions } from 'app/actions/insurances';
import { IInsurance } from 'app/interfaces';

const initialState: IInsurance[] = [];

export const insuranceReducer = handleActions<RootState.InsurancesState, IInsurance>({
    [InsuranceActions.Type.ADD_INSURANCE]: (state: IInsurance[], action) => {
      return [
        ...state,
        {
          ...action.payload,
          id: !!state.length ? Math.max(...(state.map((i: IInsurance) => i.id))) + 1 : 0,
        } as IInsurance
      ];
    },
    [InsuranceActions.Type.DELETE_INSURANCE]: (state, action) => {
      return state.filter((insurance) => insurance.id !== (action.payload as any));
    },
  },
  initialState
);
