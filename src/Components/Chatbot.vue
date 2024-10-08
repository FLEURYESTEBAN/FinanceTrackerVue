<template>
    <div id="chatbot"></div>
  </template>

<script>
export default {
  name: 'Chatbot',
  mounted () {
    // Configuration du chatbot
    window.embeddedChatbotConfig = {
      chatbotId: 'zmBn9AzY77OmARb78A4Lq',
      domain: 'www.chatbase.co'
    }

    // Création d'un script pour le chatbot
    const script = document.createElement('script')
    script.src = 'https://www.chatbase.co/embed.min.js'
    script.setAttribute('chatbotId', 'zmBn9AzY77OmARb78A4Lq')
    script.setAttribute('domain', 'www.chatbase.co')
    script.defer = true

    // Ajout du script au document
    document.body.appendChild(script)
  },
  beforeUnmount () {
    const script = document.querySelector('#chatbase-bubble-button')
    if (script) {
      document.body.removeChild(script)
    }
  }
}
</script>

  <style scoped>
  #chatbot {
    /* Add your styles here */
  }
  </style>
