<template>
  <div class="bg-color min-h-screen flex flex-col">
    <!-- Main Container -->
    <div class="w-full max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold">Subscription Manager</h1>
        <router-link to="/Finance" class="text-blue-600 hover:underline">Back</router-link>
      </div>

      <!-- Form to Add a New Subscription -->
      <div id="subscription-form" class="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Add a Subscription</h2>

        <!-- Subscription Name Field -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name of the Subscription</label>
          <input type="text" id="name" v-model="subscription.name" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Name of the subscription">
        </div>

        <!-- Price Field -->
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="price" v-model="subscription.price" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Price">
        </div>

        <!-- Next Payment Date Field -->
        <div class="mb-4">
          <label for="nextPayment" class="block text-sm font-medium text-gray-700">Next Payment Date</label>
          <input type="date" id="nextPayment" v-model="subscription.nextPayment" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
        </div>

        <!-- Plan Type Field -->
        <div class="mb-4">
          <label for="planType" class="block text-sm font-medium text-gray-700">Plan Type</label>
          <select id="planType" v-model="subscription.planType" class="mt-1 w-full p-3 bg-white text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select plan type</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <!-- Add Subscription Button -->
        <button @click="addSubscription" class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">Add a Subscription</button>
      </div>

      <!-- List of Subscriptions -->
      <div v-if="subscriptions.length > 0" class="mt-10">
        <h2 class="text-2xl font-semibold mb-4">Your Subscriptions</h2>
        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Price</th>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Next Payment</th>
                <th class="py-2 text-left text-sm font-medium text-gray-700">Plan Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sub, index) in subscriptions" :key="index">
                <td class="py-2">{{ sub.name }}</td>
                <td class="py-2">{{ sub.price }} $</td>
                <td class="py-2">{{ sub.paymentDate }}</td>
                <td class="py-2">{{ sub.planType }}</td>
                <td class="py-2">
                  <button @click="removeSubscription(index)" class="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded-lg shadow">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-10 text-center text-gray-500">
      <p class="text-sm">&copy; 2024 Fleury Menard Chartier Luce-Laurent</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      subscription: {
        name: '',
        price: null,
        nextPayment: '',
        planType: ''
      },
      subscriptions: [] // List to store subscriptions

    }
  },
  mounted () {
    this.fetchSubscriptions() // Fetch subscriptions from the backend on mount
  },
  methods: {
    async addSubscription () {
      if (this.subscription.name && this.subscription.price && this.subscription.nextPayment && this.subscription.planType) {
        try {
          const response = await axios.post('http://localhost:3001/add-subscription', {
            username: localStorage.getItem('username'), // Assuming you store the username in localStorage
            subscription: this.subscription
          })

          this.subscriptions.push(response.data.subscription) // Add the new subscription

          // Clear the subscription form
          this.subscription = {
            name: '',
            price: null,
            nextPayment: '',
            planType: ''
          }
        } catch (error) {
          console.error('Error adding subscription:', error)
        }
      } else {
        alert('Please fill out all fields before adding a subscription.')
      }
    },

    async fetchSubscriptions () {
      try {
        const response = await axios.post('http://localhost:3001/get-subscriptions', {
          username: localStorage.getItem('username') // Get username from localStorage
        })

        this.subscriptions = response.data.subscriptions
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
      }
    },

    async removeSubscription () {
      const username = localStorage.getItem('username') // Get the logged-in user's username

      if (this.subscriptions.length === 0) {
        alert('No subscriptions to remove')
        return
      }

      const lastSubscription = this.subscriptions[this.subscriptions.length - 1] // Get the last subscription
      const subscriptionId = lastSubscription._id // Get its ID

      try {
        // Call the server API to remove the last subscription
        const response = await fetch('http://localhost:3001/remove-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, subscriptionId })
        })

        const data = await response.json()

        if (response.ok) {
          // Remove from the local array after successful removal on the server
          this.subscriptions.pop() // Remove the last subscription
          alert(data.message) // Show success message
        } else {
          alert('Failed to remove subscription: ' + data.message) // Show error message
        }
      } catch (error) {
        console.error('Error removing subscription:', error)
      }
    }
  }
}
</script>

<style>
.bg-color {
  background: linear-gradient(to right, #364652, rgb(255, 255, 255));
}

/* Designing for scrollbar */
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
