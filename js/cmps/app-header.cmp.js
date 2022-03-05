export default {
    props: [''],
    emits: [''],
    template: `
        <header class="main-header  main-layout">
            <router-link to="/" class="logo"></router-link>
            <nav>
                <router-link to="/">Home</router-link>
                <router-link to="/keep">Keep</router-link>
                <router-link to="/email/inbox">Email</router-link>
            </nav>
        </header>
    `,
    components: {

    },
    data() {
        return {

        }
    },
    created() {

    },
    unmounted() {

    },

    methods: {

    },
    computed: {

    },
}