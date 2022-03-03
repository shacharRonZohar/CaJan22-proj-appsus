export default {
    props: ['info'],
    template: `
         <section class="note-video">
            <iframe :src="formattedUrl" frameborder="0"></iframe>
            <!-- <p class="txt">{{getNoteTxt}}</p> -->
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