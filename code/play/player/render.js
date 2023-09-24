import { innerScreen } from "../main.js";

import * as playerController from "../../assets/player/controller.json" assert {type: "json"};
import getFrame from "../behind/animations.js";
import { PlayerAnimationStyle, PlayerAnimationDirection } from "./movement.js";

import { image } from "../preload/assets.js";

const playerData = playerController.default.player;
const playerAnimations = playerData.animations;

export default async function renderPlayer(filters=false){

	let animations = playerAnimations[PlayerAnimationStyle][PlayerAnimationDirection];

	let currentFramePATH = getFrame(animations);

	await image(
		"../../code/assets/player/images/"+currentFramePATH,
		innerScreen.width / 2 - ( 16 / 2 ),
		innerScreen.height / 2 - ( 16 ),
		16, 16,
		0, 0, 16, 16,
		(typeof filters == "object") ? filters : undefined
	);
}