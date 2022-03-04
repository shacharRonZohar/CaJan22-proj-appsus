export default {
    props: [],
    template: `
        <section class="note-write">
            <div class="write">
                <button>Pin</button>
                <form @submit.prevent="onSubmit">
                    <input v-model="noteData.url" type="text" placeholder="Youtube url..."> <br>
                    <button>Add</button>
                </form>
                <button>color</button>
                <button class="btn">Close</button>
            </div>

        </section>
   `,
    data() {
        return {
            noteData: {
                url: null
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('noteAdded', {type: 'note-video', noteData:this.noteData})
        }

    },
    computed: {
    },
}