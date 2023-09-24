import screeUpdate from "./update.js";
import resizeCanvas from "./resize.js";

import { canvas, innerScreen, UI_options } from "../main.js";

import reloadWorlds from "../../worlds/reload.js";
import { KeyPressed } from "../behind/keyboard.js";
import PlaceBlock from "../behind/world_editor.js";
import render from "../render.js";
import { ReloadPlayerMovement } from "../player/movement.js";
import { text } from "../ui/fonts.js";
import { frameChanged, speed } from "../behind/animations.js";

var PreviousTimer = 0;
export var FPS = 0;

export async function startLoop(){

	var worldNumber = 0;
	localStorage.setItem("worldNumber", `${worldNumber}`);

	if(frameChanged(speed * 0.1)){
		ReloadPlayerMovement();
	}

	await reloadWorlds();
	await resizeCanvas();
	await render();
	text(`FPS ${FPS}`, 0, 0, 16);

	let context = canvas.getContext("2d");
	context.imageSmoothingEnabled = false;
	await context.drawImage(innerScreen, 0, 0, canvas.width, canvas.height);

	if(KeyPressed("MouseClick") && UI_options.currentMenu == "") {

		PlaceBlock(localStorage.getItem("currentBlock") || "water");
	}

	FPS = Math.round( (new Date).getTime() - PreviousTimer );
	PreviousTimer = (new Date).getTime();

	screeUpdate(startLoop);
}