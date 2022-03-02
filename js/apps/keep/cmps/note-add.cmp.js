import { noteService } from "../services/noteService.js"

export default {
    props: [],
    template: `
    <section class="note-add">
        <div class="take-not">
            <form>
                <input v-model="newNote.info.title" type="text" placeholder="Title">
                <input v-model="newNote.info.txt" type="text" placeholder="Take a note...">
                <button @click.prevent="addNote">Add note</button>
            </form>
            <!-- <pre>{{newNote}}</pre> -->
        </div>
    </section>
   `,
    data() {
        return {
            newNote: noteService.getEmptyNote('note-txt')
        }
    },
    methods: {
        addNote() {
            noteService.addNote(this.newNote)
                .then((note) => this.$emit('noteAdded', note));
            
            this.newNote = noteService.getEmptyNote('note-txt')
        }
    },
    computed: {
    },
}