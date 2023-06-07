<template>
    <div>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>

<script>
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                plugins: [
                    Essentials,
                    Bold,
                    Italic,
                    Paragraph,
                    SourceEditing
                ],

                toolbar: {
                    items: [
                        'bold',
                        'italic',
                        'undo',
                        'redo',
                        'sourceEditing'
                    ]
                }
            }
        };
    }
};
</script>
