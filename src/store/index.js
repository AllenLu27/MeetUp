import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {imageUrl: 'https://www.newyorkbyrail.com/wp-content/uploads/2017/07/Times_Square__NYC_NY__New_York_City__New_York_By_Rail-1.jpg', id: 'aaaaaaa', title: 'Meetup in New York', date:new Date(), location: 'New York', description: 'It\' New York!' },
      {imageUrl: 'https://16jp781s7hqv3vm1s322uful-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/Neon-streets-Tokyo-Japan.jpg', id: 'bbbbbbb', title: 'Meetup in Japan', date:new Date(), location: 'Tokyo', description: 'It\' Tokyo!'}
    ],
    user:{
      id: 'aaaaa',
      registeredMeetups: ['sdsdsdsd']
    }
  },
  mutations: {
    createMeetup (state, payload){
      state.loadedMeetups.push(payload)
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
    }
  }
})
