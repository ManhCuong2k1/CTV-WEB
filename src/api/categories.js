import axios from '~/libs/axios';

export const getAll = () => axios.get('/app/product-category').then((_) => _.data);
