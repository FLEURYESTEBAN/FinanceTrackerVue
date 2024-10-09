<template>
  <div class="gradient-bg">
    <div class="left-side flex flex-col justify-center items-center p-8 text-white">
      <h1 class="mb-4 text-3xl font-extrabold bg-clip-text bg-gradient-to-r from-orange-900 to-red-300 md:text-5xl lg:text-6xl">
        Finance Tracker
      </h1>
      <section class="description flex flex-col items-center">
        <h3 class="text-xl mb-4">The best way to manage your money!</h3>
      </section>
    </div>

    <div class="right-side flex justify-center items-center">
      <form @submit.prevent="handleSubmit" class="form-container text-primary border border-white flex flex-col gap-4 w-500 p-2 rounded border-primary">
        <input
          type="text"
          v-model="credentials.username"
          placeholder="Email or username"
          class="w-80 p-3 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 placeholder-primary"
        />
        <input
          type="password"
          v-model="credentials.password"
          placeholder="Password"
          class="w-80 p-3 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 placeholder-primary"
        />
        <button type="submit" class="bg-primary text-white p-2 rounded-md hover-bg-accent mb-0">
          <strong>Connect</strong>
        </button>
        <router-link to="/ForgotPasswd" class="text-primary text-center p-1 rounded-md hover:text-[#BD897E]">
          <strong>Forgot your password?</strong>
        </router-link>
        <router-link to="/CreateAccount" class="bg-primary text-center text-white p-2 rounded-md hover-bg-accent mt-1">
          <strong>Create an account</strong>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    const fullName = this.$route.query.fullName
    if (fullName) {
      localStorage.setItem('fullName', fullName) // Store fullName in localStorage
    }
  },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit () {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.credentials)
        })

        if (response.ok) {
          const data = await response.json()
          console.log('API Response:', data) // Check if data is received correctly

          // Save data locally (for persistence across pages)
          localStorage.setItem('username', data.username) // Ensure 'username' is returned from the backend
          localStorage.setItem('fullName', data.fullName)
          localStorage.setItem('balance', data.balance)
          localStorage.setItem('Allexpenses', JSON.stringify(data.Allexpenses)) // Use data.Allexpenses instead
          localStorage.setItem('Subscription', JSON.stringify(data.Subscription))

          // Redirect to FinanceTracker and pass data as props
          this.$router.push({
            path: '/Finance',
            query: {
              username: data.username,
              fullName: data.fullName,
              balance: data.balance,
              Allexpenses: JSON.stringify(data.Allexpenses), // Pass Allexpenses as JSON string
              Subscription: JSON.stringify(data.Subscription)
            }
          })
        } else {
          // Handle errors
          if (response.status === 401) {
            alert('Incorrect Credentials')
          } else if (response.status === 404) {
            alert('Incorrect Credentials')
          } else {
            alert('An error occurred. Please try again.')
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

  }
}
</script>

<style scoped>
.form-container {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.gradient-bg {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
  height: 100vh;
  display: flex;
}

.left-side,
.right-side {
  width: 50%;
}

.text-primary {
  color: #364652;
}

.bg-primary {
  background-color: #364652;
}

.hover-bg-accent:hover {
  background-color: #BD897E;
}

.border-primary {
  border-color: #364652;
}

.placeholder-primary::placeholder {
  color: #364652;
}
</style>
