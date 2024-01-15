import React from 'react';
import { render, screen } from '@testing-library/react';
import { WebLogin } from '../services/authUser';
import { error } from "console";
import { log } from "console";

import https from 'https';

import axios, { AxiosResponse } from 'axios';
import { RemoteGetToDoListData } from '../services/RemotedataToDoList';

const user ={
    "email": "bell6@rogers.com",
    "password": "bell123bell"
  }
let cookies: string[] = [];

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


// Create a function using config
async function makeRequest(url: string, method: "get" | "post" = "get", data? : any): Promise<AxiosResponse>{
    const response = await instance({
        url,
        method,
        data,
        headers:{
            'Cookie': cookies.join('; '),
        },
        
    });
    return response;
}




//test with function  
  test('Login and get data', async () => {
    //Log into server to get cookie
    const result = await makeRequest('/AuthManagement/Login','post', user);
    const setCookie = result.headers['set-cookie'];
    if(setCookie){
        cookies = setCookie;
    }
    //Request data with cookie
    const responseData = await makeRequest('/ToDoList').then(result => result.data);
    log(`responseData`)
    log(responseData)
    expect(responseData).toEqual(expect.objectContaining({
        applicationUserId: "b1808ee9-6ca7-417e-95fc-2385e5e5295d"
    }));
  });