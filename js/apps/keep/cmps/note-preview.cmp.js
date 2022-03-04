import noteTxt from './note-txt.cmp.js'
import noteImg from './note-img.cmp.js'
import noteVideo from './note-video.cmp.js'

export default {
    props: ['note'],
    template: `
        <article >
            <component :is="note.type" :info="note.info" ></component>
            <!-- <note-txt :note="note"></note-txt> -->
        </article>

   `,
    components: {
        noteTxt,
        noteImg,
        noteVideo
    },
    data() {
        return {

        }
    },
    methods: {



    },
    computed: {
        formattedStyle(){
            if(this.note.style){
                return this.note.style.backgroundColor ? this.note.style.backgroundColor : '#fff'
            }
        }
    },
}