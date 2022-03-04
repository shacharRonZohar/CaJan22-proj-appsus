import { utilService } from '../../../services/utilService.js'

export default {
    props: ['email'],
    emits: ['removed'],
    template: `
        <section class="email-preview click" :class="isRead">
            <input @click.stop type="checkbox" class="select-email" />
            <div  @click.stop class="star icon click"></div>
            <span class="name-txt">{{email.from.fullName}}</span>
            <div class="txt-container">
                <span class="subject">{{subjectTxt}}</span>
                -
                <span class="body-preview">{{email.body}}</span>
            </div>
            <span class="sent-at">{{formattedTime}}</span>
            <div class="actions">
                <div @click.stop="onRemove" class="icon delete click">D</div>
            </div>
        </section>
    `,
    components: {
    },
    data() {
        return {

        }
    },
    created() {

    },
    unmounted() {

    },

    methods: {
        onRemove() {
            this.$emit('removed', this.email.id)
        }
    },
    computed: {
        subjectTxt() {
            return this.email.subject ? this.email.subject : 'No Subject'
        },
        isRead() {
            return { 'read': this.email.isRead === 'read' }
        },
        formattedTime() {
            let opts = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            }
            if ((Date.now() - this.email.sentAt) < 86400000) { // The number of milliseconds for a day
                opts = {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            }
            return utilService.formatTime(this.email.sentAt, opts)
        }
    },
}