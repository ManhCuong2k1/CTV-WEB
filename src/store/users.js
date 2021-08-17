import { getAll } from '~/api/users';

const state = () => ({
    users: [],
});

const actions = {
    async getUsers({ commit }) {
        const users = await getAll();

        commit('setUsers', users);
    },
};

const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
};

export {
    state,
    actions,
    mutations,
};
