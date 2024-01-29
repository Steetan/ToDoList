import express from 'express'
import cors from 'cors'
import taskRoutes from './src/routes.js'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 1 * 30 * 1000,
	max: 100,
})

const app = express()
const PORT = process.env.PORT || 8080

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())

app.use(limiter)

app.use('/', taskRoutes)

app.listen(PORT, () => {
	console.log('server has been started')
})
