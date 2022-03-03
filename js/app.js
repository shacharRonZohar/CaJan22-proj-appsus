import { router } from './router.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

Vue.createApp({
    template: `
        <section class="main-app-container">
            <app-header />
            <router-view class="main-content main-layout"/>
            <app-footer />
        </section>
    `,
    created() {
        console.log('hi')
    },
    components: {
        appHeader,
        appFooter,
    }
}).use(router).mount('#app')