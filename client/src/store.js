import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showMinaSidorButton: false,
        showLoggaInButton: true,
        showAdminButton: false,
        loggedInUser: {
            name: '',
            id: '',
            bookedTickets: [],
            admin: null
        },
    },

    mutations: {
        showMinaSidor(state){
            state.showMinaSidorButton = !state.showMinaSidorButton;
            state.showLoggaInButton = !state.showLoggaInButton;
        },

        resetUserProperties(state){
            state.loggedInUser.name = '';
            state.loggedInUser.id = '';
            state.loggedInUser.bookedTickets = [];
            state.loggedInUser.admin = null;
        },

        setLoggedInUser(state,user){
            state.loggedInUser.name = user.user;
            state.loggedInUser.id = user.id;
            state.loggedInUser.bookedTickets = user.bookedTickets;
            state.loggedInUser.admin = user.admin;
        },

        showAdminControls(state){
            state.showAdminButton = !state.showAdminButton;
        }
    }
})