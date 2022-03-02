export default {
    props: ['email'],
    emits: [''],
    template: `
    {{email}}
    <section class="email-preview" :class="isRead">
        <span class="subject">{{subjectTxt}}</span>
        <span class="body-preview">{{email.body}}</span>
    </section>
    `,
    components: {
    },
    data() {
        return {

        }
    },
    created() {

    },
    unmounted() {

    },

    methods: {
        isBodyLong() {
            return false
            // if(this.email.b >)ody.length
        }
    },
    computed: {
        subjectTxt() {
            return this.email.subject ? this.email.subject : 'No Subject'
        },
        isRead() {
            return { 'read': this.email.isRead }
        }
    },
}