// For Dev purposes
import { utilService } from '../services/utilService.js'

export default {
    template: `
        <!-- <section>This is a home!</section> -->
        <!-- For Dev purposes -->
        <!-- <button @click="clearStorage">ClearStorage</button> -->
        <section class="home-page">
            <div class="hero">
                <h3>Welcome to AppSus!</h3>
            </div>
            <!-- <router-link to="/book" class="hero-action-container"> -->
                <div class="hero-action-container">
                    <span>Do your thing!</span>
                </div>
            <!-- </router-link> -->
        </section>
        `,
    methods: {
        // For Dev purposes
        clearStorage() {
            utilService.resetLocalStorage()
        }
    },

}