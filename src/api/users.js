import axios from '~/libs/axios';

export const getCurrentUser = () => axios.get('/app/users/me').then((_) => _.data);
export const getTopUsers = () => axios.get('/app/home/top-user').then((_) => _.data);
