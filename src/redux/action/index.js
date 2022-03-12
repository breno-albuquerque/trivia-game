export const SEND_TOKEN = 'TOKEN';
export const SEND_PLAYER = 'PLAYER';
export const SEND_FETCH = 'FETCH';
export const SEND_ASSERTION = 'ASSERION';
export const TIME_OUT = 'TIME';
export const SEND_SCORE = 'SCORE';

export const actionToken = (payload) => ({ type: SEND_TOKEN, payload });
export const actionPlayer = (payload) => ({ type: SEND_PLAYER, payload });
export const actionFetchApi = (payload) => ({ type: SEND_FETCH, payload });
export const actionAssertion = (payload) => ({ type: SEND_ASSERTION, payload });
export const actionScore = (payload) => ({ type: SEND_SCORE, payload });

export function actionFetch(token) {
  return async (dispatch) => {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const fetchApi = await fetch(url);
    const response = await fetchApi.json();
    const number = 3;
    if (response.response_code === number) {
      const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
      const newToken = await fetchApiToken.json();
      localStorage.setItem('token', newToken.token);
      dispatch(actionFetch(newToken.token));
    } else dispatch(actionFetchApi(response));
  };
}
