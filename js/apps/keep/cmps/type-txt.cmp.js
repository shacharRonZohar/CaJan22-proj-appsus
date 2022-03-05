export default {
    props: [],
    template: `
        <section class="note-write">
            <div class="write">
                <form @submit.prevent="onSubmit">
                    <input v-model="noteData.title" type="text" placeholder="Title"> <br>
                    <textarea v-model="noteData.txt" name="" id="" cols="30" rows="7" placeholder="Take a note..."></textarea>
                    <button>Add</button> 
                </form>
            </div>

        </section>
   `,
    data() {
        return {
            noteData: {
                    title: null,
                    txt: null,
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