import {eventBus} from '../../../services/eventBus-service.js'

export default {
    props: ['note'],
    template: `
        <section style="background-color: red" class="note-txt">
            <span class="title">{{getNoteTitle}}</span>
            <button @click="deleteNote(note.id)">delete</button>

        </section>
   `,
    data() {
        return {

        }
    },
    methods: {
        deleteNote(noteId) {
            eventBus.emit('deleteNote', noteId)
        }

    },
    computed: {
        getNoteTitle() {
            return (this.note.info.title) ? this.note.info.title : 'No title'
            // if (this.note.info.title) return this.note.info.title
        }
    },
}