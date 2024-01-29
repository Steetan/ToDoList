import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { typeArrTask } from './taskSlice'

type typeInitialState = {
	selectedSort: string
	selectedDate: string
	searchTask: string
	filteredTasks: typeArrTask[]
}

let currentDate = new Date()

let dateWithoutTime = `${currentDate.getFullYear()}-${
	currentDate.getMonth() + 1
}-${currentDate.getDate()}`

const initialState: typeInitialState = {
	selectedSort: 'All',
	selectedDate: dateWithoutTime,
	searchTask: '',
	filteredTasks: [],
}

export const selectSlice = createSlice({
	name: 'selectSlice',
	initialState,
	reducers: {
		setSelectedSort: (state, action: PayloadAction<string>) => {
			state.selectedSort = action.payload
		},
		setSelectedDate: (state, action: PayloadAction<string>) => {
			state.selectedDate = action.payload
		},
		setSearchTask: (state, action: PayloadAction<string>) => {
			state.searchTask = action.payload
		},
		setFilteredTasks: (state, action: PayloadAction<typeArrTask[]>) => {
			state.filteredTasks = action.payload
		},
	},
})

export const { setSelectedSort, setSelectedDate, setSearchTask, setFilteredTasks } =
	selectSlice.actions

export default selectSlice.reducer
