import { noteService } from '../apps/keep/services/noteService.js'
import noteList from '../apps/keep/cmps/note-list.cmp.js'

export default {
    template: `
        <section class="keep-app">
            This is a keep page!<br>
            // note-filter <br>
            // note-list // note-preview
            <note-list :notes></note-list>
            <pre>{{notes}}</pre>
        </section>
    `,
    components: {
        noteList
    },
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.updateNotes()
    },
    methods: {
        updateNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        }
    },
    computed: {

    },
}