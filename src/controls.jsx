import React from 'react'

import './controls.css'
import HexIcon from './assets/svgs/hex.jsx'
import PlusIcon from './assets/svgs/plus.jsx';
import MinusIcon from './assets/svgs/minus.jsx';

function Controls({
	showOverlay = false,
	setShowOverlay = ()=>{},
	gridValue,
	setGridValue = ()=>{},
	speed,
	setSpeed = ()=>{},
	zoom,
	setZoom = ()=>{}
}){

	const toggleOverlay = ()=>{
		setShowOverlay(!showOverlay);
	};

  return (
	<div className='controls'>
		<p>
			<label aria-label='scale' title='scale'>
				<input type='range' value={gridValue} min={0.25} max={10} step={0.25} onChange={(e)=>{setGridValue(e.target.value)}} />
				<br />
				{gridValue} miles/hex
			</label>
		</p>
		<p>
			<label aria-label='speed' title='speed'>
				<input type='range' value={speed} min={1} max={25} step={1} onChange={(e)=>{setSpeed(e.target.value)}} />
				<br />
				{speed} mph
			</label>
		</p>
		<p className={`hex ${showOverlay ? 'active' : 'inactive'}`}>
			<button
				title='toggle hex'
				aria-label='toggle hex'
				onClick={()=>toggleOverlay()}
			>
				<HexIcon />
			</button>
		</p>
		<p className='zoom-in'>
			<button
				title='zoom in'
				aria-label='zoom in'
				onClick={()=>setZoom(Math.min(zoom+0.1,2))}
			>
				<PlusIcon />
			</button>
		</p>
		<p className='zoom-out'>
			<button
				title='zoom out'
				aria-label='zoom out'
				onClick={()=>setZoom(Math.max(zoom-0.1, 0.5))}
			>
				<MinusIcon />
			</button>
		</p>
	</div>
  )
}

export default Controls