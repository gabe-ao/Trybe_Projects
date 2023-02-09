const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return { ...state, ...action.payload };
  case 'UPDATE_SCORE':
    return { ...state, ...action.payload };
  case 'RESET_STATE':
    return { ...INITIAL_STATE };
  default:
    return state;
  }
};

export default playerReducer;
