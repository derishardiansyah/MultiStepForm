// planSlice.test.js
import configureStore from 'redux-mock-store';
import planReducer, { selectPlan, setIsAnnualPlan } from '../../redux/personalSlice';

const mockStore = configureStore([]);
const store = mockStore({});

describe('planSlice', () => {
  it('should set the selectedPlan when selectPlan action is dispatched', () => {
    const initialState = {
      selectedPlan: {},
    };
    const plan = {
      name: 'Basic Plan',
      price: 9.99,
      annual: false,
    };

    const expectedState = {
      selectedPlan: {
        name: 'Basic Plan',
        price: 9.99,
        annual: false,
      },
    };

    const action = selectPlan(plan);
    const newState = planReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should set isAnnualPlan when setIsAnnualPlan action is dispatched', () => {
    const initialState = {
      isAnnualPlan: false,
    };
    const isAnnual = true;

    const expectedState = {
      isAnnualPlan: true,
    };

    const action = setIsAnnualPlan(isAnnual);
    const newState = planReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
