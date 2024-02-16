import Vue from 'vue'
import Router from 'vue-router'
import autenticar from "@/auth/autenticar.js";


Vue.use(Router)
export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    // 2024-02-15
    {
      path: '/',
      redirect: '/inicio',
      name: 'Inicio',
      component: () => import('@/containers/TheContainer'),
      children: [
        // 2024-02-15
        {
          path: 'inicio',
          //beforeEnter: autenticar,
          component: () => import('@/views/Inicio')
        },
        // 2024-02-15
        {
          path: 'perfil',
          beforeEnter: autenticar,
          name: 'Perfil del Usuario',
          component: () => import('@/views/perfiles/Perfil')
        },
        // 2024-02-15
        {
          path: 'usuarios',
          redirect: '/usuarios/usuarios',  
          name: 'Usuarios',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-02-15
            {
              path: 'usuarios',
              beforeEnter: autenticar,
              name: 'Usuarios IE',
              component: () => import('@/views/usuarios/Usuarios')
            },
          ]
        },
        // 2024-02-15
        {
          path: 'restringida',
          component: () => import('@/views/pages/Restringida')
        },    
      ]
    },
    // 2024-02-15
    {
      path: "*",
      component: () => import('@/views/pages/Extraviada')
    },
    // 2024-02-15
    {
      path: '/bienvenida',
      component: () => import('@/views/pages/Bienvenida')
    }
  ]
}

