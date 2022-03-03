import { noteService } from "../services/noteService.js"

export default {
    props: [],
    template: `
    <section class="note-add">
        <div class="take-note">
            <form>
                <input v-model="newNote.info.title" type="text" placeholder="Title">
                <!-- <div v-model="newNote.info.title" contenteditable="true"></div> -->
                <input v-model="newNote.info.txt" type="text" placeholder="Take a note...">
                <button @click.prevent="addNote">Add note</button>
                <button @click.prevent="setTxtType">txt</button>
                <button @click.prevent="setImgType">img</button>
                <button @click.prevent="setVidType">vid</button>
                <pre>{{newNote}}</pre>
            </form>
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
            
            // this.newNote = noteService.getEmptyNote('note-txt')
        },
        setTxtType() {
            this.newNote = noteService.getEmptyNote('note-txt')
        },
        setImgType() {
            this.newNote = noteService.getEmptyNote('note-img')
        },
        setVidType() {
            this.newNote = noteService.getEmptyNote('note-video')
        }
    },
    computed: {
    },
}