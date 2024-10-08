<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <h1 class="text-4xl font-bold text-center mb-8">Subscription Tasks</h1>
      <div class="space-y-4">
        <!-- Loop through your tasks here -->
        <div v-for="(task, index) in tasks" :key="index" class="bg-white shadow-lg p-6 rounded-lg text-center">
          <p class="text-3xl font-semibold"
             :class="{
               'text-green-600': task.status === 'done',
               'text-yellow-500': task.status === 'in progress',
               'text-red-500': task.status === 'not started'
             }">
            {{ task.title }}
          </p>
          <p class="text-xl text-gray-500 mt-2">
            {{ task.description }}
          </p>
          <p class="text-md mt-2"
             :class="{
               'text-green-600': task.status === 'done',
               'text-yellow-500': task.status === 'in progress',
               'text-red-500': task.status === 'not started'
             }">
            Status: {{ task.status }}
          </p>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      tasks: [
        { title: 'Renew Netflix Subscription', description: 'Due on 15th October', status: 'done' },
        { title: 'Pay Gym Membership', description: 'Due on 20th October', status: 'in progress' },
        { title: 'Renew Spotify Premium', description: 'Due on 25th October', status: 'not started' }
      ]
    }
  }
}
</script>

  <style scoped>
  /* Apply your background color using Tailwind */
  .bg_color {
    background: linear-gradient(to right, #364652, rgb(255, 255, 255));
  }

  /* Hover effect */
  .hover-beige:hover {
    background-color: #e0d3b8;
    color: #2c3e50;
  }

  /* Scroll-bar styling */
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
