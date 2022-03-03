import { emailService } from "../apps/email/services/emailService.js"
import emailList from "../apps/email/cmps/email-list.cmp.js"

export default {
    emits: [''],
    template: `
        <section class="email-app">
            <nav class="side-nav">
                <router-link class="inbox" to="/email/inbox">
                    <div class="icon"></div>
                    Inbox <span>{{formattedNumOfUnread}}</span>
                </router-link>
                <router-link class="sent" to="/email/sent">
                    <div class="icon"></div>
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
            },
            numOfUnread: 0
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
        },
        'this.emails': {
            handler() {
                if (this.criteria.status !== 'inbox' || !this.emails) return
                // if () retur
                console.log(this.emails)
                this.numOfUnread = this.emails.filter(email => email.isRead).length
            },
            immediate: true,
            deep: true
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

        },
        formattedNumOfUnread() {
            return this.numOfUnread ? this.numOfUnread : ''
        }
    },
}