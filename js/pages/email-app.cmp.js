import { emailService } from "../apps/email/services/emailService.js"
import emailList from "../apps/email/cmps/email-list.cmp.js"

export default {
    emits: [''],
    template: `
        <section class="email-app">This is an email page!
            <email-list :emails="emails" />
        </section>
    `,
    components: {
        emailList
    },
    data() {
        return {
            emails: null
        }
    },
    created() {
        this.loadEmails()
    },
    unmounted() {

    },

    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        }
    },
    computed: {

    },
}