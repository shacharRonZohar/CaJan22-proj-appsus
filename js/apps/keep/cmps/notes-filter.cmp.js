export default {
    props: [],
    emits: ['filtered'],
    template: `
        <section class="notes-filter">
            <div class="filter">
                <form>
                    <input @input="setFilter" v-model="filterBy.search" type="text" placeholder="Search..."> <br>
                    <select @change="setFilter" v-model="filterBy.type">
                        <option value="note-txt">Text</option>
                        <option value="note-img">Images</option>
                        <option value="note-video">Videos</option>
                    </select>
                </form>
            </div>

        </section>
   `,
    data() {
        return {
            filterBy: {
                search: null,
                type: null
            }
        }
    },
    methods: {
        setFilter() {
            // console.log(this.filterBy);
            this.$emit('filtered', this.filterBy)
        }

    },
    computed: {
    },
}