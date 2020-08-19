<template>
  <v-container>
    <v-layout row wrap class="mb-4">
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetups" class = "primary">
          Explore Meetups
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups/new" class = "primary">
          Organize Meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class = "mb-2">
      <v-flex xs12>
      <v-carousel cycle>
        <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="onLoadMeetup(meetup.id)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class = "title">
              {{meetup.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-5">
      <v-flex class="text-center">
        <p>Join our meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default{
    computed:{
      meetups() {
        return this.$store.getters.featuredMeetups
      }
    },
    methods:{
      onLoadMeetup (id){
        this.$router.push('/meetups/' + id)
      }
    }
  }

</script>

<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    left: 350px;
    background-color: rgba(0,0,0,0.5);
    color: white;
  }
</style>
