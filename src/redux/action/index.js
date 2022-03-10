export const SEND_TOKEN = 'TOKEN';
export const SEND_PLAYER = 'PLAYER';

export const actionToken = (payload) => ({ type: SEND_TOKEN, payload });
export const actionPlayer = (payload) => ({ type: SEND_PLAYER, payload });
