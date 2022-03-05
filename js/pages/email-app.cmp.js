import { emailService } from "../apps/email/services/emailService.js"
import emailList from "../apps/email/cmps/email-list.cmp.js"
import emailCompose from "../apps/email/cmps/email-compose.cmp.js"

export default {
    emits: [''],
    template: `
        <section class="email-app">
            <nav class="side-nav">
                <router-link class="btn compose" :to="composePath">
                    <div class="icon"></div>
                    Compose
                </router-link>
                <router-link class="inbox" :to="getPath('inbox')">
                    <div class="icon"></div>
                    <div class="txt-container">
                        <span>Inbox</span>
                        <span>{{formattedNumOfUnread}}</span>
                    </div>
                </router-link>
                <router-link class="sent" :to="getPath('sent')">
                    <div class="icon"></div>
                    <div class="sent">Sent</div>
                </router-link>
                <router-link class="starred" :to="getPath('starred')">
                    <div class="icon"></div>
                    <div class="starred">Starred</div>
                </router-link>
                <router-link class="trash" :to="getPath('trash')">
                    <div class="icon"></div>
                    <div class="trash">Trash</div>
                </router-link>
                <router-link class="draft" :to="getPath('draft')">
                    <div class="icon"></div>
                    <div class="draft">draft</div>
                </router-link>
            </nav>
            <section class="email-search-container">
                <form @submit.prevent="loadEmails" class="email-search-form">
                    <button class="btn icon search"></button>
                    <input
                        v-model="criteria.txt"
                        type="text" 
                        name="email-search" 
                        id="email-search" 
                        class="email-search"
                        placeholder="Search in email" />
                </form>
                <div v-if="!isFilter" name="filterSelect" 
                id="filterSelect" class="icon filter"
                @click="toggleFilter"></div>
                <div v-else class="filter-container">
                    <select @change="loadEmails()" v-model="criteria.isRead" name="is-read" id="is-read">
                        <option selected >All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
                    <div class="set-sort-container">
                        <div @click.stop="onSetSort('title')">Title</div>
                        <div @click.stop="onSetSort('sentAt')">Date</div>
                    </div>
                </div>
                <div v-if="isFilter" class="filter-background" @click="toggleFilter"></div>
            </section>
            <div class="list-header"></div>
            <router-view @removed="onRemoved" @star="onStar" @read="onRead" class="email-content" :emails="emails" />
            <email-compose @sent="onSent" @close="closeCompose"  @draftSaved="loadEmails" v-if="isCompose"></email-compose>
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
                txt: '',
                isStared: false, // (optional property, if missing: show all) 
                lables: ['important', 'romantic'], // has any of the labels 
                sort: {
                    by: 'title',
                    isAsc: false
                }
            },
            numOfUnread: 0,
            isCompose: null,
            isFilter: false
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
                this.isCompose = this.$route.fullPath.includes('compose')
                if (this.$route.fullPath.includes('draft')) {
                    this.$route.params.compose = 'draft'
                } else this.$route.params.compose = 'new'
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
            emailService.get(id)
                .then(email => {
                    if (email.isRead === 'read') return email
                    return emailService.toggleRead(email)
                        .then(() => this.loadEmails())
                        .then(() => email)
                })
                .then((email) => {
                    if (email.status === 'draft') {
                        this.$router.push(`/email/draft/compose/${email.id}`)
                    } else this.$router.push(this.getIdPath(id))
                })
        },
        getIdPath(id) {
            let path = this.$route.fullPath
            if (!/compose/g.test(path)) return path + '/' + id
            return path.replace(/compose/g, id) + '/compose'
        },
        getPath(mainPath) {
            let composePath = ''
            if (this.$route.fullPath.includes('compose')) composePath = '/compose'
            return `/email/${mainPath}${composePath}`
        },
        closeCompose() {
            this.$router.push(this.$route.fullPath.substring(0, this.$route.fullPath.indexOf('/compose')))
        },
        onSent() {
            this.loadEmails()
            this.closeCompose()
        },
        onRemoved(id) {
            // console.log(id, 'App')
            emailService.handleRemove(id)
                .then(() => this.loadEmails())
        },
        onSetSort(sortBy) {
            if (this.criteria.sort.by === sortBy) this.criteria.sort.isAsc = !this.criteria.sort.isAsc
            this.criteria.sort.by = sortBy
            this.loadEmails()
        },
        toggleFilter() {
            this.isFilter = !this.isFilter
        },
        onStar(emailId) {
            emailService.toggleStar(emailId)
                .then(() => this.loadEmails())
        }
    },
    computed: {
        composePath() {
            if (this.$route.fullPath.includes('compose')) return this.$route.fullPath
            return this.$route.fullPath + '/compose'
        },
        formattedNumOfUnread() {
            return this.numOfUnread ? this.numOfUnread : ''
        },

    },
}