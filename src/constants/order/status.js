export const CREATED = 'created';
export const PROCESSING = 'processing';
export const SHIPPING = 'shipping';
export const SUCCESS = 'success';
export const CANCELED = 'canceled';

export const options = [{
    label: 'Mới tạo',
    value: CREATED,
    type: 'info',
}, {
    label: 'Đang xử lý',
    value: PROCESSING,
    type: 'primary',
}, {
    label: 'Đang vận chuyển',
    value: SHIPPING,
    type: 'danger',
}, {
    label: 'Hoàn thành',
    value: SUCCESS,
    type: 'success',
}, {
    label: 'Hủy',
    value: CANCELED,
    type: 'danger',
}];

export default [
    CREATED,
    PROCESSING,
    SHIPPING,
    SUCCESS,
    CANCELED,
];
