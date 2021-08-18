<template>
    <div class="flex justify-between items-center">
        <div v-if="label" class="mr-2">
            {{ label }}
        </div>
        <el-select
            v-model="data"
            :size="size"
            :placeholder="placeholder"
            :clearable="clearable"
            class="flex-grow"
            :class="{'text-select': type === 'text'}"
            @change="onChange"
        >
            <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item[optionLabel]"
                :value="item[optionValue]"
            />
        </el-select>
    </div>
</template>

<script>
    import _assign from 'lodash/assign';
    import _omit from 'lodash/omit';

    export default {
        props: {
            options: {
                type: Array,
                required: true,
            },
            query: {
                type: String,
                required: true,
            },
            label: String,
            placeholder: {
                type: String,
                default: 'All',
            },
            size: {
                type: String,
                default: 'medium',
            },
            type: {
                type: String,
                default: 'default',
            },
            clearable: {
                type: Boolean,
                default: true,
            },
            selectDefault: {
                type: Boolean,
                default: false,
            },
            optionLabel: {
                type: String,
                default: 'label',
            },
            optionValue: {
                type: String,
                default: 'value',
            },
        },

        data() {
            return {
                data: this.$route.query[this.query] || (this.selectDefault ? this.options[0][this.optionValue] : null),
            };
        },

        methods: {
            onChange({ query = {} }) {
                if (this.data) {
                    this.$router.push({
                        query: _assign({}, this.$route.query, query, {
                            [this.query]: this.data,
                            page: 1,
                        }),
                    });
                } else {
                    this.$router.push({
                        query: _assign({}, _omit(this.$route.query, [this.query]), {
                            page: 1,
                        }),
                    });
                }
            },
        },
    };
</script>

<style lang="scss">
    .el-select.text-select {
        .el-input__inner {
            border-width: 0px;
            width: 120px;
            text-align: right;
        }
    }
</style>
