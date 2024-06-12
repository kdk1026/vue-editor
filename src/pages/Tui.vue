<template>
    <div>
        <div ref="editor"></div>
        <button @click="onConfirmConsole">콘솔 확인</button>
        <button @click="onSetContent">내용 넣기</button>
    </div>
</template>

<script setup>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { onMounted, ref } from 'vue';

    const editor = ref();
    const editorValid = ref();

    onMounted(() => {
        editorValid.value = new Editor({
            el: editor.value,
            initialValue: 'initialValue',
            previewStyle: 'vertical',
            height: '500px',
            initialEditType: 'wysiwyg',
            useCommandShortcut: false,
            language: 'ko-KR',
            hooks: {
                addImageBlobHook: onUploadImage
            }
        });
    });

    const onConfirmConsole = () => {
        const data = editorValid.value.getHTML();
        console.log(data);
    };

    const onUploadImage = async (blob, callback) => {
        //console.log(blob);

        const formData = new FormData();
        formData.append('image', blob);

        await fetch(`${process.env.VUE_APP_API_URL}/editor/image-upload`, {
            method: 'post',
            body: formData
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            callback(data.fileUrl);
        })
    };

    const onSetContent = () => {
        alert('오류나서 불가');
        
        // let content = '<h1>테스트</h1><br/><p>테스트1234</p>';
        // editorValid.value.setHTML(content);
    };
</script>

<style scoped>

</style>