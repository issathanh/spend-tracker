import express from 'express'
import { sql } from "../config/db.js"
import { deleteById, getSummaryById, getTransactionsById, uploadTransaction } from "../controllers/transactionsController.js"
const router = express.Router()

//retrieve all transactions with user id 
router.get("/:user_id", getTransactionsById)
//upload transaction
router.post("/", uploadTransaction)
//delete transaction under userid 
router.delete("/:id", deleteById)
//summary api for total expense, income, and balanceg
router.get("/summary/:user_id", getSummaryById)

export default router