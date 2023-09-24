import { innerScreen, UI_options } from "./main.js";

import renderPlayer from "./player/render.js";
import { PlayerPositions } from "./player/movement.js";

import { image } from "./preload/assets.js";
import blocks from "../assets/blocks/blocks.json" assert {type: "json"};
import block_actions from "../../options/block_actions.js";
const blockActionRunner = new block_actions;

import worlds from "../worlds/index.json" assert {type: "json"};
import { blockSelecter } from "./ui/block_selection.js";
import getFrame from "./behind/animations.js";
import { KeyPressed, keybinds } from "./behind/keyboard.js";
import renderMenu from "../MenuCreator/render.js";

export var CashedBlockData = {};

var blockActionIndicator = false;

var {default: texturePackData} = await import(`../assets.json`, {
	assert: {
		type: "json",
	}
});

var {default: texturePack} = await import(`../../../code/${texturePackData.texture_pack.path}/UI/ui.json`, {
	assert: {
		type: "json",
	}
});

export default async function render(){
	let context = innerScreen.getContext("2d");
	context.imageSmoothingEnabled = false;

	let currentWorld = localStorage.getItem(`world.${worlds.worlds[JSON.parse(localStorage.getItem("worldNumber"))].title}`);
	currentWorld = JSON.parse(currentWorld);
	currentWorld = currentWorld.world;

	context.fillStyle = "#7a8ba1";
	context.fillRect(0, 0, innerScreen.width, innerScreen.height);

	if(UI_options.currentMenu == ""){
		blockActionIndicator = false;
		await renderLayer(currentWorld, 0);
		await renderLayer(currentWorld, 1);
		await renderLayer(currentWorld, 2);
		renderPlayer(false);
		await renderLayer(currentWorld, 3);
		renderPlayer({
			alpha: 0.25,
			brightness: 1
		});
		await blockSelecter(innerScreen, JSON.parse(localStorage.getItem("worldNumber")));

		if(blockActionIndicator == true){
			let actionIndicator = texturePack.UI.indicators.blocks.action;

			await image(
				`../../code/${texturePackData.texture_pack.path}/UI/images/${getFrame(actionIndicator.source)}`,

				(innerScreen.width / 2) - (actionIndicator.width / 2),
				(innerScreen.height / 2) - (16*1.5) - (actionIndicator.height / 2),

				actionIndicator.width,
				actionIndicator.height,
				
				innerScreen
			);
		}
	}else{
		await renderMenu(UI_options.currentMenu);
	}
}

async function renderLayer(currentWorld=0, worldLayerNumber=0){

	let yMax = currentWorld[worldLayerNumber].length;
	for(let y = 0; y < yMax; y++){

		let xMax = currentWorld[worldLayerNumber][y].length;
		for(let x = 0; x < xMax; x++){

			let blockPositionX = (x * 16 ) - (PlayerPositions.X ) + innerScreen.width / 2;
			let blockPositionY = (y * 16 ) - (PlayerPositions.Y ) + innerScreen.height / 2;

			if(blockPositionX > -16 && blockPositionX < innerScreen.width + 16){

				if(blockPositionY >  -16  && blockPositionY < innerScreen.height + 16){

					let currentBlock = currentWorld[worldLayerNumber][y][x];

					if(currentBlock == "air" || currentBlock == "") continue;

					if((currentBlock in CashedBlockData) == false){
						let currentBlockName = currentBlock.split(":")[0];
						let currentBlockType = currentBlock.split(":")[1] || "";

						if((currentBlockName in blocks.types) == false) continue;

						let {default: texturePack} = await import(`../assets.json`, {
							assert: {
								type: "json",
							}
						});

						let {default: currentBlockTypeData} = await import(`../../code/${texturePack.texture_pack.path}/blocks/${blocks.types[currentBlockName]}`, {
							assert: {
								type: "json",
							}
						});

						if(currentBlockType in currentBlockTypeData.block){
							currentBlockTypeData = currentBlockTypeData.block[currentBlockType];
						}else{
							currentBlockTypeData = currentBlockTypeData.block[""];
						}

						CashedBlockData[currentBlock] = currentBlockTypeData;
					}

					let CachedCurrentBlock = CashedBlockData[currentBlock];

					if(
						worldLayerNumber == 2 &&
						CachedCurrentBlock?.aspects?.standing?.img !== undefined &&
						Math.floor( (PlayerPositions.X) / 16) == x &&
						Math.floor( (PlayerPositions.Y-2) / 16) == y
					){
						let currentBlockAnimationFrame = getFrame(CachedCurrentBlock.aspects.standing.img.source);

						let currentBlockAnimationFrameNumber = 0;

						if(Array.isArray(CachedCurrentBlock.aspects.standing.img.source)){
							let arrayOfNumberedFrames = [];
							for(let i = 0; i < CachedCurrentBlock.aspects.standing.img.source.length; i++){
								arrayOfNumberedFrames.push(i);
							}
							currentBlockAnimationFrameNumber = getFrame(arrayOfNumberedFrames);
						}

						await image(
							`../../code/assets/blocks/images/${currentBlockAnimationFrame}`,

							blockPositionX,
							blockPositionY,

							16, 16,

							CachedCurrentBlock.img?.tileCoords?.X + (currentBlockAnimationFrameNumber) * CachedCurrentBlock.img?.width,
							CachedCurrentBlock.img?.tileCoords?.X,

							CachedCurrentBlock.img?.width,
							CachedCurrentBlock.img?.height,
						);
					}else{
						let currentBlockAnimationFrame = getFrame(CachedCurrentBlock.img.source);

						let currentBlockAnimationFrameNumber = 0;

						if(Array.isArray(CachedCurrentBlock.img.source)){
							let arrayOfNumberedFrames = [];
							for(let i = 0; i < CachedCurrentBlock.img.source.length; i++){
								arrayOfNumberedFrames.push(i);
							}
							currentBlockAnimationFrameNumber = getFrame(arrayOfNumberedFrames);
						}

						await image(
							`../../code/assets/blocks/images/${currentBlockAnimationFrame}`,

							blockPositionX,
							blockPositionY,

							16, 16,

							CachedCurrentBlock.img?.tileCoords?.X + (currentBlockAnimationFrameNumber) * CachedCurrentBlock.img?.width,
							CachedCurrentBlock.img?.tileCoords?.Y,

							CachedCurrentBlock.img?.width,
							CachedCurrentBlock.img?.height,
						);
					}
					if(
						CachedCurrentBlock.aspects?.action !== undefined &&
						Math.floor( (PlayerPositions.X) / 16) == x &&
						Math.floor( (PlayerPositions.Y-2) / 16) == y
					){
						blockActionIndicator = true

						if(KeyPressed(keybinds.action)){
							let blockFunction = blockActionRunner.interpert(
								CachedCurrentBlock.aspects.action
							);
							blockFunction.run();
						}
					}
					// Finnished drawing block that is onscreen
				}
			}
			// Finnished cycling through all blocks in world
		}
		// Finnished cycling through current length of blocks in position Y
	}
	// Finnished cycling through all blocks in world
}