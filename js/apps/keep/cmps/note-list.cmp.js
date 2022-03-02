import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <div v-for="note in notes" class="note" :key="note.id">
                <note-preview :note="note"></note-preview>
            </div>
        </section>
   `,
    components: {
        notePreview
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
    },
}