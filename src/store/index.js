import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {imageUrl: 'https://www.newyorkbyrail.com/wp-content/uploads/2017/07/Times_Square__NYC_NY__New_York_City__New_York_By_Rail-1.jpg', id: 'aaaaaaa', title: 'Meetup in New York', date:new Date(), location: 'New York', description: 'It\' New York!' },
      {imageUrl: 'https://16jp781s7hqv3vm1s322uful-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/Neon-streets-Tokyo-Japan.jpg', id: 'bbbbbbb', title: 'Meetup in Japan', date:new Date(), location: 'Tokyo', description: 'It\' Tokyo!'}
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup (state, payload){
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload){
      state.user = payload
    },
    setLoading(state, payload){
      state.loading = payload
    },
    setError(state, payload){
      state.error = payload
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    createMeetup ({commit}, payload){
      const meetup = {
        title : payload.title,
        location : payload.location,
        imageUrl : payload.imageUrl,
        description : payload.description,
        date : payload.date,
        id : 'cccccc',

      }
      commit('createMeetup', meetup)
    },
    signUserUp ({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
              commit('setLoading', false)
              const newUser = {
                id: user.uid,
                registeredMeetups: []
              }
              commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    clearError({commit}){
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state){
      return state.loadedMeetups.sort((meetupA, meetupB) => {
         return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters){
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state){
      return (meetupId)=> {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user(state) {
      return state.user
    },
    loading(state){
      return state.loading
    },
    error(state){
      return state.error
    }
  }
})
