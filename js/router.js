import homePage from './pages/home-page.cmp.js'
import emailApp from './pages/email-app.cmp.js'
import emailDetails from './apps/email/cmps/email-details.cmp.js'
import keepApp from './pages/keep-app.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/email/:emailId',
        component: emailDetails
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