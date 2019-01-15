import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showMinaSidorButton: false,
        showLoggaInButton: true,
    },

    mutations: {
        showMinaSidor(){
            this.state.showMinaSidorButton = !this.state.showMinaSidorButton;
            this.state.showLoggaInButton = !this.state.showLoggaInButton;
        }
    }
})