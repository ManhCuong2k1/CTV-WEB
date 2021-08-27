<template>
    <el-dropdown trigger="click" @visible-change="onShow">
        <el-badge :value="unRead()">
            <i class="text-2xl far fa-bell text-white" />
        </el-badge>
        <el-dropdown-menu slot="dropdown" class="noti-list">
            <el-dropdown-item v-for="(notification, index) in notifications" :key="index" class="noti-list-item border-b last:border-0">
                <nuxt-link to="#" class="mb-2">
                    <div>{{ notification.content }}</div>
                    <div class="text-gray-500 text-xs">
                        {{ notification.createdAt | humanizeTime }}
                    </div>
                </nuxt-link>
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
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import InfiniteLoading from 'vue-infinite-loading';
    import { image as toImage } from '~/utils/url';

    export default {
        components: {
            InfiniteLoading,
        },

        data() {
            return {
                openTime: new Date().getTime(),
            };
        },

        computed: {
            ...mapState('notifications', ['notifications']),
        },

        async mounted() {
            await this.$store.dispatch('notifications/fetch');
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

            toImage,
        },
    };
</script>

<style lang="sass" scoped>
.noti-list
    padding: 0px
    max-width: 450px
    height: 500px
    overflow-y: auto
    overflow-x: hidden
    .noti-list-item
        font-size: 15px
        padding: 5px 18px
    .noti-list-item.sign-out
            border-top: 1px solid #dcdcdc
</style>
