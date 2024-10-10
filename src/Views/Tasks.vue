<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-4xl font-bold text-center mb-8">Tasks</h1>
    <div class="space-y-4">
      <!-- Display tasks from the database -->
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="bg-white shadow-lg p-6 rounded-lg text-center"
      >
        <p
          class="text-3xl font-semibold"
          :class="{
            'text-green-600': task.Status === 'done',
            'text-yellow-500': task.Status === 'in progress',
            'text-red-500': task.Status === 'not started',
          }"
        >
          {{ task.Name }}
        </p>
        <p class="text-xl text-gray-500 mt-2">{{ formatDate(task.Date) }}</p>
        <p
          class="text-md mt-2"
          :class="{
            'text-green-600': task.Status === 'done',
            'text-yellow-500': task.Status === 'in progress',
            'text-red-500': task.Status === 'not started',
          }"
        >
          Status: {{ task.Status }}
        </p>

        <!-- Update task status -->
        <select v-model="task.Status" @change="updateTaskStatus(task)" class="mt-4 p-2 border rounded">
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>

    <!-- Add Task Form -->
    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Add New Task</h2>
      <input
        v-model="newTaskName"
        placeholder="Task Name"
        class="p-2 border rounded mb-2"
      />
      <input
        v-model="newTaskDate"
        type="date"
        class="p-2 border rounded mb-2"
      />
      <select v-model="newTaskStatus" class="p-2 border rounded mb-4">
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button @click="addTask" class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
      <button
        @click="removeLastTask"
        class="bg-red-500 text-white px-4 py-2 rounded ml-4"
        v-if="tasks.length > 0"
      >
        Remove Last Task
      </button>
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
        const response = await axios.post('http://localhost:3001/get-tasks', {
          username: localStorage.getItem('username') // Assuming you store the username in localStorage
        })
        this.tasks = response.data.Tasks
        console.log('Fetched tasks:', response.data.Tasks)
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
          username: localStorage.getItem('username'),
          Task: newTask
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

    async removeLastTask () {
      try {
        if (this.tasks.length > 0) {
          const lastTask = this.tasks[this.tasks.length - 1]
          console.log('Attempting to remove task:', lastTask.Name)

          const response = await axios.post('http://localhost:3001/remove-task', {
            username: localStorage.getItem('username'),
            taskName: lastTask.Name
          })

          if (response.status === 200) {
            this.tasks.pop() // Remove the task from the local array
            console.log('Task removed successfully:', response.data.message)
          } else {
            console.error('Error removing task from server:', response.data.message)
          }
        }
      } catch (error) {
        console.error('Error removing task:', error)
      }
    },

    // New method to handle task status update
    async updateTaskStatus (task) {
      try {
        // Send the updated task status to the server
        const response = await axios.post('http://localhost:3001/update-task-status', {
          username: localStorage.getItem('username'),
          taskName: task.Name,
          newStatus: task.Status
        })

        if (response.status === 200) {
          console.log('Task status updated successfully:', response.data.message)
        } else {
          console.error('Error updating task status:', response.data.message)
        }
      } catch (error) {
        console.error('Error updating task status:', error)
      }
    },

    formatDate (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
