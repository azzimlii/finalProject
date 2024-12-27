import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCoins: [],
  filtered: [],
  issuingCountries: [],
  metals: [],
  qualities: [],
  selectedCountry: "",
  selectedMetal: "",
  selectedQuality: "",
  priceRange: { from: "", to: "" },
  yearRange: { from: "", to: "" },
}
const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins(state, action) {
      state.allCoins = action.payload;
    },
    setFiltered(state, action) {
      state.filtered = action.payload;
    },
    setIssuingCountries: (state, action) => {
      state.issuingCountries = action.payload;
    },
    setMetals: (state, action) => {
      state.metals = action.payload;
    },
    setQualities: (state, action) => {
      state.qualities = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSelectedMetal: (state, action) => {
      state.selectedMetal = action.payload;
    },
    setSelectedQuality: (state, action) => {
      state.selectedQuality = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setYearRange: (state, action) => {
      state.yearRange = action.payload;
    },
  },
});

export const { setCoins, setFiltered, setIssuingCountries, setMetals, setQualities, setSelectedCountry, setSelectedMetal, setSelectedQuality, setPriceRange, setYearRange, } = coinSlice.actions;
export default coinSlice.reducer;