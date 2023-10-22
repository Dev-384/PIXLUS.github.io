import reloadWorlds from "../worlds/reload.js";
import * as loader from "../loader_create.js";
import gameOptions from "../../options/index.json" assert {type: "json"};
import { loadAssets } from "./image.js";

import screeUpdate from "./screen/update.js";
import resizeCanvas from "./screen/resize.js";

import { KeyPressed } from "./behind/keyboard.js";
import PlaceBlock from "./behind/world_editor.js";
import render from "./render.js";
import { ReloadPlayerMovement } from "./player/movement.js";


await reloadWorlds();
loader.show("Loading");
loadAssets();

export const startTime = (new Date).getMilliseconds();
export var canvas = document.getElementById("screen");
export var innerScreen = document.createElement("canvas");
export var UI_options = {
	currentMenu: ""
};
var actualScale = 1;
export var scale = actualScale / 4;
var PreviousTimer = 0;
export var FPS = 0;
export var adverageFPS = 0;

if((gameOptions.advanced["show_paused_menu"] !== false)){
	UI_options.currentMenu = "paused";
}

setTimeout( () =>  {

	startLoop();
	loader.hide();

}, 1000);

document.onvisibilitychange = () => {
	if(gameOptions.advanced.DEVELOPER_MODE !== true){
		if(UI_options.currentMenu == ""){
			UI_options.currentMenu = "paused";
		}
	}
}

async function startLoop(){
	let context = canvas.getContext("2d");
	context.imageSmoothingEnabled = false;

	var worldNumber = 0;
	localStorage.setItem("worldNumber", `${worldNumber}`);

	ReloadPlayerMovement();

	await reloadWorlds();
	await resizeCanvas();
	await render(true);

	await context.drawImage(
		innerScreen,

		0, 0, canvas.width, canvas.height,
	);

	if(KeyPressed("MouseClick") && UI_options.currentMenu == "") {

		PlaceBlock(localStorage.getItem("currentBlock") || "water");
	}

	adverageFPS = FPS;

	FPS = ( performance.now() - PreviousTimer ) / 1000;
	FPS = Math.floor(1 / FPS);

	adverageFPS = Math.floor( (adverageFPS + FPS) / 2 )

	PreviousTimer = performance.now();

	screeUpdate(startLoop);
}