export default {
    props: ['email'],
    emits: [''],
    template: `
    <!-- {{email}} -->
    <section class="email-preview" :class="isRead">
        <span>{{nameTxt}}</span>
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

    },
    computed: {
        subjectTxt() {
            return this.email.subject ? this.email.subject : 'No Subject'
        },
        isRead() {
            return { 'read': this.email.isRead }
        },
        nameTxt() {
            if (this.email.status === 'inbox') return this.email.from.fullName
            else return this.email.to.fullName
        }
    },
}