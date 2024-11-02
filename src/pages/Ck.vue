<template>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <button @click="onConfirmConsole">콘솔 확인</button>
    <button @click="onSetContent">내용 넣기</button>
</template>

<script setup>
import { ref } from "vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import UploadAdapter from '../assets/js/ckeditor/UploadAdapter';

    const editorData = ref('<h1>initialValue</h1>');

    const editor = ClassicEditor;

    // 화살표 함수로 작성하면 오류남
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
        };
    }

    const editorConfig = {
        language: 'ko',
        extraPlugins: [uploadPlugin]
    };

    const onConfirmConsole = () => {
        console.log(editorData.value);
    };

    const onSetContent = () => {
        const content = '<h1>테스트</h1><br/><p>테스트1234</p>';
        editorData.value = content;
    };
</script>

<style>
.ck-editor__editable { height: 500px; }
</style>