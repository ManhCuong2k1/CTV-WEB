import { format } from 'date-fns';
import { parseDateString } from '~/utils/date';

/**
 * @param {Date|number|string} date
 * @param {string} format
 * @param {string|null} fromFormat
 */
export default (date, toFormat = 'HH:mm dd/LL/yyyy', fromFormat) => {
    const then = typeof date === 'string' ? parseDateString(date, fromFormat) : date;

    return format(then, toFormat);
};
