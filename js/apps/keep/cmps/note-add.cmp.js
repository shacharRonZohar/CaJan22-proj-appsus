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
                <button class="add-btn btn icon" @click.prevent="addNote"></button>
                <button class="txt-btn btn icon" @click.prevent="setTxtType"></button>
                <button class="img-btn btn icon" @click.prevent="setImgType"></button>
                <button class="vid-btn btn icon" @click.prevent="setVidType"></button>
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