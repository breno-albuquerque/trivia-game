export const SEND_TOKEN = 'TOKEN';
export const SEND_PLAYER = 'PLAYER';
export const SEND_FETCH = 'FETCH';

export const actionToken = (payload) => ({ type: SEND_TOKEN, payload });
export const actionPlayer = (payload) => ({ type: SEND_PLAYER, payload });
export const actionFetchApi = (payload) => ({ type: SEND_FETCH, payload });


export function actionFetch(token) {
    return async (dispatch) => {
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`
      const fetchApi = await fetch(url);
      const response = await fetchApi.json();
      return dispatch(actionFetchApi(response));
    };
  }
