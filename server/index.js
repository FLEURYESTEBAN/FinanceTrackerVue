const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { hash } = require('crypto');


const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Allow requests from your Vue.js front-end

mongoose.connect('mongodb://localhost:27017/Finance_Tracker');


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    balance: Number,
    expenses: Number,
    Subscription: [
        {
        name:String,
        price:Number,
        paymentDate: Date,
        planType: String
        }
    ],
    Allexpenses: [
        {
            Name: String, // Name of the expense
            Price: Number, // Price or amount of the expense
            Date: Date
        }
    ],
    Tasks: [
        {
            Name: String,
            State : String,
            Date: { type: Date, default: Date.now },


        }
    ]
});

const UserModel = mongoose.model('users', UserSchema);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return res.status(200).json({
                message: 'Login successful',
                username: user.username,
                fullName: user.fullName,
                balance: user.balance,
                expenses: user.expenses,
                Allexpenses: user.Allexpenses, // Return all expense objects
                Tasks: user.Tasks
            });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Log the hashed password

        // Save new user to the database with the hashed password
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            balance: 0, // Initialize balance
            expenses: 0, // Initialize expenses
            Subscription: [],
            Allexpenses: [],
            Tasks: []
        });
        await newUser.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Add Expense Endpoint
app.post('/add-expense', async (req, res) => {
    const { username, expense } = req.body; // Assume you send username and expense object
    console.log("Request received:", req.body);
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Push the new expense to the user's Allexpenses array
        user.Allexpenses.push(expense);
        user.expenses += expense.Price; // Update total expenses
        user.balance -= expense.Price; // Update balance

        await user.save(); // Save the updated user

        res.status(200).json({
            message: 'Expense added successfully',
            expense: user.Allexpenses[user.Allexpenses.length - 1], // Return the added expense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
    
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

app.post('/remove-expense', async (req, res) => {
    const { username, expenseId } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the index of the expense to remove
        const expenseIndex = user.Allexpenses.findIndex(exp => exp._id == expenseId);

        if (expenseIndex === -1) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const removedExpense = user.Allexpenses[expenseIndex];
        user.expenses -= removedExpense.Price; // Update total expenses
        user.balance += removedExpense.Price; // Update balance

        // Remove the expense from the array
        user.Allexpenses.splice(expenseIndex, 1);

        await user.save(); // Save the updated user

        res.status(200).json({ message: 'Expense removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/add-subscription', async (req, res) => {
    const { username, subscription } = req.body; // Expect username and subscription object
  
    try {
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Add the new subscription to the user's Subscription array
      user.Subscription.push(subscription);
  
      await user.save(); // Save the updated user data
  
      res.status(200).json({
        message: 'Subscription added successfully',
        subscription: user.Subscription[user.Subscription.length - 1] // Return the newly added subscription
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.post('/get-subscriptions', async (req, res) => {
    const { username } = req.body;
  
    console.log('Fetching subscriptions for:', username); // Log the username
  
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
  
    try {
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('Subscriptions found:', user.Subscription); // Log the subscriptions
  
      res.status(200).json({
        subscriptions: user.Subscription
      });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/remove-subscription', async (req, res) => {
    const { username, subscriptionId } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the index of the subscription to remove
        const subscriptionIndex = user.Subscription.findIndex(sub => sub._id == subscriptionId);

        if (subscriptionIndex === -1) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        // Remove the subscription from the array
        user.Subscription.splice(subscriptionIndex, 1);

        await user.save(); // Save the updated user data

        res.status(200).json({ message: 'Subscription removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Tasks Endpoint
app.post('/get-tasks', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            Tasks: user.Tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add Task Endpoint
app.post('/add-task', async (req, res) => {
    const { username, Task } = req.body; // Expect singular 'Task'

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the new task to the user's Tasks array
        user.Tasks.push(Task);

        await user.save(); // Save the updated user

        res.status(200).json({
            message: 'Task added successfully',
            Task: user.Tasks[user.Tasks.length - 1] // Return the newly added task
        });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
