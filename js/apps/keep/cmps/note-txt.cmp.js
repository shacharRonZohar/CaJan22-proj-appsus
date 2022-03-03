
export default {
    props: ['info'],
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
            return (this.info.title) ? this.info.title : 'No title'
            // if (this.note.info.title) return this.note.info.title
        },
        getNoteTxt() {
            return (this.info.txt) ? this.info.txt : '__'
        }
    },
}