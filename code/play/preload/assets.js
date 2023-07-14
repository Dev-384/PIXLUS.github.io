import blockList from "../../assets/blocks/blocks.json" assert {type: "json"};
import playerList from "../../assets/player/controller.json" assert {type: "json"};

import loadFonts from "./assets/fonts/index.js";

const blocks = blockList.blocks;
const player = playerList.player.animations;


export default function loadAssets(){
	let assetDIV = document.createElement("div");
	assetDIV.setAttribute("style", "display:none;");
	assetDIV.setAttribute("id", "assets");
	document.body.appendChild(assetDIV);

	load_Blocks(assetDIV);

	loadFonts(assetDIV);

	load_Player(assetDIV);

	load_block_selection(assetDIV);
}

function load_block_selection(assetDIV=HTMLDivElement){
	// code/assets/UI/images/block_selection.png
	let asset = document.createElement("img");
	asset.src = "../../code/assets/UI/images/block_selection.png";
	assetDIV.appendChild(asset);
}

function load_Blocks(assetDIV=HTMLDivElement){

	let blockAssets = document.createElement("div");
	blockAssets.setAttribute("id", "blocks");
	assetDIV.appendChild(blockAssets);

	for(let i = 0; i < Object.keys(blocks).length; i++){

		let imageData = blocks[Object.keys(blocks)[i]].img;

		if(typeof imageData.source == "string"){
			let imageElement = document.createElement("img");
			imageElement.setAttribute("src", `../../code/assets/blocks/images/${imageData.source}`);
			blockAssets.appendChild(imageElement);
		}else{
			for(let frame = 0; frame < imageData.source.length; frame++){
				let imageElement = document.createElement("img");
				imageElement.setAttribute("src", `../../code/assets/blocks/images/${imageData.source[frame]}`);
				blockAssets.appendChild(imageElement);
			}
		}

	}

}

function load_Player(assetDIV=HTMLDivElement){

	let playerAssetDiv = document.createElement("div");
	playerAssetDiv.setAttribute("id", "player");
	assetDIV.appendChild(playerAssetDiv);

	load_idle();
	load_walk();
	load_run();

	function load_idle(){

		let idleAssets = player.idle;
		
		let idleLeft = idleAssets.left;
		let idleRight = idleAssets.right;

		for(let i = 0; i < idleLeft.length; i++){
			let imageData = idleLeft[Object.keys(idleLeft)[i]];

			let imageElement = document.createElement("img");
			imageElement.setAttribute("src", `../../code/assets/player/images/${imageData}`);
			playerAssetDiv.appendChild(imageElement);
	
		}
		for(let i = 0; i < idleRight.length; i++){
			let imageData = idleRight[Object.keys(idleRight)[i]];

			let imageElement = document.createElement("img");
			imageElement.setAttribute("src", `../../code/assets/player/images/${imageData}`);
			playerAssetDiv.appendChild(imageElement);
	
		}
	}
	function load_walk(){

		let walkAssets = player.walk;
		
		let walkLeft = walkAssets.left;
		let walkRight = walkAssets.right;

		for(let i = 0; i < walkLeft.length; i++){
			let imageData = walkLeft[Object.keys(walkLeft)[i]];

			let imageElement = document.createElement("img");
			imageElement.setAttribute("src", `../../code/assets/player/images/${imageData}`);
			playerAssetDiv.appendChild(imageElement);
	
		}
		for(let i = 0; i < walkRight.length; i++){
			let imageData = walkRight[Object.keys(walkRight)[i]];

			let imageElement = document.createElement("img");
			imageElement.setAttribute("src", `../../code/assets/player/images/${imageData}`);
			playerAssetDiv.appendChild(imageElement);
	
		}
	}
	function load_run(){

		let runAssets = player.run;
		
		let runLeft = runAssets.left;
		let runRight = runAssets.right;

		for(let i = 0; i < runLeft.length; i++){
			let imageData = runLeft[Object.keys(runLeft)[i]];

			let imageElement = document.createElement("img");
			imageElement.setAttribute("src", `../../code/assets/player/images/${imageData}`);
			playerAssetDiv.appendChild(imageElement);
	
		}
		for(let i = 0; i < runRight.length; i++){
			let imageData = runRight[Object.keys(runRight)[i]];

			let imageElement = document.createElement("img");
			imageElement.setAttribute("src", `../../code/assets/player/images/${imageData}`);
			playerAssetDiv.appendChild(imageElement);
	
		}
	}
}