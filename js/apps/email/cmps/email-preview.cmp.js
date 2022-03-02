import { utilService } from '../../../services/utilService.js'

export default {
    props: ['email'],
    emits: [''],
    template: `
    <!-- {{email}} -->
    <section class="email-preview" :class="isRead">
        <span class="name-txt">{{nameTxt}}</span>
        <span class="subject">{{subjectTxt}}</span>
        <span class="body-preview">{{email.body}}</span>
        <span class="sent-at">{{formattedTime}}</span>
    </section>
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
        subjectTxt() {
            return this.email.subject ? this.email.subject : 'No Subject'
        },
        isRead() {
            return { 'read': this.email.isRead }
        },
        nameTxt() {
            if (this.email.status === 'inbox') return this.email.from.fullName
            else return this.email.to.fullName
        },
        formattedTime() {
            let opts = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            }
            if ((Date.now() - this.email.sentAt) < 86400000) {
                opts = {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            }
            return utilService.formatTime(this.email.sentAt, opts)
        }
    },
}