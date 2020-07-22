export const login = {
  user: {
    username: 'amigo',
    password: 'delta',
    fullName: 'Mr. Amigo',
  },
  isLoggedIn: true,
  rememberMe: true,
};

const cartState = [];
const products = [];
export const productsState = {
  products,
  isListFetched: false,
  error: null,
  cart: cartState,
  searchKey: '',
};

export const filters = {
  brandFilters: [],
  selectedBrandFilters: [],
  colourFilters: [],
  selectedColourFilters: [],
  priceFilters: {
    min: 0,
    max: 100,
    step: 1,
    selected: 100,
  },
};

export const header = {
  screenType: 'LOGIN_SCREEN',
  isUserLoggedIn: true,
  userName: 'Mr. Amigo',
};
export const MockAppState = {
  products: productsState,
  filters,
  login,
  header,
};
