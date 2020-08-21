<template>
  <v-dialog width="350px" persistent v-model="editDialog">
  <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="ma-2"
        dark
        v-bind="attrs"
        v-on="on"
      >
      Edit Date
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit MeetUp Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
          <v-date-picker v-model="editableDate" style="width: 100%" actions>
            <template>
             <v-spacer></v-spacer>
              <v-btn class = "blue--text darken-1" text @click.native="editDialog = false">
               Close
              </v-btn>
              <v-btn class = "blue--text darken-1" text @click.native="onSaveChanges">
               Save
              </v-btn>
            </template>
          </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>



<script>
  export default {
    props: ['meetup'],
    data(){
      return{
        editDialog: false,
        editableDate: null
      }
    },
    methods: {
      onSaveChanges(){
          const newDate = new Date(this.meetup.date)
          const newDay = new Date(this.editableDate).getUTCDate()
          const newMonth = new Date(this.editableDate).getUTCMonth()
          const newYear = new Date(this.editableDate).getUTCFullYear()
          newDate.setUTCDate(newDay)
          newDate.setUTCMonth(newMonth)
          newDate.setUTCFullYear(newYear)
          this.$store.dispatch('updateMeetupData', {
            id: this.meetup.id,
            date: newDate
          })
      }
    },
    created(){
      this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10)
    }
  }

</script>
