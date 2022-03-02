import {eventBus} from '../../../services/eventBus-service.js'
import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <div @click="editNote(note.id)" v-for="note in notes" class="note" :key="note.id">
                <note-preview :note="note"></note-preview>
                <button @click.stop="deleteNote(note.id)">delete</button>

            </div>
        </section>
   `,
    components: {
        notePreview
    },
    data() {
        return {

        }
    },
    methods: {
        editNote(noteId) {
            console.log('edit!');
            console.log(noteId);
        },
        deleteNote(noteId) {
            eventBus.emit('deleteNote', noteId)
        }

    },
    computed: {
    },
}