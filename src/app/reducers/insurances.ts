import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { InsuranceActions } from 'app/actions/insurances';
import { IInsurance } from 'app/interfaces';

const initialState: IInsurance[] = [{
  id: 1,
  title: 'initial store value',
  category: '',
  premium: 1
}];

export const insuranceReducer = handleActions<RootState.InsurancesState, IInsurance>(
{
  [InsuranceActions.Type.ADD_INSURANCE]: (state, action) => {
    if (action.payload) {
      return [
      ...state,
      {
        id: state.reduce((max, insurance) => Math.max(insurance.id || 1, max), 0) + 1,
        ...action.payload,
        category: '',
        premium: 1
      }
      ];
    }
    else {
      return state;
    }
  },
    [InsuranceActions.Type.DELETE_INSURANCE]: (state, action) => {
      return state.filter((insurance) => insurance.id !== (action.payload as any));
    },
    [InsuranceActions.Type.EDIT_INSURANCE]: (state, action) => {
      return state.map((insurance) => {
        if (!insurance || !action || !action.payload) {
          return insurance;
        } else {
          return (insurance.id || 0) === action.payload.id
            ? { ...insurance, text: action.payload.title }
            : insurance;
        }
      });
    },
},
initialState
);
