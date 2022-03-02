import {eventBus} from '../../../services/eventBus-service.js'
import noteTxt from './note-txt.cmp.js'

export default {
    props: ['note'],
    template: `
        <article @click="editNote(note.id)" style="backgroundColor: red" class="note-card">
            <note-txt :note="note"></note-txt>
            <button @click.stop="deleteNote(note.id)">delete</button>
        </article>

   `,
    components: {
        noteTxt,
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