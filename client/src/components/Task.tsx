import React from 'react'
import { Checkbox } from 'antd'
import { useAppDispatch } from '../redux/store'
import {
	fetchTasks,
	setCurrentTaskPopup,
	setDescInputPopup,
	setIsVisiblePopup,
	setTimeInputPopup,
	setTitleInputPopup,
	typeArrTask,
} from '../redux/slices/taskSlice'
import axios from 'axios'

interface ITask {
	propsTask: typeArrTask
	idTask?: string
}

const Task: React.FC<ITask> = ({ propsTask, idTask }) => {
	const dispatch = useAppDispatch()

	const deleteTask = async (idTask?: string) => {
		const answer: boolean = window.confirm('Вы уверены что хотите удалить эту задачу?')

		if (answer) {
			try {
				await axios.delete(`http://localhost:8080/${idTask}`)
				dispatch(fetchTasks())
			} catch (error) {
				console.error('Error creating task:', error)
			}
		}
	}
	const changeCheck = async (idTask?: string) => {
		await axios.patch(`http://localhost:8080/${idTask}`).then((response) => {
			try {
				dispatch(fetchTasks())
			} catch (error) {
				console.log(error)
			}
		})
	}

	const openPopup = () => {
		dispatch(setIsVisiblePopup())
		dispatch(setTitleInputPopup(propsTask.title_task))
		dispatch(setDescInputPopup(propsTask.description_task))
		dispatch(setTimeInputPopup(propsTask.time_task))
		dispatch(setCurrentTaskPopup(idTask ? idTask : ''))
		window.scrollTo(0, 0)
	}

	return (
		<div className='task flex justify-between p-2 items-center border-2 border-black border-solid rounded-xl w-full'>
			<div className='task-header flex gap-3 items-center'>
				<h3 className='text-3xl border-r-2 p-3'>{propsTask.time_task}</h3>
				<div>
					<h2 className='task-title text-3xl'>{propsTask.title_task}</h2>
					<h4 className='task-text'>{propsTask.description_task}</h4>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<Checkbox
					className='checkbox-task custom-checkbox min-w-10 h-6 cursor-pointer'
					type='checkbox'
					checked={propsTask.ischecked}
					onChange={() => changeCheck(idTask)}
				/>
				<h3 className='task-edit' onClick={() => openPopup()}>
					<img className='max-w-5' src={require('../assets/edit.png')} />
				</h3>
				<div className='deleteBody-task cursor-pointer' onClick={() => deleteTask(idTask)}>
					<div className='delete-task'></div>
				</div>
			</div>
		</div>
	)
}

export default Task
