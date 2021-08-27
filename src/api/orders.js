import axios from '~/libs/axios';

export const create = (data) => axios.post('/app/order  ', data).then((_) => _.data);
export const getOrders = (params) => axios.get('/app/order/history', { params }).then((_) => _.data);
export const getOrder = (orderId) => axios.get(`/app/order/${orderId}`).then((_) => _.data);
export const cancelOrder = (orderId) => axios.delete(`/app/order/${orderId}`).then((_) => _.data);
