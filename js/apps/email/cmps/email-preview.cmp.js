import { utilService } from '../../../services/utilService.js'

export default {
    props: ['email'],
    emits: [''],
    template: `
        <section class="email-preview" :class="isRead">
            <input type="checkbox" class="star icon" />
            <div class="star icon"></div>
            <span class="name-txt">{{email.from.fullName}}</span>
            <div class="txt-container">
                <span class="subject">{{subjectTxt}}</span>
                -
                <span class="body-preview">{{email.body}}</span>
            </div>
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
        formattedTime() {
            let opts = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            }
            if ((Date.now() - this.email.sentAt) < 86400000) { // The number of milliseconds for a day
                opts = {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            }
            return utilService.formatTime(this.email.sentAt, opts)
        }
    },
}