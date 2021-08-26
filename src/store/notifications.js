import _countBy from 'lodash/countBy';
import { getAll, markReadAll } from '~/api/notifications';
import { updateData } from '~/utils/data';

const state = () => ({
    notifications: [],
    unread: 0,
    batch: 0,
    lastBatch: 1,
});

const hasMore = (state) => state.batch < state.lastBatch;

const getters = {
    hasMore,

    withUnreadCount: (state) => (title) => (state.unread > 0
        ? `(${state.unread}) ${title}`
        : title
    ),

    unRead: (state) => _countBy(state.notifications, (notification) => notification.status === 'notseen').true,
};

const fetchData = async (page) => {
    const { data: res } = await getAll({ page });

    const notifications = res.data;
    const pagination = {
        page: res.page,
        pageSize: res.pageSize,
        total: res.total,
    };

    return {
        notifications,
        pagination,
    };
};

const mutate = (commit, mutation, { notifications, unread, pagination }) => {
    commit(mutation, notifications);
    commit('setUnreadCount', unread);
    commit('setPagination', {
        current: pagination.page,
        last: Math.ceil(pagination.total / pagination.pageSize),
    });
};

const markAllRead = async () => {
    await markReadAll({
        status: 'seen',
    });
};

const actions = {
    async fetchMore({ state, commit }) {
        if (!hasMore(state)) {
            return;
        }

        const notifications = await fetchData(state.batch + 1);
        mutate(commit, 'push', notifications);
        await markAllRead();
        commit('markAllRead');
    },

    async fetch({ commit }) {
        const notifications = await fetchData();
        mutate(commit, 'set', notifications);
    },

    async clear({ commit }) {
        await markAllRead();
        commit('markAllRead');
    },
};

const mutations = {
    shift(state, notification) {
        state.notifications = [notification, ...state.notifications];
    },

    push(state, notifications) {
        state.notifications = [...state.notifications, ...notifications];
    },

    set(state, notifications) {
        state.notifications = notifications;
    },

    setPagination(state, { current, last }) {
        state.batch = current;
        state.lastBatch = last;
    },

    setRead(state, id) {
        state.notifications = updateData(state.notifications, 'id', id, { is_read: true });
    },

    setUnreadCount(state, unread) {
        state.unread = unread;
    },

    clear(state) {
        state.notifications = [];
        state.batch = 0;
        state.lastBatch = 1;
        state.unread = 0;
    },

    markAllRead(state) {
        state.notifications.forEach((notification) => {
            notification.status = 'seen';
        });
    },
};

export {
    state,
    getters,
    actions,
    mutations,
};
