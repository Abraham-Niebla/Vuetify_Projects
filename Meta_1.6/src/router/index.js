// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Imagen.vue'),
      },
      {
        path: '/imagen',
        name: 'Imagen',
        component: () => import('@/views/Imagen.vue'),
      },
      {
        path: '/tabla',
        name: 'Tabla',
        component: () => import('@/views/Tabla.vue'),
      },
      {
        path: '/tablaeditable',
        name: 'Tabla Editable',
        component: () => import('@/views/TablaEditable.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
