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
            emails: null,
            criteria: {
                status: 'sent',
                txt: 'puki', // no need to support complex text search 
                isRead: true, // (optional property, if missing: show all) 
                isStared: true, // (optional property, if missing: show all) 
                lables: ['important', 'romantic']
            } // has any of the labels }
        }
    },
    created() {
        this.loadEmails()
    },
    methods: {
        loadEmails() {
            emailService.query(this.criteria)
                .then(emails => this.emails = emails)
        }
    },
    computed: {

    },
}