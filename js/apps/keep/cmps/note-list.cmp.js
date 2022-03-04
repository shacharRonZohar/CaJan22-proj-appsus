import {eventBus} from '../../../services/eventBus-service.js'
import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <div v-for="note in notes" class="note" :class="note.type" :key="note.id" 
            :style="getFormattedStyle(note.style)">
                <router-link :to="'/keep/'+note.type+'/'+note.id">
                    <note-preview :note="note"></note-preview>
                    <button class="delete-btn icon" @click.stop="deleteNote(note.id)"></button>
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
        getNotePath(note){
            console.log(`${note.type}/${note.id}`)
            return `${note.type}/${note.id}`
        },
        getFormattedStyle(style){
            return style ? style : {backgroundColor: '#fff'}
        }

    },
    computed: {
    },
}