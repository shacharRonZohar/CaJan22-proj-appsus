import { noteService } from "../services/noteService.js"

export default {
    props: [],
    emits: ['noteAdded', 'addRequest'],
    template: `
    <section class="note-add">
        <div class="take-note">
            <form>
                <div>
                    <!-- <input v-model="newNote.info.title" type="text" placeholder="Title"> -->
                    <input v-model="newNote.info.txt" type="text" placeholder="Take a note...">
                    
                    <button class="add-btn btn icon" @click.prevent="addNote" title="Add Note"></button>

                    <button class="txt-btn btn icon" @click.prevent="onSetNoteType('note-txt')" title="Text Note"></button>
                    <button class="img-btn btn icon" @click.prevent="onSetNoteType('note-img')" title="Image Note"></button>
                    <button class="vid-btn btn icon" @click.prevent="onSetNoteType('note-video')" title="Video Note"></button>
                </div>
                
            </form>
            <pre>{{newNote}}</pre>
        </div>
    </section>
   `,
    data() {
        return {
            newNote: noteService.getEmptyNote('note-txt'),
        }
    },
    created() {
        // setTimeout(console.log, 100, this.newNote)
        // console.log(this.newNotes);
    },
    methods: {
        addNote() {
            noteService.addNote(this.newNote).then((note) => this.$emit('noteAdded', note));
            
            console.log(this.newNote);
            // Reset the input
            this.newNote = noteService.getEmptyNote('note-txt')
        },
        onSetNoteType(type){
            this.newNote = noteService.getEmptyNote(type)
            type = type.replace(/note/g, 'type')
            // console.log(type);
            this.$emit('addRequest', type)
        },
    },
}