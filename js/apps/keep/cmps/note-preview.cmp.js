import noteTxt from './note-txt.cmp.js'

export default {
    props: ['note'],
    template: `
        <article >
            <note-txt :note="note"></note-txt>
        </article>

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