import { Menu } from "../../MenuCreator/menu.js";
import { Background, Image, Button, Rect } from "../../MenuCreator/elements.js";
import assets from "../../assets.json" assert {type: "json"};
import getFrame from "../../play/behind/animations.js"
import { UI_options, innerScreen } from "../../play/main.js";
var assetDir = assets.texture_pack.path;

const {default: texturePack} = await import(`../../${assetDir}/blocks/blocks.json`, {
	assert: {
		type: "json"
	}
});

var selectedBlockType = "air";

const tabs = await blockTabs(innerScreen.width / 2, innerScreen.height / 2);

export default async function(){
	let menu = new Menu;

	let background = new Background;
	background.setSource(`./code/${assetDir}/blocks/images/Tiles/dirt.png`);
	background.setTileSize(32, 32);
	menu.addElement(background);
	
	let backdrop = new Rect;

	let backdropWidth = innerScreen.width / 4 * 3;
	let backdropHeight = innerScreen.height / 4 * 3;
	let backdropPosX = innerScreen.width / 2 - backdropWidth / 2;
	let backdropPosY = 36;

	backdrop.setSize(
		backdropWidth,
		backdropHeight
	);
	backdrop.moveTo(backdropPosX, backdropPosY);

	backdrop.setFill("#333333");
	menu.addElement(backdrop);

	let tabsPosX = innerScreen.width / 2 - tabs.width / 2;
	tabsPosX = Math.floor(tabsPosX);

	let tabsPosY = 36 - tabs.height + 1;
	tabsPosY = Math.floor(tabsPosY);
	tabs.element.shift(tabsPosX, tabsPosY);
	menu.addElement(tabs.element);

	let blocks = await makeBlocks(selectedBlockType, backdropWidth / (16 * 1.75));
	blocks.shift(backdropPosX + 10, backdropPosY + 10);

	menu.addElement(blocks);

	return(menu);
}

async function blockTabs(){

	let menu = new Menu;

	let numberOfBlockTypes = Object.keys(texturePack.types).length;
	let scale = 16 * 1.25;

	let rect = new Rect;
	rect.setSize( numberOfBlockTypes * scale - 2, 16 / 4 );
	rect.moveTo(-1, 16 - (16 / 4) + 1);
	rect.setFill("#333333");

	menu.addElement(rect);

	for(let i = 0; i < numberOfBlockTypes; i++){
		let currentBlockTypeName = Object.keys(texturePack.types)[i];
		let {default: blockData} = await import(`../../${assetDir}/blocks/${texturePack.types[currentBlockTypeName]}`, {
			assert: {
				type: "json"
			}
		});
		let currentBlockType = blockData.block[""];
	
		let itemImage = new Image;
		itemImage.setSource(
			`./code/${assetDir}/blocks/images/${getFrame(currentBlockType.img.source)}`,

			currentBlockType.img?.tileCoords?.X || 0,
			currentBlockType.img?.tileCoords.Y || 0,
			
			currentBlockType.img.width,
			currentBlockType.img.height
		);

		let tabX = scale * i;
		tabX = Math.floor(tabX);

		itemImage.setSize(16, 16);
		itemImage.moveTo(tabX, 0);

		let itemButton = new Button;
		itemButton.setClickEvent(() => {
			selectedBlockType = currentBlockTypeName;
		});
		itemButton.setSize(16, 16);
		itemButton.moveTo(tabX, 0);
		itemButton.style.outlineSize = 1;
		itemButton.style.insetSize = 0;

		menu.addElement(itemButton);
		menu.addElement(itemImage);
	}

	return({
		element: menu,
		width: numberOfBlockTypes * scale - 4,
		height: 18
	});
}

async function makeBlocks(blocktype="", maxNumberOfBlocksX=1){
	maxNumberOfBlocksX = Math.floor(maxNumberOfBlocksX);
	let menu = new Menu;

	if(blocktype in texturePack.types == false) return(menu);

	let {default: blockData} = await import(`../../${assetDir}/blocks/${texturePack.types[blocktype]}`, {
		assert: {
			type: "json"
		}
	});

	let blockVariants = blockData.block;
	let blockVariantNames = Object.keys(blockVariants);
	for(let i = 0; i < blockVariantNames.length; i++){
		let currentBlockVariant = blockVariants[blockVariantNames[i]];

		let blockX = (i % maxNumberOfBlocksX) * 16 * 1.75;
		let blockY = Math.floor( i / maxNumberOfBlocksX ) * 16 * 1.75;

		let itemVariantImage = new Image;
		itemVariantImage.setSource(
			`./code/${assetDir}/blocks/images/${getFrame(currentBlockVariant.img.source)}`,


			currentBlockVariant.img?.tileCoords?.X,
			currentBlockVariant.img?.tileCoords?.Y,
			
			currentBlockVariant.img.width,
			currentBlockVariant.img.height,
		);
		itemVariantImage.setSize(16, 16);
		itemVariantImage.moveTo(blockX, blockY);

		let itemVariantButton = new Button;
		itemVariantButton.setEvent("click", () => {
			localStorage.setItem("currentBlock", blocktype+":"+blockVariantNames[i]);
			UI_options.currentMenu = "";
		});
		itemVariantButton.setSize(16, 16);
		itemVariantButton.moveTo(blockX, blockY);
		itemVariantButton.style.outlineColour = "black";
		itemVariantButton.style.outlineSize = 1;
		itemVariantButton.style.insetSize = 0;

		menu.addElement(itemVariantButton);
		menu.addElement(itemVariantImage);

	}
	return(menu);
}