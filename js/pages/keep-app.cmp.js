import { eventBus } from '../services/eventBus-service.js'
import { noteService } from '../apps/keep/services/noteService.js'
import noteList from '../apps/keep/cmps/note-list.cmp.js'
import noteAdd from '../apps/keep/cmps/note-add.cmp.js'

export default {
    template: `
        <section class="keep-app">
            <note-add @noteAdded="updateNotes"></note-add>
            <note-list :notes="notes"></note-list>
            <!-- <pre>{{notes}}</pre> -->
        </section>
    `,
    components: {
        noteList,
        noteAdd,
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
<<<<<<< HEAD
            console.log(id)
=======
>>>>>>> 9a3441f3599b9639863fe163290677e146d16cdb
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