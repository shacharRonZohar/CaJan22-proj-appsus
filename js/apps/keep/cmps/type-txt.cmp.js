export default {
    props: [],
    emits: ['noteAdded', 'closeWrite'],
    template: `
        <section class="note-write">
            <div class="write">
                
                <button class="pin-btn btn icon"></button>
                <button @click="onSubmit" class="add-btn btn icon"></button> 
                <form>
                    <input class="txt-input" v-model="noteData.info.title" type="text" placeholder="Title"> <br>
                    <textarea v-model="noteData.info.txt" cols="30" rows="5" placeholder="Take a note..."></textarea>
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
                    title: null,
                    txt: null,
                },
                style: {
                    backgroundColor: '#FFFFFF'
                }
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('noteAdded', { type: 'note-txt', noteData: this.noteData })
        },
        // closeWrite() {
        //     this.$emit('closeWrite')
        // }
    },
    computed: {
    },
}