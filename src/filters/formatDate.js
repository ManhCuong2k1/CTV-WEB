import { format } from 'date-fns';
import { parseDateString } from '~/utils/date';

/**
 * @param {Date|number|string} date
 * @param {string} format
 * @param {string|null} fromFormat
 */
export default (date, toFormat = 'dd-LL-yyyy HH:mm:ss', fromFormat) => {
    const then = typeof date === 'string' ? parseDateString(date, fromFormat) : date;

    return format(then, toFormat);
};
