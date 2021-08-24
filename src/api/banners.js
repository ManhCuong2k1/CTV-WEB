import axios from '~/libs/axios';

export const getAll = () => axios.get('/app/banner/home').then((_) => _.data);
