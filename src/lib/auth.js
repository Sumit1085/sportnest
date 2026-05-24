import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"

import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('sportnest');
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
   trustedOrigins: [
    "http://localhost:3000",
  ],
  session:{
    cookieCache:{
      enabled: true,
      strategy: 'jwt',
      maxAge: 5*24*60*60
    }
  },
  plugins: [
        jwt(), 
    ]
});