import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from "../stores/";

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import("@/views/ChatRoom.vue"),
      beforeEnter() {
        if (!store().$state.userName) {
          return { name: "home" }
        }
      }
    }
  ]
})
