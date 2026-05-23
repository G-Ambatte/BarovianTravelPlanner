import { useEffect, useState } from 'react'

function KeyBinds({ keyMaps = [] }) {
	const [keyPress, setKeyPress] = useState({ key: '' });

	useEffect(()=>{
		const keyDown = (e)=>{
			e.preventDefault();
			setKeyPress({
				key: e.key,
				ctrlKey: e.ctrlKey,
				shiftKey: e.shiftKey,
				altKey: e.altKey,
				metaKey: e.metaKey,
				repeat: e.repeat
			});
		};
		const keyUp = (e)=>{
			e.preventDefault();
			setKeyPress({
				key: null,
				ctrlKey: null,
				shiftKey: null,
				altKey: null,
				metaKey: null,
				repeat: null
			});
		};

		document.addEventListener('keydown', keyDown);
		document.addEventListener('keyup', keyUp);
		return ()=>{
			document.removeEventListener('keydown', keyDown);
			document.removeEventListener('keyup', keyUp);
		}
	}, [])

	useEffect(()=>{
		if(keyPress.repeat) return;

		keyMaps
			.filter((keyMap)=>{ return ( keyMap.caseSensitive ? keyMap.key : keyMap.key?.toLowerCase() ) == ( keyMap.caseSensitive ? keyPress.key : keyPress.key?.toLowerCase() ); })
			.forEach((keyMap)=>{
				keyMap?.run();
			});

	}, [keyPress]);

	return;
}

export default KeyBinds