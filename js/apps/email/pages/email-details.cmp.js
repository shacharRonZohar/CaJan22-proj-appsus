// import emailAppCmp from "../../../pages/email-app.cmp"
import { utilService } from '../../../services/utilService.js'
import { emailService } from '../services/emailService.js'

export default {
    props: [''],
    emits: [''],
    template: `
        <section v-if="email" class="email-details">
            <span class="subject">{{subjectTxt}}</span>
            <span class="from">{{email.from.fullName}} {{email.from.email}}</span>
            <span class="to">{{email.to.fullName}}</span>
            <span class="sent-at">{{formattedTime}}</span>
            <span class="body-preview">{{email.body}}</span>
        </section>
    `,
    components: {

    },
    data() {
        return {
            email: null
        }
    },
    created() {
        this.loadEmail()
    },
    unmounted() {

    },
    methods: {
        loadEmail() {
            const id = this.$route.params.emailId
            if (id) {
                emailService.get(id)
                    .then(email => this.email = email)
            }
        }
    },
    computed: {
        subjectTxt() {
            return this.email.subject ? this.email.subject : 'No Subject'
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