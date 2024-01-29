import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../db.js'

const getTasks = (req: Request, res: Response) => {
	pool.query(
		'SELECT * FROM tasks ORDER BY ischecked DESC',
		(error: Error, results: QueryResult) => {
			if (error) throw error
			res.status(200).json(results.rows)
		},
	)
}

const getTaskByParams = (req: Request, res: Response) => {
	let query = 'SELECT * FROM tasks WHERE 1 = 1'

	const queryParams: any[] = []

	if (req.query.selectedSort === 'Completed') {
		query += ' AND ischecked = true'
	} else if (req.query.selectedSort === 'Not completed') {
		query += ' AND ischecked = false'
	}

	if (req.query.selectedDate) {
		query += ' AND selecteddate = $1 '
		queryParams.push(req.query.selectedDate)
	}
	if (req.query.title) {
		query += "AND (title_task LIKE '%' || $2 || '%' OR description_task LIKE '%' || $2 || '%')"
		queryParams.push(req.query.title)
	}

	query += ' ORDER BY ischecked DESC'

	pool.query(query, queryParams, (error: Error, results: QueryResult) => {
		if (error) throw error
		res.status(200).json(results.rows)
	})
}

const postTask = (req: Request, res: Response) => {
	if (!req.body.title_task || !req.body.selecteddate || !req.body.time_task) {
		res.status(400).json({
			message: 'empty fields!',
		})
	} else {
		pool.query(
			'INSERT INTO tasks (title_task, description_task, time_task, selecteddate, ischecked) VALUES ($1, $2, $3, $4, $5)',
			[
				req.body.title_task,
				req.body.description_task,
				req.body.time_task,
				req.body.selecteddate,
				req.body.ischecked,
			],
			(error: Error, results: QueryResult) => {
				if (error) {
					res.status(500).json({
						message: 'Error creating task',
					})
				} else {
					res.status(201).json({
						message: 'Task has been created',
					})
				}
			},
		)
	}
}

const deleteTask = (req: Request, res: Response) => {
	pool.query(
		'DELETE FROM tasks WHERE id_task=$1',
		[req.params.id],
		(error: Error, results: QueryResult) => {
			if (error) throw error

			const noTaskFound = !results.rows.length
			if (noTaskFound) {
				res.status(200).json({
					message: 'Task has been deleted',
				})
			} else {
				res.status(404).json({
					message: 'Error',
				})
			}
		},
	)
}

const updateCheck = (req: Request, res: Response) => {
	pool.query(
		'UPDATE tasks SET ischecked=NOT ischecked WHERE id_task=$1',
		[req.params.id],
		(error: Error, results: QueryResult) => {
			if (error) throw error

			if (results.rowCount) {
				res.status(200).json({
					message: 'Task has been updated',
				})
			} else {
				res.status(404).json({
					message: 'Error',
				})
			}
		},
	)
}

const updateTask = (req: Request, res: Response) => {
	console.log(req.body)
	pool.query(
		'UPDATE tasks SET title_task=$1, description_task=$2, time_task=$3 WHERE id_task=$4',
		[req.body.titleInputPopup, req.body.descInputPopup, req.body.timeInputPopup, req.params.id],
		(error: Error, results: QueryResult) => {
			if (error) throw error

			if (results.rowCount) {
				res.status(200).json({
					message: 'Task has been updated',
				})
			} else {
				res.status(404).json({
					message: 'Error',
				})
			}
		},
	)
}

export { getTasks, getTaskByParams, postTask, deleteTask, updateCheck, updateTask }
