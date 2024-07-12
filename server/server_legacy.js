import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import { dataOptions, data, entries } from './data.js';

dotenv.config(); 

const app = express();
const PORT = 5173;

app.use(express.json());
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/brainOps', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define User schema and model with additional fields
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  name: { type: String },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// New API endpoint for handling request with headers and body
app.post('/api/submit', (req, res) => {
  const headers = req.headers;
  const body = req.body;

  console.log('Headers:', headers);
  console.log('Body:', body);

  res.json({ success: true, headers, body });
});

app.get('/api/data-options', (req, res) => {
  res.json(dataOptions);
});

app.get('/api/data', (req, res) => {
  const {
    countries,
    subscriptions,
    os,
    osVersions,
    modelNames,
    plans,
    states
  } = req.query;

  const response = {};

  if (countries) {
    const countryList = countries.split(','); 
    response.countries = {}; 
    countryList.forEach(country => {
      response.countries[country] = data.countries[country];
    });
  }

  if (subscriptions) {
    const subscriptionList = subscriptions.split(',');
    response.subscriptions = {};
    subscriptionList.forEach(sub => {
      response.subscriptions[sub] = data.subscriptions[sub];
    });
  }

  if (os) {
    const osList = os.split(',');
    response.os = {};
    osList.forEach(osItem => {
      response.os[osItem] = data.os[osItem];
    });
  }

  if (osVersions) {
    const osVersionList = osVersions.split(',');
    response.osVersions = {};
    osVersionList.forEach(osVersion => {
      response.osVersions[osVersion] = data.osVersions[osVersion];
    });
  }

  if (modelNames) {
    const modelNameList = modelNames.split(',');
    response.modelNames = {};
    modelNameList.forEach(modelName => {
      response.modelNames[modelName] = data.modelNames[modelName];
    });
  }

  if (plans) {
    const planList = plans.split(',');
    response.plans = {};
    planList.forEach(plan => {
      response.plans[plan] = data.plans[plan];
    });
  }

  if (states) {
    const stateList = states.split(',');
    response.states = {};
    stateList.forEach(state => {
      response.states[state] = data.states[state];
    });
  }

  res.json(response);
});

// Endpoint to get filtered log entries
app.get('/api/entries', (req, res) => {
  const { countries, subscriptions, os, osVersions, modelNames, plans, states } = req.query;
  let filteredEntries = entries;

  if (countries) {
    const countryList = countries.split(',');
    filteredEntries = filteredEntries.filter(entry => countryList.includes(entry.country));
  }

  if (subscriptions) {
    const subscriptionList = subscriptions.split(',');
    filteredEntries = filteredEntries.filter(entry => subscriptionList.includes(entry.subscription));
  }

  if (os) {
    const osList = os.split(',');
    filteredEntries = filteredEntries.filter(entry => osList.includes(entry.os));
  }

  if (osVersions) {
    const osVersionList = osVersions.split(',');
    filteredEntries = filteredEntries.filter(entry => osVersionList.includes(entry.osVersion));
  }

  if (modelNames) {
    const modelNameList = modelNames.split(',');
    filteredEntries = filteredEntries.filter(entry => modelNameList.includes(entry.modelName));
  }

  if (plans) {
    const planList = plans.split(',');
    filteredEntries = filteredEntries.filter(entry => planList.includes(entry.plan));
  }

  if (states) {
    const stateList = states.split(',');
    filteredEntries = filteredEntries.filter(entry => stateList.includes(entry.state));
  }

  res.json(filteredEntries);
});

// New endpoint for login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password, remember_me } = req.body;
    console.log('Received login request:', { email, password, remember_me });

    const response = await axios.post('https://facottry-backend.onrender.com/auth/login', {
      email,
      password,
      remember_me,
    });

    console.log('Received response from external service:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error during login request:', error);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
