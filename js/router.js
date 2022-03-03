import homePage from './pages/home-page.cmp.js'
import emailApp from './pages/email-app.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js'
import emailList from './apps/email/cmps/email-list.cmp.js'
import keepApp from './pages/keep-app.cmp.js'
import noteEdit from './apps/keep/pages/note-edit.cmp.js'
import noteList from './apps/keep/cmps/note-list.cmp.js'
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
<<<<<<< HEAD
        }],
=======
        },
        ],
>>>>>>> 5fe6fe38d0ffb317ef3c00c752290140cb564015
    },

    {
        path: '/keep',
        component: keepApp,
        children: [{
            path: ':noteType/:noteId',
            component: noteList
        }]
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})