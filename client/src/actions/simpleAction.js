import axios from 'axios';

const thisOne = (data) => {
  return {
    type: 'SIMPLE_ACTION',
    payload: data
  };
}

const url = '/api/user';

export const simpleAction = () => {
  return dispatch => axios.get(url).then((res) => {
    dispatch(thisOne(res.data));
  });
}