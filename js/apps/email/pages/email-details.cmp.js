// import emailAppCmp from "../../../pages/email-app.cmp"
import { utilService } from '../../../services/utilService.js'
import { emailService } from '../services/emailService.js'

export default {
    props: ['emails'],
    emits: [''],
    template: `
        <section v-if="email" class="email-details">
            <header class="email-header">
                <span class="subject">{{subjectTxt}}</span>
                <div class="from">
                    <span class="name">
                        {{email.from.fullName}}
                    </span>
                    <small class="email">
                        <{{email.from.email}}>
                    </small>
                </div>
                <span class="sent-at">{{formattedTime}}</span>
                <span class="to">{{email.to.fullName}}</span>
            </header>
            <pre class="email-body">{{email.body}}</pre>
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