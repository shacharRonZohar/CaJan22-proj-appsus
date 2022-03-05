import { noteService } from '../services/noteService.js'
import { eventBus } from '../../../services/eventBus-service.js'
import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    emits: ['notePinned', 'noteDuplicate'],
    template: `
        <section class="note-list">
            <div v-for="note in notes" class="note" :class="note.type" :key="note.id" 
            :style="getFormattedStyle(note.style)">
                <router-link :to="'/keep/'+note.type+'/'+note.id">
                    <note-preview :note="note"></note-preview>
                    <button class="delete-btn icon" @click.stop="deleteNote(note.id)"></button>
                    <button class="pin-btn icon" @click.stop="pinNote(note.id)"></button>
                    <button class="duplicate-btn icon" @click.stop="duplicateNote(note)"></button>
                </router-link>
            </div>
        </section>
   `,
    components: {
        notePreview
    },
    data() {
        return {
            noteToEdit: null
        }
    },
    methods: {
        editNote(noteId) {
            console.log('edit!');
            console.log(noteId);
        },
        deleteNote(noteId) {
            eventBus.emit('deleteNote', noteId)
        },
        pinNote(noteId) {
            noteService.pinNote(noteId)
                .then(() => this.$emit('notePinned'))
        },
        duplicateNote(note){
            noteService.duplicateNote(note)
                .then(() => this.$emit('noteDuplicate'))

        },
        getNotePath(note) {
            console.log(`${note.type}/${note.id}`)
            return `${note.type}/${note.id}`
        },
        getFormattedStyle(style) {
            return style ? style : { backgroundColor: '#fff' }
        }

    },
    computed: {
    },
}