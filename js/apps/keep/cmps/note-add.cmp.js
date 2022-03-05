
export default {
    props: [],
    emits: ['addRequest', 'filterRequest'],
    template: `
    <section class="note-add">
        <div class="take-note">
            <form >
                <div>
                    <button class="filter-btn btn" @click.prevent="setNotesFilter('notes-filter')" title="Filter Notes">filter</button>
                    <input @click.prevent="setNoteType('note-txt')" type="text" placeholder="Take a note...">
                    <button class="img-btn btn icon" @click.prevent="setNoteType('note-img')" title="Image Note"></button>
                    <button class="vid-btn btn icon" @click.prevent="setNoteType('note-video')" title="Video Note"></button>
                </div>
            </form>
        </div>
    </section>
   `,
    data() {
        return {}
    },
    created() {},
    methods: {
        setNoteType(type){
            type = type.replace(/note/g, 'type')
            this.$emit('addRequest', type)
        },
        setNotesFilter(cmp) {
            this.$emit('filterRequest', cmp)
        }
    },
}