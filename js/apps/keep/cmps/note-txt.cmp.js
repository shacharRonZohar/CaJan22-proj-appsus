
export default {
    props: ['note'],
    template: `
        <section class="note-txt">
            <span class="title">{{getNoteTitle}}</span>
            <p class="txt">{{getNoteTxt}}</p>
        </section>
   `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        getNoteTitle() {
            return (this.note.info.title) ? this.note.info.title : 'No title'
            // if (this.note.info.title) return this.note.info.title
        },
        getNoteTxt() {
            return (this.note.info.txt) ? this.note.info.txt : '__'
        }
    },
}