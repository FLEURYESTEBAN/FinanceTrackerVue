<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <h1 class="text-4xl font-bold text-center mb-8">Tasks</h1>
      <div class="space-y-4">
        <!-- Display tasks from the database -->
        <div v-for="(task, index) in tasks" :key="index" class="bg-white shadow-lg p-6 rounded-lg text-center">
          <p class="text-3xl font-semibold"
             :class="{
               'text-green-600': task.Status === 'Done',
               'text-yellow-500': task.Status === 'In progress',
               'text-red-500': task.Status === 'Not started'
             }">
            {{ task.Name }}
          </p>
          <p class="text-xl text-gray-500 mt-2">{{ formatDate(task.Date) }}</p>
          <p class="text-md mt-2"
             :class="{
               'text-green-600': task.Status === 'Done',
               'text-yellow-500': task.Status === 'In progress',
               'text-red-500': task.Status === 'Not started'
             }">
            Status: {{ task.Status }}
          </p>

          <!-- Update task status -->
          <select v-model="task.State" class="mt-4 p-2 border rounded">
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <!-- Add Task Form -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Add New Task</h2>
        <input v-model="newTaskName" placeholder="Task Name" class="p-2 border rounded mb-2">
        <input v-model="newTaskDate" type="date" class="p-2 border rounded mb-2">
        <select v-model="newTaskStatus" class="p-2 border rounded mb-4">
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button @click="addTask" class="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
      </div>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tasks: [],
      newTaskName: '',
      newTaskDate: '',
      newTaskStatus: 'not started'
    }
  },
  created () {
    this.fetchTasks()
  },
  methods: {
    async fetchTasks () {
      try {
        console.log('Fetching tasks for username:', this.username) // Log the username being used
        const response = await axios.post('http://localhost:3001/get-tasks', {
          username: localStorage.getItem('username') // Assuming you store the username in localStorage
        })
        this.tasks = response.data.Tasks // Use 'tasks' instead of 'Tasks'
        console.log('Response from server:', response) // Log the full response from the server
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },

    async addTask () {
      const newTask = {
        Name: this.newTaskName,
        Date: this.newTaskDate,
        Status: this.newTaskStatus
      }

      try {
        await axios.post('http://localhost:3001/add-task', {
          username: localStorage.getItem('username'), // Assuming you store the username in localStorage
          Task: newTask // Correctly passing singular 'Task'
        })

        // Add task to local array after successful response
        this.tasks.push(newTask)

        // Reset the form fields
        this.newTaskName = ''
        this.newTaskDate = ''
        this.newTaskStatus = 'not started'
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
