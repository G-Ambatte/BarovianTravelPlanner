import React from 'react'

function Label({ title='', children }) {
  return (
	<label aria-label={title} title={title}>
		{children}
	</label>
  )
}

export default Label