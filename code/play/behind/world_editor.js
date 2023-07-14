import { selectedBlock } from "../ui/block_selection.js";
import worlds from "../../worlds/index.json" assert {type: "json"};
import { worldNumber } from "../main.js"
import { PlayerMoveByBlock } from "../player/movement.js";
export var currentEditingLayer = 2;

export async function PlaceBlock(blockData="grass_block"){

	let positionX = selectedBlock.position.X;
	let positionY = selectedBlock.position.Y;

	let worldData = localStorage.getItem(`world.${worlds.worlds[worldNumber]}`);
	worldData = JSON.parse(worldData);

	if(positionY >= 0){
		if(positionY > worldData.default.world[currentEditingLayer-1].length - 1){
			while(positionY > worldData.default.world[currentEditingLayer-1].length - 1){
				worldData.default.world[currentEditingLayer-1].push(["air"]);
			}
		}
	}else{
		let unchangedPositionY = JSON.parse(JSON.stringify(positionY));
		while(positionY < 0){
			for (let layer = 0; layer < worldData.default.world.length; layer++) {
				worldData.default.world[layer].unshift(["air"]);
			}
			positionY += 1
		}
		positionY = 0;

		PlayerMoveByBlock(0, Math.abs(unchangedPositionY));

		worldData.default.spawnpoint.Y += Math.abs(unchangedPositionY);
	}

	if(positionX >= 0){
		if(positionX > worldData.default.world[currentEditingLayer-1][positionY].length - 1){
			while(positionX > worldData.default.world[currentEditingLayer-1][positionY].length - 1){
				worldData.default.world[currentEditingLayer-1][positionY].push("air");
			}
		}
	}else{
		let unchangedPositionX = JSON.parse(JSON.stringify(positionX));
		while(positionX < 0){
			for (let layer = 0; layer < worldData.default.world.length; layer++) {
				for(let layerX = 0; layerX < worldData.default.world[layer].length; layerX++){
					worldData.default.world[layer][layerX].unshift("air");
				}
			}
			positionX += 1
		}
		positionX = 0;

		PlayerMoveByBlock(Math.abs(unchangedPositionX), 0);

		worldData.default.spawnpoint.X += Math.abs(unchangedPositionX);
	}

	let newBlockData = {
		position: {
			X: positionX,
			Y: positionY,
		},
		blockData: {
			new: blockData,
			old: worldData.default.world[currentEditingLayer-1][positionY][positionX]/* [positionY][positionX] */,
		}
	};
	worldData.default.world[currentEditingLayer-1][positionY][positionX] = blockData;

	localStorage.setItem(`world.${worlds.worlds[worldNumber]}`, JSON.stringify(worldData));
}