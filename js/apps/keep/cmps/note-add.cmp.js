import { noteService } from "../services/noteService.js"

export default {
    props: [],
    template: `
    <section class="note-add">
        <div class="take-note">
            <form>
                <div>
                    <!-- <input v-model="newNote.info.title" type="text" placeholder="Title"> -->
                    <input v-model="newNote.info.txt" type="text" placeholder="Take a note...">

                    <button class="add-btn btn icon" @click.prevent="addNote" title="Add Note"></button>
                    <button class="txt-btn btn icon" @click.prevent="setTxtType" title="Text Note"></button>
                    <button class="img-btn btn icon" @click.prevent="setImgType" title="Image Note"></button>
                    <button class="vid-btn btn icon" @click.prevent="setVidType" title="Video Note"></button>
                </div>
                
            </form>
            <pre>{{newNote}}</pre>
        </div>
    </section>
   `,
    data() {
        return {
            newNote: noteService.getEmptyNote('note-txt')
        }
    },
    created() {
        // setTimeout(console.log, 100, this.newNote)
        // console.log(this.newNotes);
    },
    methods: {
        addNote() {
            noteService.addNote(this.newNote).then((note) => this.$emit('noteAdded', note));
            
            // Reset the input
            this.newNote = noteService.getEmptyNote('note-txt')
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