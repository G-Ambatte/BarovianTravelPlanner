import { locations } from "./hexs.js";
import { describe, test, expect } from "vitest";

describe('check location co-ords', ()=>{
	locations.forEach(location => {
		test(`${location.name}`, ()=>{
			expect(location.q + location.r + location.s).toEqual(0)
		})
	});
})
