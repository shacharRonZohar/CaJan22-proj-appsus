import { emailService } from "../services/emailService.js"

export default {
    props: [''],
    emits: ['close', 'sent'],
    template: `
            <section class="email-compose">
                <header>New Message <button @click="close" class="close"></button></header>
                <form @submit.prevent="sendEmail" v-if="newEmail">
                    <label for="to">
                        To
                        <input id="to" name="to" type="text" v-model="newEmail.to.email">
                    </label>
                    <label for="subject">
                        Subject
                        <input id="subject" type="text" v-model="newEmail.subject">
                    </label>
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
                .then(() => this.$emit('sent'))

        },
        close() {
            this.$emit('close')
        }
    },
    computed: {

    },
}