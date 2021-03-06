import { utilService } from '../../../services/utilService.js'

export default {
    props: ['email'],
    emits: ['removed', 'star','toggleRead'],
    template: `
        <section class="email-preview click" :class="isRead">
            <div  @click.stop="onStar" class="star icon click" :class="starState"></div>
            <span class="name-txt">{{email.from.fullName}}</span>
            <div class="txt-container">
                <span class="subject">{{subjectTxt}}</span>
                -
                <span class="body-preview">{{bodyTxt}}</span>
            </div>
            <span class="sent-at">{{formattedTime}}</span>
            <div class="actions">
                <div @click.stop="onRemove" class="icon delete click"></div>
                <div @click.stop="onToggleRead" class="icon click toggle-read" :class="isRead"></div>
            </div>
        </section>
    `,
    methods: {
        onRemove() {
            this.$emit('removed', this.email.id)
        },
        onStar() {
            this.$emit('star', this.email.id)
        },
        onToggleRead(){
            this.$emit('toggleRead', this.email.id)
        }
    },
    computed: {
        subjectTxt() {
            return this.email.subject ? this.email.subject : 'No Subject'
        },
        bodyTxt() {
            return this.email.body ? this.email.body : 'No Body'
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
        },
        starState() {
            return {
                'active': this.email.isStar
            }
        }
    },
}