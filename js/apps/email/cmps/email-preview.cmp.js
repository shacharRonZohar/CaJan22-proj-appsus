export default {
    props: ['email'],
    emits: [''],
    template: `
    <section class="email-preview">
        <span class="subject">Subject: {{subjectTxt}}</span>
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

    },
    computed: {
        subjectTxt() {
            return this.email.subject ? this.email.subject : 'No Subject'
        }
    },
}