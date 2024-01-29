import React, { ChangeEvent } from 'react'
import '../index.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store'
import debounce from 'lodash.debounce'
import { setSearchTask, setSelectedSort } from '../redux/slices/selectSlice'

const Header: React.FC = () => {
	const [date, setDate] = React.useState(new Date())
	const [isVisible, setIsVisible] = React.useState(false)
	const [value, setValue] = React.useState('')
	const dropdownRef = React.useRef<HTMLDivElement>(null)

	const { selectedSort } = useSelector((state: RootState) => state.selectSlice)
	const dispatch = useAppDispatch()

	const arrSort = ['All', 'Completed', 'Not completed']

	React.useEffect(() => {
		const now = new Date()
		const tomorrow = new Date(now)
		tomorrow.setDate(tomorrow.getDate() + 1)
		tomorrow.setHours(0, 0, 0, 0)

		const timeout = setTimeout(() => {
			setDate(new Date())
		}, tomorrow.getTime() - now.getTime())

		return () => clearTimeout(timeout)
	}, [date])

	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchTask(str))
		}, 1000),
		[],
	)

	const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		updateSearchValue(e.target.value)
	}

	const clearSearch = () => {
		setValue('')
		dispatch(setSearchTask(''))
	}

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsVisible(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const dateDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
	const dateMonth = date.toLocaleString('en-US', { month: 'long' })
	const dateYear = date.getFullYear()

	return (
		<div className='border-2 border-solid border-black p-4 flex items-center justify-between mt-2 rounded-xl relative'>
			<div className='flex gap-2'>
				<img className='max-w-10' src={require('../assets/todoLogo.png')} />
				<h1 className='title-logo text-2xl'>PlanMaster</h1>
			</div>
			<div className='flex items-center gap-2'>
				<div className='relative'>
					<input
						placeholder='search'
						type='text'
						value={value}
						onChange={(e) => changeSearchText(e)}
						className='search-input border-2 border-solid border-black p-2 text-xl rounded-lg'
					/>
					{value && (
						<div className='wrapper-search-x' onClick={clearSearch}>
							<div className='search-x'></div>
						</div>
					)}
				</div>
				<div
					className='sort-list relative w-44 cursor-pointe h-full'
					onClick={() => setIsVisible(!isVisible)}
					ref={dropdownRef}
				>
					<div className='border-2 border-solid border-black py-2 px-2 text-xl flex items-center text-right justify-between rounded-lg'>
						<h2>{selectedSort}</h2>
						<img
							className={isVisible ? 'max-w-5 arrow-active' : 'max-w-5 arrow-hide'}
							src={require('../assets/arrow.png')}
							alt=''
						/>
					</div>
					{isVisible && (
						<div className='absolute top-14 bg-white border-black border-2 border-solid w-full text-xl rounded-lg z-10'>
							{arrSort.map((item, index) => (
								<h2
									key={index}
									className='option-sort'
									onClick={() => dispatch(setSelectedSort(arrSort[index]))}
								>
									{item}
								</h2>
							))}
						</div>
					)}
				</div>
			</div>
			<div className='current-date text-2xl text-right'>
				{dateDay} <b>{dateMonth}</b>
				<br />
				{dateYear}
			</div>
		</div>
	)
}

export default Header
