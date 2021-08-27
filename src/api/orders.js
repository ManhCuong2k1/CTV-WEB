import axios from '~/libs/axios';

export const create = (data) => axios.post('/app/order  ', data).then((_) => _.data);
export const getOrders = () => axios.get('/app/order/history').then((_) => _.data);
