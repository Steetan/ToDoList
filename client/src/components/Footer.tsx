import React from 'react'
import { useSelector } from 'react-redux'
import { fetchTasks } from '../redux/slices/taskSlice'
import { RootState, useAppDispatch } from '../redux/store'
import axios from 'axios'

const Footer: React.FC = () => {
	const selectedDate = useSelector((state: RootState) => state.selectSlice.selectedDate)

	const dispatch = useAppDispatch()

	const [inputTitle, setInputTitle] = React.useState<string>('')
	const [inputDesc, setInputDesc] = React.useState<string>('')
	const [inputDate, setInputDate] = React.useState<string>('')

	const createTask = async () => {
		if (inputTitle && inputDate) {
			const dateWithoutTime = new Date()
			dateWithoutTime.setHours(0, 0, 0, 0)

			const newTask = {
				title_task: inputTitle,
				description_task: inputDesc,
				time_task: inputDate,
				selecteddate: selectedDate ? selectedDate : dateWithoutTime.toISOString().split('T')[0],
				ischecked: false,
			}

			try {
				await axios.post('http://localhost:8080/', newTask)

				dispatch(fetchTasks())
			} catch (error) {
				console.error('Error creating task:', error)
			}

			setInputTitle('')
			setInputDesc('')
			setInputDate('')
		} else {
			alert('The fields are not filled in!')
		}
	}

	return (
		<div className='footer-wrapper mt-auto mb-2 flex items-center justify-center gap-6'>
			<div className='input-wrapper border-black border-2 border-solid flex gap-5 rounded-xl p-2 px-4'>
				<input
					className='p-2 text-xl border-gray-400 border-b-2 border-solid'
					type='text'
					placeholder='title'
					maxLength={40}
					value={inputTitle}
					onChange={(e) => setInputTitle(e.target.value)}
				/>
				<div className='min-h-full bg-gray-400 opacity-60' style={{ width: 1 }}></div>
				<input
					className='p-2 text-xl border-gray-400 border-b-2 border-solid'
					type='text'
					placeholder='description'
					maxLength={60}
					value={inputDesc}
					onChange={(e) => setInputDesc(e.target.value)}
				/>
			</div>

			<div className='footer-bottom flex gap-6 items-center'>
				<div className='border-black border-2 border-solid rounded-xl flex p-2 items-center gap-3'>
					<h3 className='text-xl'>{selectedDate}</h3>
					<div className='min-h-full bg-gray-400 opacity-60' style={{ width: 1 }}></div>
					<input
						className='p-2 text-xl border-gray-400 border-b-2 border-solid'
						type='time'
						value={inputDate}
						onChange={(e) => setInputDate(e.target.value)}
					/>
				</div>

				<button
					className='p-4 px-5 text-4xl border-2 border-black border-solid btn-footer rounded-full'
					onClick={() => createTask()}
				>
					<h4 className='-mt-2'>+</h4>
				</button>
			</div>
		</div>
	)
}

export default Footer
