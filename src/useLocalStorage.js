import { useState, useEffect } from 'react';

function useStorage(storage, key, initialValue){
	if(!storage) throw 'Storage error!';

	let value = initialValue;
	if(storage[key]) value = storage.getItem(key);

	const [ state , setState ] = useState(value);

	useEffect(()=>{
		storage.setItem(key, state);
	}, [ state ]);

	function clearState(){
		storage.removeItem(key);
	};

	return [ state, setState, clearState ];
};

function useLocalStorage(key, value){
	return useStorage(window.localStorage, key, value);
};

function useSessionStorage(key, value){
	return useStorage(window.sessionStorage, key, value);
};

export { useLocalStorage, useSessionStorage };