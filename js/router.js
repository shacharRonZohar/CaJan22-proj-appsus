import homePage from './pages/home-page.cmp.js'
import emailApp from './pages/email-app.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js'
import emailList from './apps/email/cmps/email-list.cmp.js'
import keepApp from './pages/keep-app.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp,
        children: [{
            path: ':status',
            component: emailList,
        },
        {
            path: ':status/compose',
            component: emailList
        },
        {
            path: ':status/:emailId',
            component: emailDetails
        },
        {
            path: ':status/:emailId/compose',
            component: emailDetails
        },
        ],
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