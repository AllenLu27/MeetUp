<template>
  <v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card color = 'pink lighten-4'>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <div class="d-flex flex-no-wrap justify-space-between">
                <v-img :src="meetup.imageUrl"
                contain
                height = "130px"
                width  = "300px"></v-img>
                 <v-flex xs7 sm8 md9>
                   <v-card-title
                   ><h5 class = "white--text">{{meetup.title}}</h5></v-card-title>
                   <v-card-subtitle>
                   <h3>{{meetup.date | date}}</h3></v-card-subtitle>
                  <v-card-actions>
                    <v-btn text :to="'/meetups/' + meetup.id"><v-icon left light>arrow_forward</v-icon>View Meetup</v-btn>
                  </v-card-actions>
                 </v-flex>
                 </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default{
    computed: {
        meetups () {
          return this.$store.getters.loadedMeetups
        }
    }
  }
</script>
