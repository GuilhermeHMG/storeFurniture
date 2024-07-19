import { createRouter, createWebHistory } from 'vue-router';
import { authMiddleware } from '../middlewares/checkStatusToken';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../components/Login/Login.vue"),
  },
  {
    path: '/inicio',
    name: 'Início',
    component: () => import("../pages/Home/Home.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/products',
    name: 'Produtos',
    component: () => import("../pages/Products/Products.vue"),
    meta: {
      requiresAuth: false
    }
  },
  
  // CRUDS
  {
    path: '/products/new',
    name: 'ProdutosNovos',
    component: () => import("../pages/Products/New.vue"),
    meta: {
      requiresAuth: false
    }
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
//   router.beforeEach(authMiddleware);
  
  export default router;