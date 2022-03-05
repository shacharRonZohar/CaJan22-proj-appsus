export default {
    props: [],
    emits: ['filtered', 'closeSearch'],
    template: `
        <section class="notes-filter">
            <button @click="$emit('closeSearch')" class="back-btn btn icon"></button>
            <div class="filter">
                <form @submit.prevent="setFilter">
                    <input v-model="filterBy.search" type="text" placeholder="Search..."> <br>
                    <!-- <select v-model="filterBy.type">
                        <option value="note-txt">Text</option>
                        <option value="note-img">Images</option>
                        <option value="note-video">Videos</option>
                    </select> -->
                </form>
                <button class="search-btn btn icon"></button>
            </div>

        </section>
   `,
    data() {
        return {
            filterBy: {
                search: '',
                type: ''
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }

    },
    computed: {
    },
}