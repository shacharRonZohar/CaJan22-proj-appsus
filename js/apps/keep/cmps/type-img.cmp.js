export default {
    props: [],
    emits: ['noteAdded', 'closeWrite'],
    template: `
        <section class="note-write">
            <div class="write">
                <button class="pin-btn btn icon"></button>
                <button @click="onSubmit" class="add-btn btn icon"></button> 
                <form>
                    <input v-model="noteData.info.url" class="img-url-input" type="text" placeholder="Image url..."> <br>
                    <input v-model="noteData.info.title" class="img-title-input" type="text" placeholder="Title"> <br>                    
                    <!-- <button>Add</button> -->
                </form>
                <!-- <button>color</button> -->
                <div class="color-picker icon">
                    <input type="color" v-model="noteData.style.backgroundColor">
                </div>
                <button @click="$emit('closeWrite')" class="close-btn btn">Close</button>
            </div>

        </section>
   `,
    data() {
        return {
            noteData: {
                info: {
                    url: null,
                    title: null,
                },
                style: {
                    backgroundColor: '#FFFFFF'

                }
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('noteAdded', { type: 'note-img', noteData: this.noteData })
        }
    },
    computed: {
    },
}