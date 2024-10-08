<template>
  <aside :class="{'-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen}" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform" aria-label="Sidebar">
    <div class="h-full px-5 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <!-- Sidebar Title -->
      <div class="mb-6 pl-6 text-center text-xl font-extrabold text-gray-900 dark:text-white">
        Finance Tracker
      </div>

      <ul class="space-y-4 font-medium">
        <!-- Finance -->
        <li @click="toggleSidebar">
          <router-link to="/Finance" class="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-6 w-6">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5V5h14v-.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path fill-rule="evenodd" d="M15 7H1v4.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V7ZM3 10.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm3.75-.75a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
            </svg>
            <span class="flex-1 ms-4 text-xl">Finances</span>
          </router-link>
        </li>

        <!-- Smart Banking -->
        <li @click="toggleSidebar">
          <router-link to="/SmartBanking" class="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-6 w-6">
              <path d="M7.702 1.368a.75.75 0 0 1 .597 0c2.098.91 4.105 1.99 6.004 3.223a.75.75 0 0 1-.194 1.348A34.27 34.27 0 0 0 8.341 8.25a.75.75 0 0 1-.682 0c-.625-.32-1.262-.62-1.909-.901v-.542a36.878 36.878 0 0 1 2.568-1.33.75.75 0 0 0-.636-1.357 38.39 38.39 0 0 0-3.06 1.605.75.75 0 0 0-.372.648v.365c-.773-.294-1.56-.56-2.359-.8a.75.75 0 0 1-.194-1.347 40.901 40.901 0 0 1 6.005-3.223ZM4.25 8.348c-.53-.212-1.067-.411-1.611-.596a40.973 40.973 0 0 0-.418 2.97.75.75 0 0 0 .474.776c.175.068.35.138.524.21a5.544 5.544 0 0 1-.58.681.75.75 0 1 0 1.06 1.06c.35-.349.655-.726.915-1.124a29.282 29.282 0 0 0-1.395-.617A5.483 5.483 0 0 0 4.25 8.5v-.152Z" />
              <path d="M7.603 13.96c-.96-.6-1.958-1.147-2.989-1.635a6.981 6.981 0 0 0 1.12-3.341c.419.192.834.393 1.244.602a2.25 2.25 0 0 0 2.045 0 32.787 32.787 0 0 1 4.338-1.834c.175.978.315 1.969.419 2.97a.75.75 0 0 1-.474.776 29.385 29.385 0 0 0-4.909 2.461.75.75 0 0 1-.794 0Z" />
            </svg>
            <span class="flex-1 ms-4 text-xl">Smart Banking</span>
          </router-link>
        </li>

        <!-- Inbox -->
        <li @click="toggleSidebar">
          <router-link to="/SubscriptionManag" class="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-6 w-6">
              <path d="M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z" />
            </svg>
            <span class="flex-1 ms-4 text-xl">Subscriptions</span>
          </router-link>
        </li>

        <!-- Users -->
        <li @click="toggleSidebar">
          <router-link to="/users" class="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-6 w-6">
              <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5c1.654 0 3.14-.757 4.157-1.948A4.997 4.997 0 0 0 8 9Z" />
            </svg>
            <span class="flex-1 ms-4 text-xl">Users</span>
          </router-link>
        </li>

        <!-- Sign out -->
          <router-link to="/" class="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-6 w-6">
               <path fill-rule="evenodd" d="M14 4.75A2.75 2.75 0 0 0 11.25 2h-3A2.75 2.75 0 0 0 5.5 4.75v.5a.75.75 0 0 0 1.5 0v-.5c0-.69.56-1.25 1.25-1.25h3c.69 0 1.25.56 1.25 1.25v6.5c0 .69-.56 1.25-1.25 1.25h-3c-.69 0-1.25-.56-1.25-1.25v-.5a.75.75 0 0 0-1.5 0v.5A2.75 2.75 0 0 0 8.25 14h3A2.75 2.75 0 0 0 14 11.25v-6.5Zm-9.47.47a.75.75 0 0 0-1.06 0L1.22 7.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h7.19a.75.75 0 0 0 0-1.5H3.56l.97-.97a.75.75 0 0 0 0-1.06Z" clip-rule="evenodd" />
             </svg>
             <span class="flex-1 ms-4 text-xl">Sign out</span>
             </router-link>
      </ul>
    </div>
  </aside>

  <!-- Toggle Button -->
  <button @click="toggleSidebar" class="p-3 fixed top-2 left-1 z-50">
      <div class="container">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        </div>
    </button>
</template>

<script>
export default {
  data () {
    return {
      isSidebarOpen: false
    }
  },
  methods: {
    toggleSidebar () {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  }
}
</script>

<style>
aside {
  transition: transform 0.3s ease;
}

.container {
  display: inline-block;
  cursor: pointer;
}

.bar1, .bar2, .bar3 {
  width: 30px;
  height: 5px;
  background-color: #ffffff;
  margin: 6px 0;
}
</style>
