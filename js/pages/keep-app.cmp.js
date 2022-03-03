import { eventBus } from '../services/eventBus-service.js'
import { noteService } from '../apps/keep/services/noteService.js'
import noteList from '../apps/keep/cmps/note-list.cmp.js'
import noteAdd from '../apps/keep/cmps/note-add.cmp.js'

export default {
    template: `
        <section class="keep-app">
            <nav class="side-nav">
                <ul>
                    <li>nav-bar</li>
                    <li>Notes</li>
                    <li>Trash</li>
                </ul>
            </nav>
            <div class="main-content">
                <note-add class="note-add" @noteAdded="updateNotes"></note-add>
                <!-- <router-view :notes="notes"></router-view> -->
                <note-list class="note-list" :notes="notes"></note-list>
            </div>
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
            console.log(id)
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