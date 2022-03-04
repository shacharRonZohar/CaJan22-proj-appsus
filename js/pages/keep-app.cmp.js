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
                <note-add v-if="!isAddingNote" @addRequest="onAddRequest" class="note-add"></note-add>
                <component v-else :is="selectedType" @noteAdded="addNote"></component>

                <!-- <router-view :notes="notes"></router-view> -->
                <note-list class="note-list" :notes="notes"></note-list>
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
            this.isAddingNote = true
            this.selectedType = cmp
        },
        addNote(noteParams){
            this.isAddingNote = false

            noteService.getEmptyNote(noteParams.type)
                .then(newNote=>{
                    newNote.info = noteParams.noteData
                    noteService.addNote(newNote)
                        .then(()=>this.updateNotes())
                })
        }
    },
    computed: {

    },
    unmounted() {
        this.unsubscribe()
    }
}