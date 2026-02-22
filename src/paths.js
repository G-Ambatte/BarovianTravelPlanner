import paths from './pathData.json' with { type: 'json' };


function initPaths() {
	// Calculate lengths
	paths.forEach((path)=>{
		path.length = path.segments.reduce((acc,current)=>{return acc + getPathLength(current);}, 0);
	});

	return paths;
};

function getPathLength (path) {
	if(!path.start || !path.end) {
		console.log('Path error', path);
		throw 'Path Error - not a path';
	}
	return Math.max(Math.abs(path.start.q - path.end.q), Math.abs(path.start.r - path.end.r), Math.abs(path.start.s - path.end.s))
};

export { initPaths, getPathLength }