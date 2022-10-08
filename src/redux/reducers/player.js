const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_EMAIL':
    return { ...state, gravatarEmail: action.email };
  case 'SET_NAME':
    return { ...state, name: action.name };
  case 'SET_SCORE':
    return { ...state, score: action.score };
  default:
    return state;
  }
};

export default player;
