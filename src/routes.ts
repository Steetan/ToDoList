import { Router } from 'express'
import {
	getTasks,
	postTask,
	deleteTask,
	updateCheck,
	getTaskByParams,
	updateTask,
} from './controller.js'

const router = Router()

router.get('/', getTasks)
router.get('/search', getTaskByParams)
router.post('/', postTask)
router.delete('/:id', deleteTask)
router.patch('/:id', updateCheck)
router.patch('/update/:id', updateTask)

export default router
