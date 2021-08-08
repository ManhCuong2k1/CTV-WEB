export const cleanObject = (obj) => Object.keys(obj)
    .filter((k) => (obj[k] != null && obj[k] !== ''))
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
