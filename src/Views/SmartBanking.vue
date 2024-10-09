<template>
  <div class="bg_color min-h-screen flex flex-col justify-between">
    <!-- Main Container with top and bottom margin -->
    <div class="max-w-6xl mx-auto mt-5 mb-5 py-10 px-4 lg:px-8 bg-white rounded-lg shadow-xl">
      <div class="container mx-auto py-10 space-y-10">
        <!-- Title -->
        <h1 class="text-center text-4xl font-bold text-gray-800">Your Smart Banking</h1>

        <!-- TradingView Ticker Tape Widget -->
        <div class="px-10">
          <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget" ref="tradingViewWidget"></div>
          </div>
        </div>

        <!-- Monthly Data Section -->
        <div class="grid grid-cols-2 gap-6 px-10">
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="uppercase text-sm font-semibold text-gray-600">This Month</p>
            <p class="text-3xl font-bold text-red-600">${{ displayedExpenses }}</p>
          </div>
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="uppercase text-sm font-semibold text-gray-600">Last Month</p>
            <p class="text-3xl font-bold text-green-600">${{ displayedLastMonthExpenses }}</p>
          </div>
        </div>

        <!-- Graph Section -->
        <div class="px-10">
          <div class="bg-gray-100 rounded-xl p-6 shadow-md">
            <canvas ref="expenseChart" class="rounded-xl"></canvas>
          </div>
        </div>

        <!-- Expense Description -->
        <div class="bg-gray-100 rounded-xl p-6 mx-10 text-center shadow-md">
          <p class="text-lg text-gray-800">
            This month you used the most money between the <span class="font-bold">15th</span> and the <span class="font-bold">25th</span>.
          </p>
        </div>

        <!-- Monthly Comparison -->
        <div class="grid grid-cols-2 gap-6 px-10">
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="text-lg font-semibold text-gray-800">{{ comparisonMessage }}</p>
          </div>
          <div class="bg-gray-100 rounded-xl p-6 text-center shadow-md">
            <p class="text-3xl font-bold text-red-600">-${{ Math.abs(expenseDifference) }}</p>
          </div>
        </div>

        <!-- Profile Button -->
        <div class="flex justify-center px-10">
          <router-link to="/Finance">
            <button class="bg-gray-800 text-white font-bold py-2 px-6 border border-black rounded hover:bg-gray-700 transition">
              Your profile
            </button>
          </router-link>
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
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'SmartBanking',
  props: ['totalExpenses'], // Receive the totalExpenses as a prop
  data () {
    return {
      localTotalExpenses: this.totalExpenses, // Create a local copy of the prop
      lastMonthExpenses: 5000 // Set last month's expenses (this can be dynamic)
    }
  },
  computed: {
    displayedExpenses () {
      return parseFloat(this.localTotalExpenses).toLocaleString() // Format for display
    },
    displayedLastMonthExpenses () {
      return parseFloat(this.lastMonthExpenses).toLocaleString() // Format for display
    },
    expenseDifference () {
      return this.localTotalExpenses - this.lastMonthExpenses // Calculate the difference
    },
    comparisonMessage () {
      return this.expenseDifference > 0
        ? 'You are using more money than last month'
        : 'You are using less money than last month'
    }
  },
  mounted () {
    this.loadTradingViewWidget()
    this.renderChart()
  },
  methods: {
    loadTradingViewWidget () {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
          { proName: 'FOREXCOM:NSXUSD', title: 'US 100 Cash CFD' },
          { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
          { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
          { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: 'adaptive',
        colorTheme: 'dark',
        locale: 'en'
      })

      this.$refs.tradingViewWidget.appendChild(script)
    },
    renderChart () {
      const ctx = this.$refs.expenseChart.getContext('2d')
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['5', '10', '15', '20', '25', '30'],
          datasets: [{
            label: 'Expenses of the month',
            data: [29, 150, 3000, 700, 2500, 25], // Sample data for expenses
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Days'
              }
            }
          }
        }
      })
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
