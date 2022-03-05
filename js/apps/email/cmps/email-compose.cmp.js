import { emailService } from "../services/emailService.js"

export default {
    props: [''],
    emits: ['close', 'sent', 'draftSaved'],
    template: `
            <section class="email-compose">
                <div class="header-container">
                    <header class="layout">
                        <div @click="close" class="close-container click">
                            <div class=" close icon"></div>
                        </div>
                    </header>
                </div>
                <form @submit.prevent="sendEmail" v-if="newEmail" class="layout">
                    <label for="to">
                        To
                        <input id="to" name="to" type="text" v-model="newEmail.to.email">
                    </label>
                    <input id="subject" type="text" v-model="newEmail.subject" placeholder="Subject">
                    <textarea 
                        name="body" 
                        id="body" 
                        cols="30" 
                        rows="10" 
                        v-model="newEmail.body"
                        class="body">
                    </textarea>
                    <button class="btn send-email">Send</button>
                </form>
            </section>
    `,
    components: {

    },
    data() {
        return {
            newEmail: null,
            interval: null
        }
    },
    created() {
        console.log(this.$route.params)
        if (this.$route.params.status === 'draft') {
            emailService.get(this.$route.params.emailId)
                .then(newEmail => this.newEmail = newEmail)
                .then(newEmail => this.interval = setInterval(this.saveAsDraft, 5000, newEmail))
        } else emailService.getNewEmail()
            .then(newEmail => this.newEmail = newEmail)
            .then(newEmail => this.interval = setInterval(this.saveAsDraft, 5000, newEmail))
    },
    unmounted() {
        clearInterval(this.interval)
    },

    methods: {
        sendEmail() {
            console.log(this.newEmail)
            emailService.send(this.newEmail)
                .then(() => this.$emit('sent'))

        },
        close() {
            this.$emit('close')
        },
        saveAsDraft(newEmail) {
            emailService.get(newEmail.id)
                .then(email => {
                    // console.log(email, newEmail)
                    if (!email) {
                        newEmail.status = 'draft'
                        newEmail.isRead = true
                        return emailService.post(newEmail)
                    }
                    return emailService.put(newEmail)
                })
                .then(newEmail => this.newEmail = newEmail)
                .then(() => this.$emit('draftSaved'))
        }
    },
    computed: {

    },
}
