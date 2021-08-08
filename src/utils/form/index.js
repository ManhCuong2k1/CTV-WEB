import _mapValues from 'lodash/mapValues';
import _each from 'lodash/each';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';

export function collectServerError(errors) {
    return _mapValues(errors, '0');
}

export const convertToFormData = (data) => {
    const formData = new FormData();

    _each(data, (value, name) => {
        if (value == null) {
            return;
        }

        if (_isArray(value)) {
            _each(value, (item) => formData.append(`${name}[]`, item));
        } else if (_isObject(value)) {
            if (value instanceof File) {
                formData.append(name, value);
            } else {
                _each(value, (v, k) => formData.append(`${name}[${k}]`, v));
            }
        } else {
            formData.append(name, value);
        }
    });

    return formData;
};

export const validString = (rule, value, callback) => {
    if (value.length < rule.min || value.length > rule.max) {
        callback(new Error(`Độ dài từ ${rule.min} đến ${rule.max}`));
    } else {
        callback();
    }
};

export const validPositiveNumbers = (rule, value, callback) => {
    if (parseInt(value, 10) >= 0 && !value.toString().includes(['.'])) {
        callback();
    } else {
        callback(new Error('Giá trị nguyên lớn hơn hoặc bằng 0'));
    }
};

export const validPhone = (rule, value, callback) => {
    const regex = /(^(\+84\d{9}))|(^(09|03|07|08|05)+([0-9]{8})\b)/g;
    if (!regex.test(value)) {
        callback(new Error('Giá trị nguyên lớn hơn hoặc bằng 0'));
    } else {
        callback();
    }
};

export const validCate = (rule, value, callback) => {
    if (!value.id) {
        callback(new Error('Hãy chọn một thể loại'));
    } else {
        callback();
    }
};

export const validInteger = (rule, value, callback) => {
    if (parseInt(value, 10) !== parseFloat(value)) {
        callback(new Error('Hãy nhập số nguyên'));
    } else {
        callback();
    }
};
