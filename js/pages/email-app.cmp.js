import { emailService } from "../apps/email/services/emailService.js"
import emailList from "../apps/email/cmps/email-list.cmp.js"
import emailCompose from "../apps/email/cmps/email-compose.cmp.js"

export default {
    emits: [''],
    template: `
        <section class="email-app">
            <nav class="side-nav">
                <router-link class="btn compose" :to="getComposePath">
                    <div class="icon"></div>
                    Compose
                </router-link>
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
            <email-compose @sent="onSent" @close="closeCompose" v-if="isCompose"></email-compose>
        </section>
    `,
    components: {
        emailList,
        emailCompose
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
            numOfUnread: 0,
            isCompose: null
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
        '$route.fullPath': {
            handler() {
                this.isCompose = this.$route.fullPath.includes('compose') ? true : false
            },
            immediate: true,
        },
        'emails': {
            handler() {
                // console.log(this.emails)
                // console.log(oldValue, newValue)
                if (!this.emails) return
                emailService.getNumOfUnread()
                    .then(numOfUnread => this.numOfUnread = numOfUnread)
                // = this.emails.filter()
            },
            deep: true,
            immediate: true,
        }
    },
    methods: {
        loadEmails() {
            emailService.query(this.criteria)
                .then(emails => this.emails = emails)
        },
        onRead(id) {
            // console.log(id)
            emailService.get(id)
                .then(email => {
                    if (!email.isRead) emailService.toggleRead(email)
                        .then(() => this.loadEmails())
                })
        },
        closeCompose() {
            this.$router.push(this.$route.fullPath.replace('/compose', ''))
        },
        onSent() {
            this.loadEmails()
            this.closeCompose()
        }
    },
    computed: {
        getComposePath() {
            if (this.$route.fullPath.includes('compose')) return this.$route.fullPath
            return this.$route.fullPath + '/compose'
            this.$route.params.compose = 'compose'
            // this.$router.push(`${this.$route.fullPath}/compose`)
            this.$router.push(this.$route.fullPath)
        },
        getCriteria() {

        },
        formattedNumOfUnread() {
            return this.numOfUnread ? this.numOfUnread : ''
        },

    },
}