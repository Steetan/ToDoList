import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export type typeArrTask = {
	id_task?: string
	title_task: string
	description_task: string
	time_task: string
	selecteddate: string
	ischecked: boolean
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

type typeInitialState = {
	arrTask: typeArrTask[]
	status: Status
	isVisiblePopup: boolean
	titleInputPopup: string
	descInputPopup: string
	timeInputPopup: string
	currentTaskPopup: string
}

const initialState: typeInitialState = {
	arrTask: [],
	status: Status.LOADING,
	isVisiblePopup: false,
	titleInputPopup: '',
	descInputPopup: '',
	timeInputPopup: '',
	currentTaskPopup: '',
}

export const fetchTasks = createAsyncThunk('taskSlice/tasksStatus', async () => {
	const { data } = await axios.get(`http://localhost:8080/`)
	return data
})

export const taskSlice = createSlice({
	name: 'taskSlice',
	initialState,
	reducers: {
		setIsVisiblePopup: (state) => {
			state.isVisiblePopup = !state.isVisiblePopup
		},
		setTitleInputPopup: (state, action: PayloadAction<string>) => {
			state.titleInputPopup = action.payload
		},
		setDescInputPopup: (state, action: PayloadAction<string>) => {
			state.descInputPopup = action.payload
		},
		setTimeInputPopup: (state, action: PayloadAction<string>) => {
			state.timeInputPopup = action.payload
		},
		setCurrentTaskPopup: (state, action: PayloadAction<string>) => {
			state.currentTaskPopup = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTasks.pending, (state) => {
			state.status = Status.LOADING
			state.arrTask = []
		})
		builder.addCase(fetchTasks.fulfilled, (state, action: PayloadAction<typeArrTask[]>) => {
			state.status = Status.SUCCESS
			state.arrTask = action.payload
		})
		builder.addCase(fetchTasks.rejected, (state) => {
			state.status = Status.ERROR
			state.arrTask = []
		})
	},
})

export const {
	setIsVisiblePopup,
	setTitleInputPopup,
	setDescInputPopup,
	setTimeInputPopup,
	setCurrentTaskPopup,
} = taskSlice.actions

export default taskSlice.reducer
