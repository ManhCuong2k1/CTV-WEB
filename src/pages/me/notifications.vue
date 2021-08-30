<template>
    <div>
        <div class="font-bold text-xl">
            <i class="text-xl far fa-bell" />
            Danh sách thông báo
        </div>
        <el-divider />
        <div class="noti-list-menu">
            <div v-if="notifications.length > 0">
                <el-dropdown-item v-for="(notification, index) in notifications" :key="index" class="noti-list-item border-b last:border-0">
                    <nuxt-link :to="notification.type === 'order' ? `/orders/${notification.objectId}` : ''" class="flex items-center mb-2">
                        <div class="text-gray-500 text-xs mr-2">
                            {{ notification.createdAt | humanizeTime }}
                        </div>
                        <el-divider direction="vertical" />
                        <div>{{ notification.content }}</div>
                    </nuxt-link>
                </el-dropdown-item>
            </div>
            <el-dropdown-item v-else class="text-sm">
                Không có thông báo
            </el-dropdown-item>
            <client-only>
                <InfiniteLoading
                    ref="loader"
                    :distance="50"
                    spinner="spiral"
                    @infinite="onInfinite"
                >
                    <span slot="no-uploadResults" />
                    <span slot="no-more" />
                    <div slot="no-results">
                        <span v-if="!notifications.length" class="text-sm">
                            Không có thông báo
                        </span>
                    </div>
                </InfiniteLoading>
            </client-only>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        components: {
            InfiniteLoading,
        },

        async asyncData({ store }) {
            await store.dispatch('notifications/fetch');
        },

        data() {
            return {
                openTime: new Date().getTime(),
            };
        },

        computed: {
            ...mapState('notifications', ['notifications']),
        },

        methods: {
            ...mapActions('notifications', {
                fetchNotifications: 'fetch',
                fetchMore: 'fetchMore',
                clearUnread: 'clear',
            }),

            ...mapGetters('notifications', ['hasMore', 'unRead']),

            clear() {
                if (this.unRead() > 0) {
                    this.clearUnread();
                }
            },

            onInfinite($state) {
                this.fetchMore().then(() => {
                    if (this.hasMore()) {
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },

            onItemClick(id) {
                this.setRead(id);
                this.hide();
            },

            setRead(id) {
                this.$store.commit('notifications/setRead', id);
            },

            hide() {
                this.$refs.flyout.close();
                this.clear();
            },

            onShow() {
                this.clear();
                this.openTime = new Date().getTime();
            },
        },

        head() {
            return {
                title: 'Thông báo | Battay',
            };
        },
    };
</script>
