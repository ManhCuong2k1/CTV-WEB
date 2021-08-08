<template>
    <div>
        <Editor
            id="app-editor"
            v-model="contentData"
            api-key="qy4l64pw4vzjxnaho0yvwtfc1kafv8lzq7ikt6lnbapllrlg"
            :init="inital"
            :value="contentData"
            :config="{}"
            plugins="lists code"
        />
        <div>
            <el-dialog
                title="Media"
                :visible.sync="dialogVisible"
                width="50%"
            >
                <ImageFinder @confirmPick="confirmPick" />
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';
    import ImageFinder from '~/components/ImageFinder.vue';
    import { image as toImage } from '~/utils/url';

    export default {
        components: {
            Editor,
            ImageFinder,
        },
        props: {
            content: {
                required: true,
                type: String,
            },
            setHeight: {
                type: Number,
            },
        },
        data() {
            return {
                contentData: this.content,
                dialogVisible: false,
                selected: '',
            };
        },
        computed: {
            inital() {
                const pickImagePlugin = (editor) => {
                    editor.ui.registry.addButton('myPickImageButton', {
                        icon: 'image',
                        onAction: () => {
                            this.dialogVisible = true;
                        },
                    });
                };
                const qoutePlugin = (editor) => {
                    editor.ui.registry.addMenuButton('myQuotesButton', {
                        text: 'Quotes',
                        fetch(callback) {
                            const items = [
                                {
                                    type: 'menuitem',
                                    text: 'Chữ đầu đoạn',
                                    onAction() {
                                        const slectedText = editor.selection.getContent({ format: 'text' });
                                        editor.insertContent(`<div class="start_char">${slectedText}</div>`);
                                    },
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Khung trích dẫn',
                                    onAction() {
                                        const slectedText = editor.selection.getContent({ format: 'html' });
                                        if (slectedText !== '') {
                                            editor.insertContent(`<div class="quote_box">${slectedText}</div>`);
                                        }
                                    },
                                },
                            ];
                            callback(items);
                        },
                    });
                };
                return {
                    select: '#app-editor',
                    plugins: 'myPickImageButton  myQuotesButton fullscreen image',
                    content_css: '/css/tinymce-css.css',
                    font_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n',
                    toolbar: 'fullscreen | undo redo | myPickImageButton myQuotesButton | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link | code',
                    setup() {
                        window.tinymce.PluginManager.add('myPickImageButton', pickImagePlugin);
                        window.tinymce.PluginManager.add('myQuotesButton', qoutePlugin);
                    },
                    height: this.setHeight || 350,
                    image_class_list: [
                        { title: 'None', value: '' },
                        { title: 'No border', value: 'img_no_border' },
                        { title: 'Green border', value: 'img_green_border' },
                        { title: 'Blue border', value: 'img_blue_border' },
                        { title: 'Red border', value: 'img_red_border' },
                    ],
                };
            },
        },
        watch: {
            contentData() {
                this.$emit('contentChange', this.contentData);
            },
            content() {
                this.contentData = this.content;
            },
        },
        methods: {
            toImage,
            confirmPick(name) {
                this.dialogVisible = false;
                window.tinymce.activeEditor.insertContent(`<img alt="${name}" src="${this.toImage(name, 'full')}"/>`);
            },
        },
    };
</script>
