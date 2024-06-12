import Main from '../pages/Main.vue';
import Tui from '../pages/Tui.vue';
import Ck from '../pages/Ck.vue';
import Quill from '../pages/Quill.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: Main },
    { path: '/tui', component: Tui },
    { path: '/ck', component: Ck },
    { path: '/quill', component: Quill },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;