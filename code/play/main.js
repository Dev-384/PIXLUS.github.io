import { showLoader, hideLoader } from "../loader_create.js";
showLoader("PIXLUS");
hideLoader();

import render from "./rendering/main.js";
import loadAssets from "./preload/assets.js";
import play from "../worlds/index.json" assert {type: "json"}

var canvas = document.getElementById("screen");
loadAssets();

export var worldNumber = 0;
export var currentScale = 3;

export var UI_options = {
	inPlay: true,

	currentMenu: ""
};

for(let i = 0; i < play.worlds.length; i++){
	let currentWorldName = play.worlds[i];

	let currentWorld = await import(`../worlds/${currentWorldName}.json`, {
		assert: {
			type: "json",
		},
	});

	let stringifiedWorldData = JSON.stringify(currentWorld);

	// if(localStorage.getItem(`world.${currentWorldName}`) == null){
		localStorage.setItem(`world.${currentWorldName}`, stringifiedWorldData);
	// }
}

async function main(){

	reloadWorlds().then(async () => {
		resizeCanvas(canvas);
	}).then(async () => {
		await render(canvas.innerScreen);
	}).then(async () => {
		canvas.getContext("2d").drawImage(canvas.innerScreen, 0, 0);
	});

}

window.onload = function(){
	main();
	setInterval(main, 100);
}

window.onresize = function(){
	main();
}

function resizeCanvas(canvas=HTMLCanvasElement){

	currentScale = Math.abs(currentScale);

	if(canvas.width !== window.innerWidth){
		canvas.width = window.innerWidth;
	}
	if(canvas.height !== window.innerHeight){
		canvas.height = window.innerHeight;
	}

	canvas.innerScreen = document.createElement("canvas");
	canvas.innerScreen.width = canvas.width;
	canvas.innerScreen.height = canvas.height;
}

async function reloadWorlds(){
	for(let i = 0; i < play.worlds.length; i++){
		let currentWorldName = play.worlds[i];
	
		let currentWorld = await import(`../worlds/${currentWorldName}.json`, {
			assert: {
				type: "json",
			},
		});
	
		let stringifiedWorldData = JSON.stringify(currentWorld);
	
		if(localStorage.getItem(`world.${currentWorldName}`) == null){
			localStorage.setItem(`world.${currentWorldName}`, stringifiedWorldData);
		}
	}
}