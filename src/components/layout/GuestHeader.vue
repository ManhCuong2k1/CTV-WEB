<template>
    <div class="flex items-center py-2">
        <nuxt-link to="/">
            <div class="text-3xl font-bold tracking-wider">
                Battay
            </div>
        </nuxt-link>
        <div class="text-white text-xl border-l-2 ml-4 pl-4">
            {{ title }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
        },
    };
</script>
