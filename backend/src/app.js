import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credentials :true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import

import userRoutes from "./routes/user.js"
import bookRoutes from "./routes/book.js"
import membershipRoutes from "./routes/membership.js"
import transactionRoutes from "./routes/transaction.js"



//routes decleration
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/transactions', transactionRoutes);







export {app}