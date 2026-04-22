import { locations } from "./hexs.js";
import { describe, test, expect } from "vitest";

describe('check location co-ords', ()=>{
	locations.forEach(location => {
		test(`${location.name} - Q:${location.q} R:${location.r} S:${location.s}`, ()=>{
			expect(location.q + location.r + location.s == 0)
		})
	});
})
