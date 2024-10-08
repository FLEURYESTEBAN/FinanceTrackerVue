// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import FinanceTracker from '../Views/FinanceTracker.vue'
import SmartBanking from '../Views/SmartBanking.vue'
import SubscriptionManag from '../Views/SubscriptionManag.vue'
import LoginPage from '../Views/LoginPage.vue'
import CreateAccount from '../Views/CreateAccount.vue'
import ForgotPasswd from '../Views/ForgotPasswd.vue'

const routes = [
  {
    path: '/Finance',
    name: 'FinanceTracker',
    component: FinanceTracker
  },
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/smart-banking',
    name: 'SmartBanking',
    component: SmartBanking,
    props: route => ({ totalExpenses: route.params.totalExpenses }) // Pass the prop
  },
  {
    path: '/CreateAccount',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/ForgotPasswd',
    name: 'ForgotPasswd',
    component: ForgotPasswd
  },
  {
    path: '/SubscriptionManag',
    name: 'SubscriptionManag',
    component: SubscriptionManag
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
