import { sql } from "../config/db.js"
export async function getTransactionsById(req, res) {
    try {
        const { user_id } = req.params
        const transactions = await sql`
            SELECT * FROM transaction WHERE user_id = ${user_id} ORDER BY created_at DESC
        `
        res.status(200).json(transactions)

    } catch (error) {
        console.log("Error retrieving transaction", error)
        res.status(500).json({ message: "Internal server error" })
    }

}
//upload transaction
export async function uploadTransaction(req, res) {
    try {
        const { title, amount, category, user_id } = req.body //need to use express.json() middleware to read body
        if (!title || !amount || !category || amount == undefined) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const transaction = await sql`
    INSERT INTO transaction(user_id,title,amount,category)
    VALUES (${user_id},${title},${amount},${category})
    RETURNING *
    `
        console.log(transaction)
        res.status(201).json(transaction[0])
    }
    catch (error) {
        console.log("Error creating transaction", error)
        res.status(500).json({ message: "Internal server error" })
    }


}

export async function deleteById(req, res) {

    try {
        const { id } = req.params
        if (isNaN(parseInt(id))) {
            return res.status(404).json({ message: "Invalid transaction id" })
        }

        const result = await sql`  
            DELETE FROM transaction where id = ${id} RETURNING *
        `
        if (result.length === 0) {
            return res.status(404).json({ message: "no id was found" })
        }
        else {
            return res.status(200).json({ message: `number of transaction deleted: ${result.length} ` })
        }
    } catch (error) {
        console.log("Error retrieving transaction", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


export async function getSummaryById(req, res) {
    const { user_id } = req.params

    try {
        const totalBalance = await sql`
            SELECT COALESCE(SUM(amount),0) AS balance FROM transaction WHERE user_id = ${user_id}
        `

        const totalIncome = await sql`
            SELECT COALESCE(SUM(amount),0) AS balance FROM transaction 
            WHERE user_id = ${user_id}
            AND amount > 0 
        `

        const totalExpense = await sql`
            SELECT COALESCE(SUM(amount),0) AS balance FROM transaction 
            WHERE user_id = ${user_id}
            AND amount < 0 
        `
        res.status(200).json({
            balance: totalBalance[0].balance,
            income: totalIncome[0].balance,
            totalExpense: totalExpense[0].balance
        }
        )
    } catch (error) {
        console.log("Error retrieving transaction", error)
        res.status(500).json({ message: "Internal server error" })
    }
}