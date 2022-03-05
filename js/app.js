import { router } from './router.js'
import appHeader from './cmps/app-header.cmp.js'

Vue.createApp({
    template: `
        <section class="main-app-container">
            <app-header />
            <router-view class="main-content main-layout"/>
        </section>
    `,
    components: {
        appHeader,
    }
}).use(router).mount('#app')