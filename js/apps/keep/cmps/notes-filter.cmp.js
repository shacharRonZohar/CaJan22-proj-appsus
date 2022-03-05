export default {
    props: [],
    template: `
        <section class="notes-filter">
            <span>filter</span>
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

    },
    computed: {
    },
}