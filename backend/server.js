//old syntax const express = require("express")
import express from 'express'
import dotenv from "dotenv"
import { sql } from "./config/db.js"
import rateLimiter from './middleware/rateLimiter.js'
import transactionRoutes from "./routes/transactionsRoute.js"
dotenv.config()
const app = express()
const port = process.env.PORT
//call a middleware 
app.use(express.json())//just befoe you sent the response, this middleware rune
app.use(rateLimiter)
async function initDB() {
    try {
        //create a transaction table 
        await sql`CREATE TABLE IF NOT EXISTS transaction(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL, 
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
 
        )`
        console.log("db initiallize successfully")
    }
    catch (error) {
        console.log(error)
        process.exit(1) // status code one mean failer and 0 means success 
    }
}
app.use("/api/transactions", transactionRoutes)

initDB().then(() => {
    app.listen(port, () => {
        console.log("Server is up and running on PORT: ", port)
    })
})