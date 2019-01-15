import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showMinaSidorButton: false,
        showLoggaInButton: true,
        loggedInUser: {
            name: '',
            id: '',
            bookedTickets: []
        },
    },

    mutations: {
        showMinaSidor(state){
            this.state.showMinaSidorButton = !this.state.showMinaSidorButton;
            this.state.showLoggaInButton = !this.state.showLoggaInButton;
        },

        resetUserProperties(state){
            state.loggedInUser.name = '';
            state.loggedInUser.id = '';
            state.loggedInUser.bookedTickets = [];
        },

        setLoggedInUser(state,user){
            state.loggedInUser.name = user.user;
            state.loggedInUser.id = user.id;
            state.loggedInUser.bookedTickets = user.bookedTickets;
        }
    }
})