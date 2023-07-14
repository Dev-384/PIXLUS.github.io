import { StartKeyboardTracker, keysPressed } from "../behind/keyboard.js";
import options from "../../options/keybinds.json" assert {type: "json"};
import worlds from "../../worlds/index.json" assert {type: "json"};
import blocks from "../../assets/blocks/blocks.json" assert {type: "json"};
import { worldNumber } from "../main.js";

export var PlayerPositions = {
	X: JSON.parse(localStorage.getItem(`world.${worlds.worlds[worldNumber || 0]}`)).default.spawnpoint.X * 16 + 16/2,
	Y: JSON.parse(localStorage.getItem(`world.${worlds.worlds[worldNumber || 0]}`)).default.spawnpoint.Y * 16 + 16
}

export var PlayerAnimationStyle = "walk";
export var PlayerAnimationDirection = "right";

var speed = 0;

function ReloadPlayerMovement(scale=1, canvas=HTMLCanvasElement){
	let keybinds = options.keybinds;

	StartKeyboardTracker();

	let keyUp = keysPressed.includes(keybinds.movement.up);
	let keyDown = keysPressed.includes(keybinds.movement.down);
	let keyLeft = keysPressed.includes(keybinds.movement.left);
	let keyRight = keysPressed.includes(keybinds.movement.right);

	let ControlKey = keysPressed.includes("Control");

	if( (keyUp || keyDown || keyLeft || keyRight) == true && ControlKey == false){
		updateSpeed();
		PlayerAnimationStyle = "walk";
		if(keyUp){
			PlayerPositions.Y -= Math.round(speed);
			fixCollisions("up");
		}
		if(keyDown){
			PlayerPositions.Y += Math.round(speed);
			fixCollisions("down");
		}
		if(keyLeft){
			PlayerPositions.X -= Math.round(speed);
			PlayerAnimationDirection = "left";
			fixCollisions("left");
		}
		if(keyRight){
			PlayerPositions.X += Math.round(speed);
			PlayerAnimationDirection = "right";
			fixCollisions("right");
		}
	}else{
		speed = 0;
		PlayerAnimationStyle = "idle";
	}
}

setInterval(ReloadPlayerMovement, 100);

function updateSpeed(){
	let maxSpeed = 4;
	if(speed < maxSpeed){
		speed += (Math.round(speed) || 0.4) * 1.5;
	}else{
		speed = maxSpeed;
	}
}

export function PlayerMoveByBlock(blockX, blockY){
	PlayerPositions.X += blockX * 16;
	PlayerPositions.Y += blockY * 16;
}

function currentStandingBlocks(){
	let world = JSON.parse(localStorage.getItem(`world.${worlds.worlds[worldNumber || 0]}`)).default;

	let blockY = Math.floor(PlayerPositions.Y / 16);
	let blockX = Math.floor(PlayerPositions.X / 16);

	let standingBlocks = [];
	let numOfLayers = 4;
	for(let layer = 0; layer < numOfLayers - 1; layer ++){

		if(blockY < world.world[layer].length){
			if(blockX < world.world[layer][blockY].length){
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

function findCollisions(direction=""){
	direction = direction.toLowerCase();

	let layerToCheck = 2;
	let standingBlock = currentStandingBlocks()[layerToCheck - 1];

	let blockBoundaries = blocks.blocks[standingBlock].aspects.bounds;
	/**
	 * 0 0 X
	 * 0 0 X
	 * 0 0 X
	 * 
	 * * X = SOLID
	 * * 0 = PASSABLE
	*/

	let PlayerPositionInsideBlock = {
		X: Math.floor((PlayerPositions.X % 16) / 5),
		Y: Math.floor((PlayerPositions.Y % 16) / 5)
	}
	let collision = blockBoundaries[PlayerPositionInsideBlock.Y || 0][PlayerPositionInsideBlock.X || 0]

	if(collision == "X"){
		return(true);
	}else{
		return(false)
	}
}

function foundCollision(layerToCheck=2){
	let standingBlock = currentStandingBlocks()[layerToCheck - 1];

	let blockBoundaries = blocks.blocks[standingBlock].aspects.bounds;
	/**
	 * 0 0 X
	 * 0 0 X
	 * 0 0 X
	 * 
	 * * X = SOLID
	 * * 0 = PASSABLE
	*/

	let PlayerPositionInsideBlock = {
		X: Math.floor((PlayerPositions.X % 16) / 5),
		Y: Math.floor((PlayerPositions.Y % 16) / 5)
	}
	let collision = blockBoundaries[PlayerPositionInsideBlock.Y || 0][PlayerPositionInsideBlock.X || 0]

	if(collision == "X"){
		return(true);
	}else{
		return(false);
	}
}

function fixCollisions(direction=""){

	if(foundCollision(1) || foundCollision(2) || foundCollision(3)){
		if(direction == "up"){
			PlayerPositions.Y += Math.round(speed);
		}else if(direction == "down"){
			PlayerPositions.Y -= Math.round(speed);
		}else if(direction == "left"){
			PlayerPositions.X += Math.round(speed);
		}else if(direction == "right"){
			PlayerPositions.X -= Math.round(speed);
		}
	}
}