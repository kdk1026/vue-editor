<template>
    <div>
        <QuillEditor theme="snow" :toolbar="toolbarOptions" ref="editor" :modules="modules" />
        <button @click="onConfirmConsole">콘솔 확인</button>
        <button @click="onSetContent">내용 넣기</button>
    </div>
</template>

<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue';
import ImageUploader from 'quill-image-uploader';

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ];

    const editor = ref();

    const onConfirmConsole = () => {
        console.log(editor.value.getHTML());
    };

    const modules = {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
            upload: file => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append('image', file);

                    fetch(`${process.env.VUE_APP_API_URL}/editor/image-upload`, {
                        method: 'post',
                        body: formData
                    })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        //console.log(data);
                        resolve(data.fileUrl);
                    })
                    .catch((err) => {
                        reject("Upload failed");
                        console.error("Error:", err);
                    });
                });
            }
        }
    };

    const onSetContent = () => {
        const content = '<h1>테스트</h1><br/><p>테스트1234</p>';
        editor.value.setHTML(content)
    };
</script>

<style>
.ql-editor {
	min-height: 500px !important;
}
</style>