import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Step3 from './index';

const mockStore = configureStore();

describe('Step3 Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component with add-ons', () => {
    const initialState = {
      personal: {
        addons: {}, // Mock addons
        isAnnualPlan: false, // Mock isAnnualPlan
        selectedPlan: true, // Mock isPlanSelected
      },
    };
    const store = mockStore(initialState);

    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <Step3 onNextStep={jest.fn()} onBackStep={jest.fn()} theme="light" />
      </Provider>
    );

    // Expectations
    expect(getByText('pickaddons')).toBeInTheDocument();
    expect(getAllByRole('checkbox')).toHaveLength(0); // No checkboxes displayed
  });

  it('should handle checkbox changes', () => {
    const initialState = {
      personal: {
        addons: {}, // Mock addons
        isAnnualPlan: false, // Mock isAnnualPlan
        selectedPlan: true, // Mock isPlanSelected
      },
    };
    const store = mockStore(initialState);

    const { getByRole } = render(
      <Provider store={store}>
        <Step3 onNextStep={jest.fn()} onBackStep={jest.fn()} theme="light" />
      </Provider>
    );

    // Click a checkbox
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    // Expectations
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    // You can add more expectations based on your implementation
  });

  it('should handle "Next Step" button click', () => {
    const initialState = {
      personal: {
        addons: {}, // Mock addons
        isAnnualPlan: false, // Mock isAnnualPlan
        selectedPlan: true, // Mock isPlanSelected
      },
    };
    const store = mockStore(initialState);

    const onNextStepMock = jest.fn();
    const { getByRole } = render(
      <Provider store={store}>
        <Step3 onNextStep={onNextStepMock} onBackStep={jest.fn()} theme="light" />
      </Provider>
    );

    // Click the "Next Step" button
    const nextStepButton = getByRole('button', { name: 'nextstep' });
    fireEvent.click(nextStepButton);

    // Expectations
    expect(onNextStepMock).toHaveBeenCalledTimes(1);
  });
});
