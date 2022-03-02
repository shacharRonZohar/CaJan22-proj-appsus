import { emailService } from "../apps/email/services/emailService.js"
import emailList from "../apps/email/cmps/email-list.cmp.js"

export default {
    emits: [''],
    template: `
        <section class="email-app">
            <nav class="side-nav">
                <router-link to="/email/inbox">Inbox</router-link>
                <router-link to="/email/sent">Sent</router-link>
            </nav>
            <router-view :emails="emails" />
        </section>
    `,
    components: {
        emailList
    },
    data() {
        return {
            emails: null,
            criteria: {
                status: 'inbox',
                txt: 'puki', // no need to support complex text search 
                isRead: true, // (optional property, if missing: show all) 
                isStared: true, // (optional property, if missing: show all) 
                lables: ['important', 'romantic'] // has any of the labels 
            }
        }
    },
    created() {
        this.loadEmails()
    },
    watch: {
        '$route.params.status': {
            handler() {
                this.criteria.status = this.$route.params.status
                this.loadEmails()
            },
            immediate: true,
        }
    },
    methods: {
        loadEmails() {
            emailService.query(this.criteria)
                .then(emails => this.emails = emails)
        }
    },
    computed: {
        getCriteria() {

        }
    },
}