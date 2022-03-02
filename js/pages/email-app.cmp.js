import { emailService } from "../apps/email/services/emailService.js"
import emailList from "../apps/email/cmps/email-list.cmp.js"

export default {
    emits: [''],
    template: `
        <section class="email-app">
            <nav class="side-nav">
                <router-link to="/email/inbox">
                    <div class="icon inbox"></div>
                    Inbox
                </router-link>
                <router-link to="/email/sent">
                    <div class="icon sent"></div>
                    Sent
                </router-link>
            </nav>
            <router-view @read="onRead" class="email-content" :emails="emails" />
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
        },
        onRead(id) {
            console.log(id)
            emailService.get(id)
                .then(email => {
                    if (!email.isRead) emailService.toggleRead(email)
                        .then(() => this.loadEmails())
                })
        }
    },
    computed: {
        getCriteria() {

        }
    },
}