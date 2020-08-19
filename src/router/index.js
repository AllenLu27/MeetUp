import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signin'
import Signin from '@/components/User/Signup'
import Meetup from '@/components/Meetup/Meetup'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'Home',
    component: Home

  },

  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },

  {
    path: '/meetup/new',
    name: 'CreateMeetups',
    component: CreateMeetup
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },

  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },

  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },

  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: Meetup
  }

],
  mode: 'history'
})
