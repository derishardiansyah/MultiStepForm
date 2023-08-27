import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  selectedPlan: null,
  isAnnualPlan: false,
  plans: {
    arcade: {
      name: 'Arcade',
      monthlyPrice: 9,
      yearlyPrice: 90,
    },
    advance: {
      name: 'Advanced',
      monthlyPrice: 12,
      yearlyPrice: 120,
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 15,
      yearlyPrice: 150,
    },
  },
  addons: {
    'Online Services': {
      isAdded: false,
      monthCost: 1,
      name: 'onlineservice',
      description: 'captonlineservice',
    },
    'Larger Storage': {
      isAdded: false,
      monthCost: 2,
      name: 'largestorage',
      description: 'captlargestorage',
    },
    'Customizable Profile': {
      isAdded: false,
      monthCost: 2,
      name: 'customizable',
      description: 'captcustomizable',
    },
  },
};

const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    savePersonalInfo: (state, action) => {
      const { name, email, phoneNumber } = action.payload;
      state.name = name;
      state.email = email;
      state.phoneNumber = phoneNumber;
    },
    setAddOns(state, action) {
      state.addons[action.payload.title].isAdded = action.payload.isChecked;
    },
    selectPlan: (state, action) => {
      state.selectedPlan = {
        name: action.payload.name,
        price: action.payload.price,
        annual: action.payload.annual,
      };
    },
    setIsAnnualPlan(state, action) {
      state.isAnnualPlan = action.payload;
    },
  },
});

export const { setName, setEmail, setPhoneNumber, savePersonalInfo, setAddOns, selectPlan, setIsAnnualPlan } =
  personalSlice.actions;
export default personalSlice.reducer;
