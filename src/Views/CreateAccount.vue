<template>
  <div class="bg-color min-h-screen flex flex-col justify-between text-gray-900">
    <div class="w-full max-w-2xl mx-auto my-auto p-6 bg-white shadow-lg rounded-lg">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold">Welcome to Finance Tracker</h1>
        <router-link to="/" class="text-blue-600 hover:underline">Back</router-link>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Sign-Up</h2>

        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <!-- Full Name -->
        <div class="mb-4">
          <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullname"
            v-model="credentials.fullName"
            class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <button
          @click="createAccount"
          class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">
          Create your account
        </button>
      </div>
    </div>

    <footer class="mt-10 text-center text-gray-500">
      <p class="text-sm">&copy; 2024 Fleury Menard Chartier Luce-Laurent</p>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: '',
        fullName: ''
      }
    }
  },
  methods: {
    validatePassword (password) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
      return regex.test(password)
    },
    async createAccount () {
      // Validate the password
      if (!this.validatePassword(this.credentials.password)) {
        alert('Password must contain at least 8 characters, including one number, and one special character.')
        return
      }

      try {
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.credentials)
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Account created successfully:', data)

          // Redirect to the login page with fullName as a query parameter
        } else if (response.status === 409) {
          alert('Username already exists')
        } else {
          alert('An error occurred. Please try again.')
        }
      } catch (error) {
        console.error('Error:', error)
      }

      // Clear the form after submission
      this.credentials.username = ''
      this.credentials.password = ''
    }
  }
}
</script>

<style>
.bg-color {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
}
/* Designing for scroll-bar */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: grey;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c3e50;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
