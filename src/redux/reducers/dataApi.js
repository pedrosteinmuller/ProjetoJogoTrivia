const initialState = {
  info: [],
};

const dataApi = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_INFO':
    return { ...state, info: action.info };
  default:
    return state;
  }
};

export default dataApi;
