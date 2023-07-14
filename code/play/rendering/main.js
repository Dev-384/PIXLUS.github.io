import { currentScale, worldNumber, UI_options } from "../main.js";

import renderPlayer from "../player/render.js";

import blocks from "../../assets/blocks/blocks.json" assert {type: "json"};
import worlds from "../../worlds/index.json" assert {type: "json"};
import { PlayerPositions } from "../player/movement.js";
import { blockSelecter } from "../ui/block_selection.js";
import RenderMenu from "./UI.js";
import getFrame from "../behind/animations.js";

export default async function render(canvas=HTMLCanvasElement){
	let context = canvas.getContext("2d");
	context.imageSmoothingEnabled = false;

	let currentWorld = localStorage.getItem(`world.${worlds.worlds[worldNumber]}`);
	currentWorld = JSON.parse(currentWorld);
	currentWorld = currentWorld.default.world;

	context.fillStyle = "#7a8ba1";
	context.fillRect(0, 0, canvas.width, canvas.height);

	renderLayer(currentWorld, 0, canvas, currentScale);
	renderLayer(currentWorld, 1, canvas, currentScale);
	renderLayer(currentWorld, 2, canvas, currentScale);
	renderPlayer(canvas);
	renderLayer(currentWorld, 3, canvas, currentScale);

	blockSelecter(canvas, worldNumber);

	RenderMenu();
}

async function renderLayer(currentWorld=0, worldLayerNumber=0, canvas=HTMLCanvasElement, currentScale=0){

	let blockList = blocks.blocks;

	for(let y = 0; y < currentWorld[worldLayerNumber].length; y++){

		for(let x = 0; x < currentWorld[worldLayerNumber][y].length; x++){

			let currentBlock = currentWorld[worldLayerNumber][y][x];
			currentBlock = blockList[currentBlock];

			let blockPositionX = (x * 16 * currentScale) - (PlayerPositions.X * currentScale) + canvas.width / 2;
			let blockPositionY = (y * 16 * currentScale) - (PlayerPositions.Y * currentScale) + canvas.height / 2;

			if(blockPositionX > -16 * currentScale && blockPositionX < canvas.width){
				// alert(JSON.stringify(currentBlock, null, 5));
				if(blockPositionY >  -16 * currentScale && blockPositionY < canvas.height){
					if(currentBlock.aspects.isAnimated !== true && typeof currentBlock.img.source == "string"){
						image(
							`blocks/images/${currentBlock.img.source}`,
			
							blockPositionX,
							blockPositionY,
			
							16 * currentScale,
							16 * currentScale,
							
							canvas
						);
					}else{
						image(
							`blocks/images/${getFrame(currentBlock.img.source)}`,
			
							blockPositionX,
							blockPositionY,
			
							16 * currentScale,
							16 * currentScale,
							
							canvas
						);
					}
				}
			}
		}
	}
}

async function image(img="", x=0, y=0, width=0, height=0, canvas){
	let context = canvas.getContext("2d");
	let myImage = document.createElement('img');
	myImage.src = `../../code/assets/${img}`;
	context.drawImage(myImage, x/*  - width/2 */, y/*  - height / 2 */, width,height);
	myImage.remove();
}