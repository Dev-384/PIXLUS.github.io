import { MousePositions } from "../behind/keyboard.js";
import { PlayerPositions } from "../player/movement.js";
import { currentEditingLayer } from "../behind/world_editor.js";
import worlds from "../../worlds/index.json" assert {type: "json"};

import { innerScreen } from "../main.js";

export var selectedBlockX;
export var selectedBlockY;
export var selectedBlock = {
	position: {
		X: 0,
		Y: 0
	},
	block: ""
};

export async function blockSelecter(worldNumber=0){

	let selectedBlockX = Math.floor(
		(
			(MousePositions.X + (PlayerPositions.X ) - innerScreen.width / 2)
		) / (16 )
	);

	let selectedBlockY = Math.floor(
		(
			(MousePositions.Y + (PlayerPositions.Y ) - innerScreen.height / 2)
		) / (16 )
	);
	let currentWorld = localStorage.getItem(`world.${worlds.worlds[worldNumber].title}`);
	currentWorld = JSON.parse(currentWorld);
	currentWorld = currentWorld.world;

	selectedBlock.position.X = selectedBlockX;
	selectedBlock.position.Y = selectedBlockY;

	let WorldCurrentLayer = currentWorld[currentEditingLayer-1]
	if(selectedBlockY > -1 && selectedBlockX > -1){
		if(selectedBlockY < WorldCurrentLayer.length){
			if(selectedBlockX < WorldCurrentLayer[selectedBlockY].length){
				selectedBlock.block = WorldCurrentLayer[selectedBlockY][selectedBlockX];
			}else{
				selectedBlock.block = "air";
			}
		}else{
			selectedBlock.block = "air";
		}
	}else{
		selectedBlock.block = "air";
	}

	let imagePositionX = (selectedBlockX * 16 ) - (PlayerPositions.X ) + innerScreen.width / 2;
	let imagePositionY = (selectedBlockY * 16 ) - (PlayerPositions.Y ) + innerScreen.height / 2;

	return({
		X: imagePositionX,
		Y: imagePositionY
	});
}