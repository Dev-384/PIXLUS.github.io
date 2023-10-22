import { FPS, UI_options } from "../main.js";
import { adverageFPS } from "../screen/loop.js";

import { KeyPressed, keybinds, keysPressed } from "../behind/keyboard.js";
import worlds from "../../worlds/index.json" assert {type: "json"};
import { CashedBlockData } from "../render.js";

import reloadWorlds from "../../worlds/reload.js";
reloadWorlds();

export var PlayerPositions = {
	X: JSON.parse(
		localStorage.getItem(`world.${worlds.worlds[
			JSON.parse(localStorage.getItem("worldNumber"))
		]?.title}`) ||
		JSON.stringify({spawnpoint: {X: 0}})
	).spawnpoint.X * 16 + 16/2,

	Y: JSON.parse(
		localStorage.getItem(`world.${worlds.worlds[
			JSON.parse(localStorage.getItem("worldNumber"))
		]?.title}`) ||
		JSON.stringify({spawnpoint: {Y: 0}})
	).spawnpoint.Y * 16 + 16
}

export var PlayerAnimationStyle = "idle";
export var PlayerAnimationDirection = "right";

var maxSpeed = 1;
var speed = 0;

export async function ReloadPlayerMovement(){

	maxSpeed = calculatePlayerSpeed({
		FPS: 30,
		SPEED: 3 //  3 mississippi
	}, {
		FPS: 130,
		SPEED: 1
	});

	if(UI_options.currentMenu !== "") return undefined

	let keyUp = keybinds.movement.up;
	let keyDown = keybinds.movement.down;
	let keyLeft = keybinds.movement.left;
	let keyRight = keybinds.movement.right;

	let ControlKey = keysPressed.includes("Control");

	if( (KeyPressed(keyUp) || KeyPressed(keyDown) || KeyPressed(keyLeft) || KeyPressed(keyRight)) == true && ControlKey == false){

		if((
			( KeyPressed(keyUp) && KeyPressed(keyDown) ) ||
			( KeyPressed(keyLeft) && KeyPressed(keyRight) )
		) == false){
			speed = maxSpeed;
			PlayerAnimationStyle = "walk";
			if(KeyPressed(keyUp)){
				PlayerPositions.Y -= Math.round(speed);
				fixCollisions("up");
			}
			if(KeyPressed(keyDown)){
				PlayerPositions.Y += Math.round(speed);
				fixCollisions("down");
			}
			if(KeyPressed(keyLeft)){
				PlayerPositions.X -= Math.round(speed);
				if(KeyPressed(keyRight) == false){
					PlayerAnimationDirection = "left";
				}
				fixCollisions("left");
			}
			if(KeyPressed(keyRight)){
				PlayerPositions.X += Math.round(speed);
				if(KeyPressed(keyLeft) == false){
					PlayerAnimationDirection = "right";
				}
				fixCollisions("right");
			}
		}else{
			speed = 0;
			PlayerAnimationStyle = "idle";
		}
	}else{
		speed = 0;
		PlayerAnimationStyle = "idle";
	}
}

function calculatePlayerSpeed(SetSpeed1={FPS:0,SPEED:0}, SetSpeed2={FPS:0,SPEED:0}){
	// Calculating speed using
	// y = ( m * x ) + b
	// OR
	// SPEED = ( SLOPE * FPS ) + OFFSET
	// OR
	// SPEED = ( SLOPE * FPS ) + OFFSET

	// Calculate the slope of player speed using the given FPS and speeds
	let SLOPE = (SetSpeed2.SPEED - SetSpeed1.SPEED) / (SetSpeed2.FPS - SetSpeed1.FPS);
	// Calculate the offset of the speed calculations
	let OFFSET = SLOPE * SetSpeed1.FPS - SetSpeed1.SPEED;
	OFFSET *= -1;

	let SPEED = SLOPE * ( FPS - SetSpeed1.FPS ) + SetSpeed1.SPEED;

	return SPEED;
}


export function PlayerMoveByBlock(blockX, blockY){
	PlayerPositions.X += blockX * 16;
	PlayerPositions.Y += blockY * 16;
}
export function PlayerMoveToBlock(blockX, blockY){
	PlayerPositions.X = blockX * 16 + 16/2;
	PlayerPositions.Y = blockY * 16 + 16;
}

function currentStandingBlocks(){
	let world = JSON.parse(localStorage.getItem(`world.One`));

	let blockY = Math.floor( PlayerPositions.Y / 16);
	let blockX = Math.floor( PlayerPositions.X / 16);

	let standingBlocks = [];
	for(let layer = 0; layer < world.world.length; layer ++){

		if(blockY < world.world[layer].length && blockY > -1){
			if(blockX < world.world[layer][blockY].length && blockX > -1){
				standingBlocks[layer] = world.world[layer][blockY][blockX] || "air";
			}else{
				standingBlocks[layer] = "air"
			}
		}else{
			standingBlocks[layer] = "air"
		}
	}

	return(standingBlocks);
}

function foundCollision(layerToCheck=1){

	let standingBlock = currentStandingBlocks()[layerToCheck - 1];

	if(standingBlock == "air") return(false);

	let standingBlockBounds = CashedBlockData[standingBlock].aspects.bounds;

	if(standingBlockBounds == undefined) return(false)


	let innerBlockX = Math.floor(PlayerPositions.X % 16);
	let innerBlockY = Math.floor(PlayerPositions.Y % 16);

	let innerX = Math.floor(innerBlockX / ( 16 / standingBlockBounds.length ));
	let innerY = Math.floor(innerBlockY / ( 16 / standingBlockBounds[0].length ));

	if(standingBlockBounds[innerY][innerX] !== "O"){
		return(true);
	}else{
		return(false);
	}
}

function fixCollisions(direction=""){

	direction = direction.toLowerCase();

	while(
		// foundCollision(1) ||
		foundCollision(2) ||
		foundCollision(3)
	){
		if(direction == "up"){
			PlayerPositions.Y += 1;
		}else if(direction == "down"){
			PlayerPositions.Y -= 1;
		}else if(direction == "left"){
			PlayerPositions.X += 1;
		}else if(direction == "right"){
			PlayerPositions.X -= 1;
		}else{
			console.error("The function (fixCollisions) requires the parameter \"direction\" to be UP DOWN LEFT or RIGHzT")
		}
	}
}