import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    emits: ['read'],
    template: `
        <section class="email-list">
            <ul>
                <li class="email-article" v-for="email in emails" :key="email.id" >
                    <router-link :to="$route.params.status+'/'+email.id">
                        <email-preview @click="onRead(email.id)" :email="email"/>
                    </router-link>
                </li>
            </ul>
        </section>
    `,
    components: {
        emailPreview
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
        onRead(id) {
            this.$emit('read', id)
        }
    },
    computed: {

    },
}