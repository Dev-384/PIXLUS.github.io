import { innerScreen } from "../main.js";

import playerController from "../../assets/player/controller.json" assert {type: "json"};
import getFrame from "../behind/animations.js";
import { PlayerAnimationStyle, PlayerAnimationDirection } from "./movement.js";

import { image } from "../image.js";

const playerData = playerController.player;

export default async function renderPlayer(filters=false){

	let playerFrameSource = playerData.animations[PlayerAnimationStyle][PlayerAnimationDirection];


	let currentBlockAnimationFrameNumber = 0;

	if(playerData.animations[PlayerAnimationStyle].animationLength > 0){
		let arrayOfNumberedFrames = [];
		for(let i = 0; i < playerData.animations[PlayerAnimationStyle].animationLength; i++){
			arrayOfNumberedFrames.push(i);
		}
		currentBlockAnimationFrameNumber = getFrame(arrayOfNumberedFrames);
	}

	let playerDisplayPositionX = innerScreen.width / 2 - ( 16 / 2 );
	playerDisplayPositionX = Math.floor(playerDisplayPositionX);
	let playerDisplayPositionY = innerScreen.height / 2 - ( 16 );
	playerDisplayPositionY = Math.floor(playerDisplayPositionY);

	image(
		"../../code/assets/player/images/"+playerFrameSource,
		playerDisplayPositionX,
		playerDisplayPositionY,

		16, 16,

		(currentBlockAnimationFrameNumber) * playerData.animations[PlayerAnimationStyle].width, 0,
		16, 16,

		(typeof filters == "object") ? filters : undefined
	);
}