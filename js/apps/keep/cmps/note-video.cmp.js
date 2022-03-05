export default {
    props: ['info'],
    template: `
         <section class="note-video">
            <iframe :src="formattedUrl" frameborder="0"></iframe>
        </section>
   `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        formattedUrl() {
            return this.info.url.replace(/watch\?v=/, 'embed/')
        }
    },
}