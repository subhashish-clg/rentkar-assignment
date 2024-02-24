import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import todosRouter from "./routes/todoRoutes"

dotenv.config()

const app = express()

mongoose.connect(
    process.env.MONGODB_URL as string
).then(
    ()=> console.log("Successfully connected to mongoDB Altas.")
)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use("/todos", todosRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on http://localhost:${process.env.PORT}`)
})