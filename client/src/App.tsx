import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import './App.css'

type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

function App() {
	const dateWithoutTime = new Date()
	dateWithoutTime.setHours(0, 0, 0, 0)

	return (
		<div className='App max-w-screen-xl mx-auto px-2'>
			<Header />
			<Home />
			<Footer />
		</div>
	)
}

export default App
