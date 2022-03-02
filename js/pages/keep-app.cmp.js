import { eventBus } from '../services/eventBus-service.js'
import { noteService } from '../apps/keep/services/noteService.js'
import noteList from '../apps/keep/cmps/note-list.cmp.js'

export default {
    template: `
        <section class="keep-app">
            <note-list :notes="notes"></note-list>
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
        this.unsubscribe = eventBus.on('deleteNote', this.deleteNote)
        this.updateNotes()
    },
    methods: {
        updateNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        deleteNote(id) {
            console.log(id);
            noteService.remove(id)
                .then(this.updateNotes)
        }
    },
    computed: {

    },
    unmounted() {
        this.unsubscribe()
    }
}