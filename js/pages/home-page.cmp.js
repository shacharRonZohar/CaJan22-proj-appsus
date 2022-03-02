// For Dev purposes
import { utilService } from '../services/utilService.js'

export default {
    template: `
        <section>This is a home!</section>
        <!-- For Dev purposes -->
        <button @click="clearStorage">ClearStorage</button>
        `,
    methods: {
        // For Dev purposes
        clearStorage() {
            utilService.resetLocalStorage()
        }
    },

}