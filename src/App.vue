<template>
  <div id="app">
    <!-- Only show the sidebar if the current route is not 'login' -->
    <SideBar v-if="!hideSidebar" />
    <Chatbot v-if="!hideChatbot"/>
    <router-view :fullName="fullName" />
  </div>
</template>

<script>
import SideBar from './Components/SideBar.vue'
import Chatbot from './Components/Chatbot.vue'

export default {
  components: {
    SideBar,
    Chatbot
  },
  computed: {
    // Check if the current route is the login page (or any other route you want to exclude)
    hideSidebar () {
      const routesWithoutSidebar = ['/', '/ForgotPasswd', '/CreateAccount']
      return routesWithoutSidebar.includes(this.$route.path)
    },
    hideChatbot () {
      const routesWithoutChatbot = ['/', '/ForgotPasswd', '/CreateAccount']
      return routesWithoutChatbot.includes(this.$route.path)
    }
  },
  name: 'App',
  data () {
    return {
      fullName: '',
      balance: ''
    }
  },
  mounted () {
    // Fetch the full name from localStorage and set it to the component's state
    this.fullName = localStorage.getItem('full name') || 'Guest' // Ensure the key matches what you set
    this.balance = localStorage.getItem('balance') || '/' // Ensure the key matches what you set
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
