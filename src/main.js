import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { QuillEditor } from '@vueup/vue-quill'

const app = createApp(App);
app.use(router);
app.use(CKEditor);
app.component('QuillEditor', QuillEditor);
app.mount('#app');
