import { configureStore } from '@reduxjs/toolkit';
import personalReducer, { setName, setEmail } from './personalSlice';

describe('personalSlice reducers', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { personal: personalReducer } });
  });

  it('should set the name', () => {
    const testName = 'John Doe';
    store.dispatch(setName(testName));

    const state = store.getState().personal;
    expect(state.name).toBe(testName);
  });

  it('should set the email', () => {
    const testEmail = 'test@example.com';
    store.dispatch(setEmail(testEmail));

    const state = store.getState().personal;
    expect(state.email).toBe(testEmail);
  });
});
