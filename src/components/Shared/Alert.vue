<template>
<div>
    <v-alert
      @input="onClose"
      :value="true"
      type="error"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      {{text}}
    </v-alert>
  </div>
</template>


<script>
  export default{
    props: ['text'],
    methods: {
      onClose(){
        this.$emit('dismissed')
      }
    }
  }

</script>
