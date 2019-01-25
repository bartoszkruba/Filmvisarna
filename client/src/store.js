import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showMinaSidorButton: false,
        showLoggaInButton: true,
        showLoggaInWindow: false,
        showAdminButton: false,
        routeToThis: {
            redirect:false,
            movieID: null,
            sessionID: null
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

        routeTo: (state) => {
            return state.routeToThis;
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

        toggleLoggaInWindow(state,) {
            
            state.showLoggaInWindow = !state.showLoggaInWindow;
          },

          setRoute(state,sessionAndMovieID){
            state.routeToThis = {
                movieID: sessionAndMovieID.movieID,
                sessionID: sessionAndMovieID.sessionID,
                redirect: sessionAndMovieID.redirect
            }
          },
    }
})