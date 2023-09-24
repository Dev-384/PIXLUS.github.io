import {default as Menu, Elements} from "../../MenuCreator/menu.js";

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
		
			// const itemButton = new ElementsButton;
			// itemButton.moveTo((16*i) * 1.5, 16 * 1.5);
			// itemButton.setSize(16 * 1.5, 16 * 1.5);
			// itemButton.setOutlineSize(16 / 16);
			// itemButton.setClickEvent( function(){
			// 	console.log(currentBlockType);
			// } );
			// menu.addElement(itemButton);
		
			let itemImage = new ElementsImage;
			itemImage.setSource(`./code/${assetDir}/blocks/images/${getFrame(itemImageData.source)}`);
			itemImage.setSize(16, 16);
			itemImage.moveTo((16*i) * 1.75, 16 * 1.75);
	
			let itemButton = new ElementsButton;
			itemButton.setClickEvent(() => {
				selectedBlockType = currentBlockType;
			});
			itemButton.setSize(16, 16);
			itemButton.moveTo((16*i) * 1.75, 16 * 1.75);
			itemButton.style.outlineSize = 0;
		
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

			let itemVariantImage = new ElementsImage;
			itemVariantImage.setSource(`./code/${assetDir}/blocks/images/${getFrame(currentBlockVariant.img.source)}`);
			itemVariantImage.setSize(16, 16);
			itemVariantImage.moveTo((16*i) * 1.75, 16 * 1.75);

			let itemVariantButton = new ElementsButton;
			itemVariantButton.setEvent("click", () => {
				selectedBlockType = "";
				UI_options.currentMenu = "";
				console.log(currentBlockVariant);
			});
			itemVariantButton.setSize(16, 16);
			itemVariantButton.moveTo((16*i) * 1.75, 16 * 1.75);
			itemVariantButton.style.outlineSize = 0;

			menu.addElement(itemVariantButton);
			menu.addElement(itemVariantImage);

		}
	}

	return(menu);
}