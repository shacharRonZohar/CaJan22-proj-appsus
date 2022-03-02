export default {
    props: ['note'],
    template: `
        <span class="note-title">{{getNoteTitle}}</span>
   `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        getNoteTitle() {
            const title = (this.note.info.title) ? this.note.info.title : ''
            return title
            // if (this.note.info.title) return this.note.info.title
        }
    },
}