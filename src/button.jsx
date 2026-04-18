import React from 'react'

function Button({ title='', data='', onClick=()=>{}, setData=()=>{}, children }) {
  return (
	<button
		title={title}
		aria-label={title}
		onMouseEnter={()=>{setData(data)}}
		onMouseLeave={()=>{setData('')}}
		onClick={onClick}
	>
		{children}
	</button>
  )
}

export default Button