import axios from '~/libs/axios';

export const getInfo = () => axios.post('/app/system-info').then((_) => _.data);
export const getInfoGeo = () => axios.get('/app/system-info/infoGeo').then((_) => _.data);
