import axios from '~/libs/axios';

export const getAll = (params) => axios.get('/app/notify-log', { params });
export const markRead = (notificationId, data) => axios.put(`/app/notify-log/${notificationId}`, data).then((_) => _.data);
export const markReadAll = (notificationId, data) => axios.put('/app/notify-log/all', data).then((_) => _.data);
