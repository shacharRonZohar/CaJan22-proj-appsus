
export default {
    props: ['info'],
    template: `
        <section class="note-txt">
            <span class="title">{{getNoteTitle}}</span>
            <span class="txt">{{getNoteTxt}}</span>
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
            return (this.info.title) ? this.info.title : 'Title'
        },
        getNoteTxt() {
            return (this.info.txt) ? this.info.txt : ''
        }
    },
}