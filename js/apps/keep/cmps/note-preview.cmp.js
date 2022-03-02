import noteTxt from './note-txt.cmp.js'

export default {
    props: ['note'],
    template: `
        <note-txt :note="note"></note-txt>
   `,
    components: {
        noteTxt,
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
}