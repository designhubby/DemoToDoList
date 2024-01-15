import React from 'react';
import { render, screen } from '@testing-library/react';
import { WebLogin } from '../services/authUser';
import { error } from "console";
import { log } from "console";

import https from 'https';

import axios from 'axios';

const user ={
    "email": "bell6@rogers.com",
    "password": "bell123bell"
  }

// Create a new axios instance with your config
const instance = axios.create({
    baseURL: "https://localhost:7134/api",
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    adapter: require('axios/lib/adapters/http').default
  });
  
  test('Test Login', async () => {
    // Now use this instance in your WebLogin function instead of the global axios object
    const result = await WebLogin(user, instance)
    expect(result).toEqual(expect.objectContaining({
      success: true
    }));
  });