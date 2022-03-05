
export default {
    emits: ['addRequest', 'filterRequest'],
    template: `
    <section class="note-add">
        <button class="filter-btn btn icon" @click="setNotesFilter('notes-filter')" title="Filter Notes"></button>
        <div class="take-note">
            <form >
                <div class="input">
                    <input @click.prevent="setNoteType('note-txt')" type="text" placeholder="Take a note...">
                </div>
            </form>
            <section class="type-btns">
                <button class="img-btn btn icon" @click="setNoteType('note-img')" title="Image Note"></button>
                <button class="vid-btn btn icon" @click="setNoteType('note-video')" title="Video Note"></button>
            </section>
        </div>
    </section>
   `,
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