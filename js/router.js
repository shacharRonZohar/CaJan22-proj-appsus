import homePage from './pages/home-page.cmp.js'
import mailApp from './pages/mail-app.cmp.js'
import keepApp from './pages/keep-app.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/keep',
        component: keepApp
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})