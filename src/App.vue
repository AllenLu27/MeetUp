<template>
  <v-app>
  <v-card
    flat
  >
    <v-toolbar dark class="primary">
      <v-app-bar-nav-icon
        @click="sideNav = !sideNav"
        ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">MeetUp</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
    <main>
      <router-view></router-view>
    </main>
    <v-navigation-drawer temporary v-model="sideNav" absolute overflow light>
    <v-card
      class="mx-auto"
      max-width="300"
      tile
     >
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    </v-navigation-drawer>
  </v-app>
</template>


<script>
  export default {
    data () {
      return {
        sideNav: false,
      }
    },
    computed: {
      menuItems(){
        let menuItems = [
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ]
        if(this.userIsAuthenticated){
           menuItems = [  { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
                         { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
                         { icon: 'person', title: 'Profile', link: '/profile' }
                      ]
        }
        return menuItems
      },
      userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>
