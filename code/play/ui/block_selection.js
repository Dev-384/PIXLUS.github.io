import { MousePositions } from "../behind/keyboard.js";
import UI from "../../assets/UI/ui.json" assert {type: "json"}
import { PlayerPositions } from "../player/movement.js";
import { text, icon } from "./fonts.js";
import { currentEditingLayer } from "../behind/world_editor.js";
import { currentScale } from "../main.js";
import worlds from "../../worlds/index.json" assert {type: "json"};

import pixlus_package from "../../../package.json" assert {type: "json"};

const ui = UI.UI;

var blockScale = 1;
export var selectedBlockX;
export var selectedBlockY;
export var selectedBlock = {
	position: {
		X: 0,
		Y: 0
	},
	block: ""
};

export async function blockSelecter(canvas=HTMLCanvasElement, worldNumber=0){

	let selectedBlockX = Math.floor(
		(
			(MousePositions.X + (PlayerPositions.X * currentScale) - canvas.width / 2)
		) / (16 * currentScale)
	);

	let selectedBlockY = Math.floor(
		(
			(MousePositions.Y + (PlayerPositions.Y * currentScale) - canvas.height / 2)
		) / (16 * currentScale)
	);
	let currentWorld = localStorage.getItem(`world.${worlds.worlds[worldNumber]}`);
	currentWorld = JSON.parse(currentWorld);
	currentWorld = currentWorld.default.world;

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

	let imagePositionX = (selectedBlockX * 16 * currentScale) - (PlayerPositions.X * currentScale) + canvas.width / 2;
	let imagePositionY = (selectedBlockY * 16 * currentScale) - (PlayerPositions.Y * currentScale) + canvas.height / 2;

	image(
		ui.blockSelection.img.source,

		imagePositionX,
		imagePositionY,

		16 * currentScale,
		16 * currentScale,

		canvas
	);

	let numberScale = 16 * currentScale;
	text(`${pixlus_package.name}\nV${pixlus_package.version}`, 0, 0, numberScale, canvas);
}

function image(img="",x=0,y=0,width=0,height=0, canvas){
	let context = canvas.getContext("2d");
	let myImage = document.createElement('img');
	context.globalAlpha = 1;
	context.shadowBlur = 20;
	myImage.src = `../../code/assets/UI/images/${img}`;
	context.drawImage(myImage, x, y, width,height);
	context.stroke();
	myImage.remove();
}