// import { noteService } from "../services/noteService"

export default {
    props: [],
    template: `
        <section class="note-write">
            <div class="write">
                <!-- <button>Pin</button>  -->
                <form @submit.prevent="onSubmit">
                    <input v-model="noteData.info.title" type="text" placeholder="Title"> <br>
                    <textarea v-model="noteData.info.txt" name="" id="" cols="30" rows="7" placeholder="Take a note..."></textarea>
                    <input type="color" name="background-color" id="background-color" v-model="noteData.style.backgroundColor">
                    <button>Add</button> 
                </form>
                <!-- <button>color</button>
                <button class="btn">Close</button> -->
            </div>

        </section>
   `,
    data() {
        return {
            noteData: {
                info: {
                    title: null,
                    txt: null,
                },
                style:{
                    backgroundColor: null
                }
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('noteAdded', { type: 'note-txt', noteData: this.noteData })
        }
    },
    computed: {
    },
}