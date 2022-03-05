import { eventBus } from '../services/eventBus-service.js'
import { noteService } from '../apps/keep/services/noteService.js'
import noteList from '../apps/keep/cmps/note-list.cmp.js'
import noteAdd from '../apps/keep/cmps/note-add.cmp.js'
import typeTxt from '../apps/keep/cmps/type-txt.cmp.js'
import typeImg from '../apps/keep/cmps/type-img.cmp.js'
import typeVideo from '../apps/keep/cmps/type-video.cmp.js'
import notesFilter from '../apps/keep/cmps/notes-filter.cmp.js'

export default {
    template: `
        <section class="keep-app">
                <note-add v-if="!isAddingNote" @addRequest="onAddRequest" @filterRequest="onFilterRequest" class="note-add"></note-add>
                <!-- <notes-filter></notes-filter> -->
                <component v-else :is="selectedType" @noteAdded="addNote" @filtered="setFilter"></component>
                <input type="color" name="background-color" id="background-color" v-model="selectedColor.backgroundColor">
                <!-- <router-view :notes="notes"></router-view> -->
                <note-list class="note-list" @notePinned="updateNotes" @noteDuplicate="updateNotes" :notes="notes"></note-list>
        </section>
    `,
    components: {
        noteList,
        noteAdd,
        typeTxt,
        typeImg,
        typeVideo,
        notesFilter
    },
    data() {
        return {
            notes: null,
            isAddingNote: false,
            selectedType: null,
            selectedColor: {
                backgroundColor: 'white'
            },
            filterBy: {}
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
        onFilterRequest(cmp){
            this.isAddingNote = true
            this.selectedType = cmp
        },
        addNote(noteParams){
            this.isAddingNote = false

            noteService.getEmptyNote(noteParams.type)
                .then(newNote=>{
                    newNote.info = noteParams.noteData
                    newNote.style = this.selectedColor
                    noteService.addNote(newNote)
                        .then(()=>this.updateNotes())
                })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
            console.log(this.filterBy);
        }
    },
    computed: {
        // isShow() {
        //     return !this.isAddingNote || !this.isFiltering
        // }
    },
    unmounted() {
        this.unsubscribe()
    }
}