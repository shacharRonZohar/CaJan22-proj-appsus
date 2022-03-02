import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul>
                <li class="email-article" v-for="email in emails" :key="email.id" >
                    <email-preview :email="email"/>
                </li>
            </ul>
            <!-- {{emails}} -->
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

    },
    computed: {

    },
}