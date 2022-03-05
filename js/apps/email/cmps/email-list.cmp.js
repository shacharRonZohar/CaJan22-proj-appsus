import emailPreview from './email-preview.cmp.js'
import { emailService } from '../services/emailService.js'

export default {
    props: ['emails'],
    emits: ['read', 'removed', 'star'],
    template: `
        <section class="email-list">
            <ul>
                <li class="email-article" v-for="email in emails" :key="email.id" >
                    <email-preview @click.stop="onRead(email.id)" @star="onStar" @removed="onRemoved" :email="email"/>
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
        },
        onRemoved(id) {
            this.$emit('removed', id)
        },
        onStar(id) {
            this.$emit('star', id)
        }
    },
    computed: {
    },
}