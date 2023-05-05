import express from "express";
import { router } from "./routes";
import cors from 'cors'
import path from 'path'

const app = express()
app.use(express.json())

app.use(cors())
app.use('/assets', express.static(path.join(__dirname, '../public/assets')))

app.use(router)

app.listen(3000, () => {
    console.log('Serve is running on port 3000')
})