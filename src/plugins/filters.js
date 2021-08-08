import Vue from 'vue';
import formatDate from '~/filters/formatDate';
import formatDuration from '~/filters/formatDuration';
import humanizeTime from '~/filters/humanizeTime';
import formatNumber from '~/filters/formatNumber';

export default () => {
    Vue.filter('formatDate', formatDate);
    Vue.filter('formatDuration', formatDuration);
    Vue.filter('humanizeTime', humanizeTime);
    Vue.filter('formatNumber', formatNumber);
};
