import * as playerController from "../../assets/player/controller.json" assert {type: "json"};
import getFrame from "../behind/animations.js";
import { PlayerAnimationStyle, PlayerAnimationDirection } from "./movement.js";
import { currentScale } from "../main.js";

const playerData = playerController.default.player;
const playerAnimations = playerData.animations;

export default function renderPlayer(canvas=HTMLCanvasElement){

	let animations = playerAnimations[PlayerAnimationStyle][PlayerAnimationDirection];

	let currentFramePATH = getFrame(animations);

	image(
		currentFramePATH,
		canvas.width/2 - (16 * currentScale) / 2,
		canvas.height/2 - (16 * currentScale) / 2,
		16*currentScale,
		16*currentScale,
		canvas
	);
}

async function image(img="",x=0,y=0,width=0,height=0, canvas){
	let context = canvas.getContext("2d");
	let myImage = document.createElement('img');
	myImage.src = `../../code/assets/player/images/${img}`;
	context.drawImage(myImage, x, y, width,height);
	context.stroke();
	myImage.remove();
}