import axios from '~/libs/axios';

export const getAll = (params) => axios.get('/app/product', { params }).then((_) => _.data);
export const getSpecList = (specSlug, params) => axios.get(`/app/product/spec-list/${specSlug}`, params).then((_) => _.data);
export const getProduct = (productId) => axios.get(`/app/product/${productId}`).then((_) => _.data);
