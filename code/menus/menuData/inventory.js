import {Menu, Elements} from "../../MenuCreator/menu.js";
import assets from "../../assets.json" assert {type: "json"};
import getFrame from "../../play/behind/animations.js"
import { UI_options } from "../../play/main.js";
var assetDir = assets.texture_pack.path;

// const texturePack = await import(`../../${assets}/blocks/blocks.json`);

const {default: texturePack} = await import(`../../${assetDir}/blocks/blocks.json`, {
	assert: {
		type: "json"
	}
});

var selectedBlockType = "";

export default async function(){
	let menu = new Menu;

	let background = new Elements.Background;
	background.setSource(`./code/${assetDir}/blocks/images/Grass/Center/center.png`);
	background.setTileSize(32, 32);
	menu.addElement(background);

	if(selectedBlockType == ""){
		let numberOfBlockTypes = Object.keys(texturePack.types).length;

		for(let i = 0; i < numberOfBlockTypes; i++){
			let currentBlockType = Object.keys(texturePack.types)[i];
			let {default: blockData} = await import(`../../${assetDir}/blocks/${texturePack.types[currentBlockType]}`, {
				assert: {
					type: "json"
				}
			});
			let itemImageData = blockData.block[""].img;
		
			// const itemButton = new Elements.Button;
			// itemButton.moveTo((16*i) * 1.5, 16 * 1.5);
			// itemButton.setSize(16 * 1.5, 16 * 1.5);
			// itemButton.setOutlineSize(16 / 16);
			// itemButton.setClickEvent( function(){
			// 	console.log(currentBlockType);
			// } );
			// menu.addElement(itemButton);
		
			let itemImage = new Elements.Image;
			itemImage.setSource(`./code/${assetDir}/blocks/images/${getFrame(itemImageData.source)}`);
			itemImage.setSize(16, 16);
			itemImage.moveTo((16*i) * 1.75, 16 * 1.75);
	
			let itemButton = new Elements.Button;
			itemButton.setClickEvent(() => {
				selectedBlockType = currentBlockType;
			});
			itemButton.setSize(16, 16);
			itemButton.moveTo((16*i) * 1.75, 16 * 1.75);
			itemButton.style.outlineSize = 1;
			itemButton.style.insetSize = 0;
		
			menu.addElement(itemButton);
			menu.addElement(itemImage);
		}
	}else {
		let {default: blockData} = await import(`../../${assetDir}/blocks/${texturePack.types[selectedBlockType]}`, {
			assert: {
				type: "json"
			}
		});

		let blockVariants = blockData.block;
		let blockVariantNames = Object.keys(blockVariants);
		for(let i = 0; i < blockVariantNames.length; i++){
			let currentBlockVariant = blockVariants[blockVariantNames[i]];

			let itemVariantImage = new Elements.Image;
			itemVariantImage.setSource(
				`./code/${assetDir}/blocks/images/${getFrame(currentBlockVariant.img.source)}`,


				currentBlockVariant.img.tileCoords.X,
				currentBlockVariant.img.tileCoords.Y,

				currentBlockVariant.img.width,
				currentBlockVariant.img.height,
			);
			itemVariantImage.setSize(16, 16);
			itemVariantImage.moveTo((16*i) * 1.75, 16 * 1.75);

			let itemVariantButton = new Elements.Button;
			itemVariantButton.setEvent("click", () => {
				console.log(selectedBlockType, blockVariantNames[i]);

				localStorage.setItem("currentBlock", selectedBlockType+":"+blockVariantNames[i]);
				selectedBlockType = "";
				UI_options.currentMenu = "";
			});
			itemVariantButton.setSize(16, 16);
			itemVariantButton.moveTo((16*i) * 1.75, 16 * 1.75);
			itemVariantButton.style.outlineSize = 1;
			itemVariantButton.style.insetSize = 0;

			menu.addElement(itemVariantButton);
			menu.addElement(itemVariantImage);

		}
	}

	return(menu);
}