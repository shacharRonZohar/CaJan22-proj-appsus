export default {
    props: [],
    template: `
        <section class="note-write">
            <div class="write">
                <button>Pin</button>
                <form @submit.prevent="onSubmit">
                    <input v-model="noteData.url" type="text" placeholder="Image url..."> <br>
                    <input v-model="noteData.title" type="text" placeholder="Title"> <br>                    
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
                url: null,
                title: null
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('noteAdded', {type: 'note-img', noteData:this.noteData})
        }
    },
    computed: {
    },
}