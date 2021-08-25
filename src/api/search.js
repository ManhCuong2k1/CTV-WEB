import axios from '~/libs/axios';

export const getHistories = () => axios.get('/app/search/history').then((_) => _.data);
export const getProducts = (query) => axios.get('/app/search/product', { query }).then((_) => _.data);
export const getDistributors = (query) => axios.get('/app/search/distributor', { query }).then((_) => _.data);
export const getInfoGeo = () => axios.get('/app/system-info/infoGeo').then((_) => _.data);
