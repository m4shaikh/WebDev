import './App.css'
import UsingMap from './components/UsingMap/UsingMap'
import { useState } from 'react'
import UsingProps from './components/UsingProps/UsingProps'
import ConditionalRendering from './components/ConditionalRendering/ConditionalRendering'
import UseState from './components/UseState/UseState'
import StateAsProp from './components/StateAsProp/StateAsProp'
import UseEffect from './components/UseEffect/UseEffect'
import ContextAPI from './components/ContextAPI/ContextAPI'

function App() {
	const componentsList = [UsingMap,UsingProps,ConditionalRendering,UseState,StateAsProp,UseEffect,ContextAPI]

	const [index, setIndex] = useState(0)

	const CurrentComponent = componentsList[index]

	const next = () => {
		setIndex((current) => (current + 1) % componentsList.length)
	}

	const prev = () => {
		if(index == 0){
			setIndex(componentsList.length-1)
		}else{
			setIndex((current) => (current - 1) % componentsList.length)
		}
	}
	return (
		<main>
			<button className='left-button' onClick={prev}> &#60;</button>
			<div className='component'>
				<CurrentComponent />	
			</div>
			<button className='right-button' onClick={next}>&#62;</button>
		</main>
	)
}

export default App
