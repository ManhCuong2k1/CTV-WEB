<template>
    <div class="content-view">
        <slot />
    </div>
</template>

<script>
    export default {
        props: {
            links: Array,
        },

        inject: ['setBreadcrumb'],

        created() {
            this.setBreadcrumb(this.links);
        },
    };
</script>
