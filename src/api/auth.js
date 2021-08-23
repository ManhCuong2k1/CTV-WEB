import axios from '~/libs/axios';

export const checkPhone = (phone) => axios.post('/auth-user/checkphone', { phone }).then((_) => _.data);
export const verifyOtp = (phone, otp) => axios.post('/auth-user/otp/verify', { phone, otp }).then((_) => _.data);
export const update = (data) => axios.post('/auth-user/update', data).then((_) => _.data);
export const forgotPassword = (data) => axios.post('/auth-user/forgot-password', data).then((_) => _.data);
export const resetPassword = (data) => axios.post('/auth-user/reset-password', data).then((_) => _.data);
