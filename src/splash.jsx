import React, { useEffect, useState } from 'react'

import './splash.css'

const Splash = ({ timer = 5000, children }) => {

	const [ show, setShow ] = useState(true);

	useEffect(()=>{
		setTimeout(()=>{
			setShow(false);
		}, timer);
	}, []);

	if(!show) return;
	return <div className='splash'>
		{children}
	</div>;
};

export default Splash