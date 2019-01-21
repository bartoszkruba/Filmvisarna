import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showMinaSidorButton: false,
        showLoggaInButton: true,
        showLoggaInWindow: false,
        showAdminButton: false,
        loggaInButtonPressed: false,
        redirect: false,
        redirectToThis: {
            movieID: null,
            sessionID: null,
        },
        loggedInUser: {
            name: '',
            id: '',
            bookedTickets: [],
            admin: null,
            email: '',
            password: ''
        },
    },

    getters: {
        getCredentials: (state) => {
            const credentials = {
                email: state.loggedInUser.email,
                password: state.loggedInUser.password
            }
            return credentials;
        },

        isUserSignedIn: (state) => {
            if(state.loggedInUser.name) {
                return true;
            }
            return false;
        },

        isLoggaInButtonPressed: (state) => {
            return state.loggaInButtonPressed;
        },

        redirectTo: (state) => {
            return state.redirectToThis;
        }
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
            state.loggedInUser.admin = user.admin;
            state.loggedInUser.email = user.email;
            state.loggedInUser.password = user.password;
        },

        showAdminControls(state){
            state.showAdminButton = !state.showAdminButton;
        },

        updateTickets(state, tickets){
            state.loggedInUser.bookedTickets = tickets;
        },

        toggleLoggaInWindow(state,sessionAndMovieID) {
            console.log(sessionAndMovieID.movieID)
            state.showLoggaInWindow = !state.showLoggaInWindow;
            state.redirectToThis.movieID = sessionAndMovieID.movieID;
            state.redirectToThis.sessionID = sessionAndMovieID.sessionID;
          },
        
        loggaInButtonPressed(state) {
            state.loggaInButtonPressed = !state.loggaInButtonPressed;
          }
    }
})