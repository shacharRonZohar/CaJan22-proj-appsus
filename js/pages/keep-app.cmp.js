import { eventBus } from '../services/eventBus-service.js'
import { noteService } from '../apps/keep/services/noteService.js'
import noteList from '../apps/keep/cmps/note-list.cmp.js'
import noteAdd from '../apps/keep/cmps/note-add.cmp.js'
import typeTxt from '../apps/keep/cmps/type-txt.cmp.js'
import typeImg from '../apps/keep/cmps/type-img.cmp.js'
import typeVideo from '../apps/keep/cmps/type-video.cmp.js'

export default {
    template: `
        <section class="keep-app">
            <div class="main-content">
                <note-add v-if="!isAddingNote" @addRequest="onAddRequest" @noteAdded="updateNotes" class="note-add"></note-add>
                <component v-else :is="selectedType"></component>

                <!-- <router-view :notes="notes"></router-view> -->
                <note-list class="note-list" :notes="notes"></note-list>
            </div>
        </section>
    `,
    components: {
        noteList,
        noteAdd,
        typeTxt,
        typeImg,
        typeVideo
    },
    data() {
        return {
            notes: null,
            isAddingNote: false,
            selectedType: null
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
        },
        onAddRequest(cmp) {
            this.isAddingNote = !this.isAddingNote
            this.selectedType = cmp
        }
    },
    computed: {

    },
    unmounted() {
        this.unsubscribe()
    }
}