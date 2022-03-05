export default {
    props: [],
    emits: ['noteAdded', 'closeWrite'],
    template: `
        <section class="note-write">
            <div class="write">
                <button class="pin-btn btn icon"></button>
                <button @click="onSubmit" class="add-btn btn icon"></button> 
                <form>
                    <input v-model="noteData.info.url" class="yt-url-input" type="text" placeholder="Youtube url..."> <br>
                </form>
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
                    url: null
                },
                style: {
                    backgroundColor: '#FFFFFF'
                }

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