import emailPreview from './email-preview.cmp.js'
import { emailService } from '../services/emailService.js'

export default {
    props: ['emails'],
    emits: ['read', 'removed', 'star','toggleRead'],
    template: `
        <section class="email-list">
            <ul>
                <li class="email-article" v-for="email in emails" :key="email.id" >
                    <email-preview @click.stop="onRead(email.id)" @star="onStar" @removed="onRemoved" @toggleRead="onToggleRead" :email="email"/>
                </li>
            </ul>
        </section>
    `,
    components: {
        emailPreview
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
        },
        onToggleRead(id){
            this.$emit('toggleRead',id)
        }
    },
}