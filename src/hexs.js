import { GridGenerator } from "react-hexgrid";

function initHex() {
	let hexagons = GridGenerator.orientedRectangle(79,42);

	const locations = [
		// Gates of Barovia
		{ q: 75, r: -15, s: -60, name: 'Gates of Barovia' },
		// Village of Barovia
		{ q: 64, r: -6, s: -58, name: 'Village of Barovia' },
		// Ivlis River Bridge
		{ q: 61, r: -2, s: -59, name: 'Ivlis River Bridge' },
		// Tser Pool Turnoff
		{ q: 54, r: 3, s: -57, name: 'Tser Pool Turnoff' },
		// Tser Pool Camp
		{ q: 52, r: 0, s: -52, name: 'Tser Pool Camp' },
		// Tser Falls Bridge
		{ q: 48, r: -1, s: -47, name: 'Tser Falls Bridge' },
		// Crossroads
		{ q: 47, r: -5, s: -42, name: 'West Gate' },
		// Castle Ravenloft Entrance
		{ q: 56, r: -7, s: -49, name: 'Castle Ravenloft Entrance' },
		// Castle Ravenloft
		{ q: 58, r: -8, s: -49, name: 'Castle Ravenloft' },
		// Old Bonegrinder
		{ q: 39, r: -3, s: -36, name: 'Old Bonegrinder' },
		// Vallaki
		{ q: 31, r: -3, s: -28, name: 'Town of Vallaki' },
		// Luna River Crossroads
		{ q: 26, r: 1, s: -27, name: 'Luna River Crossroads' },
		// Argynvostholt Turnoff
		{ q: 20, r: 6, s:-26, name: 'Argynvostholt Turnoff' },
		// Argynvostholt
		{ q: 25, r: 7, s: -28, name: 'Argynvostholt' },
		// Raven River Crossroads
		{ q: 16, r: 5, s:-21, name: 'Raven River Crossroads'},
		// Berez
		{ q: 25, r: 13, s: -38, name: 'Drowned Village of Berez' },
		// Van Richten's Tower
		{ q: 17, r: 2, s: -28, name: 'Tower of Khazan' },
		// Krezk
		{ q: 7, r: 8, s: -15, name: 'Village of Krezk' },
		// Wizard of Wines Winery
		{ q: 7, r: 15, s: -22, name: 'Wizard of Wines Winery' },
		// Yester Hill
		{ q: 3, r: 25, s: -28, name: 'Yester Hill' },
		// Tsolenka Pass Entance
		{ q: 11, r: 19, s: -30, name: 'Tsolenka Pass Entrance' },
		// Tsolenka Pass
		{ q: 20, r: 22, s: -42, name: 'Tsolenka Pass' },
		// Amber Temple Turnoff
		{ q: 29, r: 25, s: -54, name: 'Amber Temple Turnoff' },
		// Amber Temple
		{ q: 25, r: 24, s: -49, name: 'Amber Temple' },
	]

	hexagons.forEach((hex, index)=>{
		const locationCheck = locations.filter((loc)=>{ return loc.q == hex.q && loc.r == hex.r })
		if(locationCheck.length > 0){
		locationCheck[0].className = 'location';
		hexagons[index] = locationCheck[0];
		}
	});

	return hexagons;
}

export { initHex }
