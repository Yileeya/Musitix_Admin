<template>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"/>
</template>

<script>
import Editor from 'ckeditor5-custom-build/build/ckeditor';

export default {
    data() {
        return {
            editor: Editor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            }
        };
    }
}
</script>
