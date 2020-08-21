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
    setLoadedMeetups(state, payload){
      state.loadedMeetups = payload
    },
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
    },
    updateMeetup(state, payload){
      const meetup = state.loadedMeetups.find(meetup =>{
        return meetup.id === payload.id
      })
      if(payload.title){
        meetup.title = payload.title
      }
      if(payload.description){
        meetup.description = payload.description
      }
      if(payload.date){
        meetup.date = payload.date
      }
    },
    registerUserForMeetup(state, payload){
      const id = payload.id
      if(state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0){
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup(state, payload){
      const id = payload.id
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === id), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    }
  },
  actions: {
    registerUserForMeetup({commit, getters}, payload){
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registerations/').push(payload)
        .then(data =>{
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        })
        .catch(error =>{
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup({commit, getters}, payload){
      commit('setLoading', true)
      const user = getters.user
      if(!user.fbKeys){
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registerations/').child(fbKey).remove()
        .then(()=>{
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        }
      )
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    loadMeetups({commit}){
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(
          (data) =>{
            const meetups =[]
            const obj = data.val()
            for(let key in obj){
              meetups.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                date: obj[key].date,
                creatorId: obj[key].creatorId,
                location: obj[key].location
              })
            }
            commit('setLoadedMeetups', meetups)
            commit('setLoading', false)
          }
        )
        .catch(
          (error) =>{
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    createMeetup ({commit, getters}, payload){
      const meetup = {
        title : payload.title,
        location : payload.location,
        description : payload.description,
        date : payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let key
      firebase.database().ref('meetups').push(meetup)
       .then(
         (data) =>{
           key = data.key
           return key
         })
         .then(key => {
           const filename = payload.image.name
           const ext= filename.slice(filename.lastIndexOf('.'))
           return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
         })
         .then(fileData => {
            return fileData.ref.getDownloadURL()
          })
        .then((imageUrl) => {
        return firebase.database().ref('meetups').child(key).update({imageUrl})
          .then(() => {
            commit('createMeetup', {
              ...meetup,
              imageUrl,
              id: key
            })
          })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updateMeetupData({commit}, payload){
      commit('setLoading', true)
      const updateObj = {}
      if(payload.title){
        updateObj.title = payload.title
      }
      if(payload.description){
        updateObj.description = payload.description
      }
      if(payload.date){
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
         .then(() =>{
           commit('setLoading', false)
           commit('updateMeetup', payload)
         })
         .catch(error=>{
           console.log(error)
           commit('setLoading', false)
         })
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
                registeredMeetups: [],
                fbKeys: {}
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
              registeredMeetups: [],
              fbKeys: {}
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
    },
    autoSignIn({commit}, payload){
      commit('setUser', {id: payload.uid, registeredMeetups: [], fbKeys:{}})
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },
    fetchUserData({commit, getters}){
        commit('setLoading', true)
        firebase.database().ref('/users/' + getters.user.id + '/registerations/').once('value')
          .then(data =>{
            const values = data.val()
            let registeredMeetups = []
            let swappedPairs = {}
            for(let key in values){
              registeredMeetups.push(values[key])
              swappedPairs[values[key]] = key
            }
            const updatedUser = {
              id: getters.user.id,
              registeredMeetups: registeredMeetups,
              fbKeys: swappedPairs
            }
            commit('setLoading', false)
            commit('setUser', updatedUser)
          })
          .catch(error =>{
            console.log(error)
            commit('setLoading', false)
          })
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
