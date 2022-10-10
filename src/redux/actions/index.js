export const setInfo = (info) => ({
  type: 'SET_INFO',
  info,
});

export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  email,
});

export const setName = (name) => ({
  type: 'SET_NAME',
  name,
});

export const setScore = (score) => ({
  type: 'SET_SCORE',
  score,
});

export const setTimer = () => ({
  type: 'SET_TIMER',
});

export const setStopTimer = () => ({
  type: 'SET_STOP_TIMER',
});

export const setRestartTimer = () => ({
  type: 'SET_RESTART_TIMER',
});

export const requisition = () => {
  const urlRequest = 'https://opentdb.com/api_token.php?command=request';

  return async (dispatch) => {
    if (localStorage.length === 0) {
      const requestToken = await fetch(urlRequest);
      const jsonToken = await requestToken.json();
      localStorage.setItem('token', jsonToken.token);

      const url = `https://opentdb.com/api.php?amount=5&token=${jsonToken.token}`;
      const request = await fetch(url);
      const json = await request.json();

      dispatch(setInfo(json.results));
    }

    if (localStorage.length === 1) {
      const token = localStorage.getItem('token');
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const request = await fetch(url);
      const json = await request.json();

      dispatch(setInfo(json));
    }
  };
};
