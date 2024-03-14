<template>
  <v-app>
    <TitleBar/>
    <Navigation/>
    <v-main>
      <!-- <v-container fluid> -->
        <router-view/>
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Home',
  components: {
    TitleBar,
    Navigation
  },
  created () {
    if(!localStorage.getItem('acces_token')) {
      this.$router.push('/login')
    }
  }
}
</script>
