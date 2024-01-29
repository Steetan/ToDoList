import React from 'react'
import Task from './Task'
import { Calendar, TileArgs } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store'
import {
	fetchTasks,
	setDescInputPopup,
	setIsVisiblePopup,
	setTimeInputPopup,
	setTitleInputPopup,
} from '../redux/slices/taskSlice'
import { setFilteredTasks, setSelectedDate } from '../redux/slices/selectSlice'
import axios from 'axios'
import TaskSkeleton from './TaskSkeleton'

const Home: React.FC = () => {
	const {
		arrTask,
		isVisiblePopup,
		titleInputPopup,
		timeInputPopup,
		descInputPopup,
		currentTaskPopup,
	} = useSelector((state: RootState) => state.taskSlice)
	const { selectedSort, selectedDate, searchTask, filteredTasks } = useSelector(
		(state: RootState) => state.selectSlice,
	)

	const [isLoading, setIsLoading] = React.useState(true)

	const dispatch = useAppDispatch()

	document.body.className = isVisiblePopup ? 'active' : ''

	React.useEffect(() => {
		setIsLoading(true)
		dispatch(setFilteredTasks([]))
		axios
			.get(
				`http://localhost:8080/search?title=${searchTask}&selectedSort=${selectedSort}&selectedDate=${selectedDate}`,
			)
			.then((response) => {
				try {
					dispatch(setFilteredTasks(response.data))
				} catch (error) {
					console.error('Error creating task:', error)
				} finally {
					setIsLoading(false)
				}
			})
	}, [searchTask, selectedSort, arrTask, selectedDate])

	React.useEffect(() => {
		dispatch(fetchTasks())
	}, [])

	const calendarContent = (date: TileArgs) => {
		const currentDate = `${date.date.getFullYear()}-${
			date.date.getMonth() + 1
		}-${date.date.getDate()}`
		const tasksCount = arrTask.filter((item) => item.selecteddate === currentDate).length

		if (tasksCount) {
			return (
				<div
					className='font-bold border-gray-400 border-solid'
					style={{ fontSize: 11, borderTopWidth: 1 }}
				>
					{tasksCount} tsks
				</div>
			)
		}
	}

	const updateTask = async () => {
		console.log(titleInputPopup)
		await axios
			.patch(`http://localhost:8080/update/${currentTaskPopup}`, {
				titleInputPopup,
				descInputPopup,
				timeInputPopup,
			})
			.then((response) => {
				try {
					dispatch(fetchTasks())
					dispatch(setIsVisiblePopup())
				} catch (error) {
					console.log(error)
				}
			})
	}

	return (
		<div className='home flex gap-10 items-start mt-5'>
			<Calendar
				className='calendar mx-auto mt-2 rounded-3xl overflow-hidden'
				onChange={(ev) => {
					const selectedDate = ev as Date

					dispatch(
						setSelectedDate(
							`${selectedDate.getFullYear()}-${
								selectedDate.getMonth() + 1
							}-${selectedDate.getDate()}`,
						),
					)
				}}
				value={selectedDate}
				locale='en'
				tileContent={calendarContent}
			/>
			<div className='tasks mb-3 flex flex-col gap-3 w-full relative'>
				{filteredTasks.map((item, index) => (
					<Task key={index} idTask={item.id_task} propsTask={item} />
				))}
				{!isLoading && !filteredTasks.length && (
					<div className='text-3xl overflow-hidden text-center'>No tasks😱</div>
				)}
				{isLoading && (
					<>
						<TaskSkeleton />
						<TaskSkeleton />
						<TaskSkeleton />
						<TaskSkeleton />
					</>
				)}
			</div>

			{isVisiblePopup && (
				<div className='wrapper-popup-edit'>
					<div className='popup-edit'>
						<div className='popup-edit-close' onClick={() => dispatch(setIsVisiblePopup())}></div>
						<div className='flex flex-col  gap-3 self-center'>
							<input
								type='text'
								placeholder='title'
								value={titleInputPopup}
								onChange={(e) => dispatch(setTitleInputPopup(e.target.value))}
								className='text-xl border-b-2 border-gray-500'
							/>
							<input
								type='text'
								placeholder='description'
								value={descInputPopup}
								onChange={(e) => dispatch(setDescInputPopup(e.target.value))}
								className='text-xl border-b-2 border-gray-500'
							/>
							<input
								type='time'
								placeholder='time'
								value={timeInputPopup}
								onChange={(e) => dispatch(setTimeInputPopup(e.target.value))}
								className='text-xl border-b-2 border-gray-500'
							/>
						</div>
						<button className='text-xl mt-7' onClick={() => updateTask()}>
							edit
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Home
