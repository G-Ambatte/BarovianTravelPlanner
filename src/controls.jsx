import React, { useState } from 'react'
import Label from './label.jsx';
import Button from './button.jsx';

import './controls.css'
import GearIcon from './assets/svgs/gear.jsx';
import HexIcon from './assets/svgs/hex.jsx'
import NodesIcon from './assets/svgs/nodes.jsx';
import PlusIcon from './assets/svgs/plus.jsx';
import MinusIcon from './assets/svgs/minus.jsx';
import EraserIcon from './assets/svgs/eraser.jsx';
import ZoomInIcon from './assets/svgs/zoom-in.jsx';
import ZoomOutIcon from './assets/svgs/zoom-out.jsx';

function Controls({
	showOverlay = false,
	setShowOverlay = ()=>{},
	gridValue,
	setGridValue = ()=>{},
	speed,
	setSpeed = ()=>{},
	zoom,
	setZoom = ()=>{},
	data = '',
	setData = ()=>{},
	selectMode = 'none',
	setSelectMode = ()=>{},
	setActivePaths = ()=>{}
}){

	const [ showOpts, setShowOpts ] = useState(false);

	const toggleOverlay = ()=>{
		setShowOverlay(!showOverlay);
	};

  return (
	<div className='controls'>
		<p className={`gear ${showOpts ? 'active' : 'inactive'}`}>
			<Button
				title='options'
				data='Options'
				setData={setData}
				onClick={()=>{ setShowOpts(!showOpts) }}
			>
				<GearIcon />
			</Button>
			{showOpts && <>
				<p className='scaleControls'>
					<Label title='scale'>
						<input type='range' value={gridValue} min={0.25} max={10} step={0.25} onChange={(e)=>{setGridValue(e.target.value)}} />
						<br />
						{gridValue} miles/hex
					</Label>
					<br />
					<Label title='speed'>
						<input type='range' value={speed} min={1} max={25} step={1} onChange={(e)=>{setSpeed(e.target.value)}} />
						<br />
						{speed} mph
					</Label>
				</p>
			</>}
		</p>
		<p className={`hex ${showOverlay ? 'active' : 'inactive'}`}>
			<Button
				title='custom paths'
				data='Custom Paths'
				setData={setData}
				onClick={()=>toggleOverlay()}
			>
				<NodesIcon />
			</Button>
		</p>
		<p className={`selectionAdd ${selectMode == 'add' ? 'active' : 'inactive'}`}>
			<Button
				title='add to selection'
				data='(CTRL) Add to Selection'
				setData={setData}
				onClick={()=>{ setSelectMode( selectMode != 'add' ? 'add' : 'none' ) }}
			>
				<PlusIcon />
			</Button>
		</p>
		<p className={`selectionAdd ${selectMode == 'remove' ? 'active' : 'inactive'}`}>
			<Button
				title='remove from selection'
				data='(SHIFT) Remove from Selection'
				setData={setData}
				onClick={()=>{ setSelectMode( selectMode != 'remove' ? 'remove' : 'none' ) }}
			>
				<MinusIcon />
			</Button>
		</p>
		<p className='selectionClear'>
			<Button
				title='clear selection'
				data='Clear Selection'
				setData={setData}
				onClick={()=>{ setActivePaths([]) }}
			>
				<EraserIcon />
			</Button>
		</p>
		<p className='zoom-in'>
			<Button
				title='zoom in'
				data='Zoom In'
				setData={setData}
				onClick={()=>setZoom(Math.min(zoom+0.1,2))}
			>
				<ZoomInIcon />
			</Button>
		</p>
		<p className='zoom-out'>
			<Button
				title='zoom out'
				data='Zoom Out'
				setData={setData}
				onClick={()=>setZoom(Math.max(zoom-0.1, 0.5))}
			>
				<ZoomOutIcon />
			</Button>
		</p>
		<div className='spacer'></div>
		<p className='output'>
			{data}
		</p>
	</div>
  )
}

export default Controls