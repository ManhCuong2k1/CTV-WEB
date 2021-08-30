<template>
    <el-dropdown trigger="click" @visible-change="onShow">
        <el-badge :value="unRead()">
            <i class="text-2xl far fa-bell text-white" />
        </el-badge>
        <el-dropdown-menu slot="dropdown" class="noti-list">
            <div class="py-2 px-4 border-b font-bold">
                Thông báo
            </div>
            <div class="noti-list-menu">
                <div v-if="notifications.length > 0">
                    <el-dropdown-item v-for="(notification, index) in notifications" :key="index" class="noti-list-item border-b last:border-0">
                        <nuxt-link :to="notification.type === 'order' ? `/orders/${notification.objectId}` : ''" class="mb-2">
                            <div>{{ notification.content }}</div>
                            <div class="text-gray-500 text-xs">
                                {{ notification.createdAt | humanizeTime }}
                            </div>
                        </nuxt-link>
                    </el-dropdown-item>
                </div>
                <el-dropdown-item v-else class="text-sm">
                    Không có thông báo
                </el-dropdown-item>
                <client-only>
                    <infinite-loading
                        ref="loader"
                        @infinite="onInfinite"
                    >
                        <span slot="no-uploadResults" />
                        <span slot="no-more" />
                        <div slot="no-results">
                            <span v-if="!notifications.length" class="text-sm">
                                Không có thông báo
                            </span>
                        </div>
                    </infinite-loading>
                </client-only>
            </div>
            <nuxt-link to="/me/notifications" class="py-2 px-4 border-b font-bold border-t text-center">
                Xem tất cả
            </nuxt-link>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import { image as toImage } from '~/utils/url';

    export default {
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
    .noti-list-menu
        max-height: 450px
        overflow-y: auto
        overflow-x: hidden
    .noti-list-item
        font-size: 15px
        padding: 5px 18px
    .noti-list-item.sign-out
            border-top: 1px solid #dcdcdc
</style>
