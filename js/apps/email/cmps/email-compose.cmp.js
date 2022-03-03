import { emailService } from "../services/emailService.js"

export default {
    props: [''],
    emits: [''],
    template: `
            <section class="email-compose">
                <form @submit.prevent="sendEmail" v-if="newEmail">
                    <label for="to">To:</label>
                    <input id="to" name="to" type="text" v-model="newEmail.to.email">
                    <label for="subject">Subject</label>
                    <input id="subject" type="text" v-model="newEmail.subject">
                    <textarea 
                        name="body" 
                        id="body" 
                        cols="30" 
                        rows="10" 
                        v-model="newEmail.body">
                    </textarea>
                    <button class="send">Send</button>
                </form>
            </section>
    `,
    components: {

    },
    data() {
        return {
            newEmail: null
        }
    },
    created() {
        emailService.getNewEmail()
            .then(newEmail => this.newEmail = newEmail)
    },
    unmounted() {

    },

    methods: {
        sendEmail() {
            console.log(this.newEmail)
            emailService.send(this.newEmail)
        }
    },
    computed: {

    },
}