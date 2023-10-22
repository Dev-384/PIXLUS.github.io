import { Menu } from "../MenuCreator/menu.js";
import { Image, Text } from "../MenuCreator/elements.js";

import { blockSelecter } from "../play/ui/block_selection.js";
import UI from "../assets/UI/ui.json" assert {type: "json"};
import { UI_options, adverageFPS } from "../play/main.js";

const menu = new Menu;


let blockSelecterImage = new Image;
blockSelecterImage.setSource(`../../code/assets/UI/images/${UI.UI.blockSelection.img.source}`);
blockSelecterImage.setSize(16, 16);
blockSelecterImage.moveTo(0, 0);

menu.addElement(blockSelecterImage);

let text = new Text;

text.setContent(`FPS: NULL`);
text.moveTo(0, -4);

menu.addElement(text);

export default async function(){
	let blockSelecterData = await blockSelecter(JSON.parse(localStorage.getItem("worldNumber")));
	blockSelecterImage.moveTo(
		Math.floor(blockSelecterData.X),
		Math.floor(blockSelecterData.Y)
	);

	if(UI_options.currentMenu == ""){
		blockSelecterImage.setSize(16, 16);
	}else{
		blockSelecterImage.setSize(0, 0);
	}
	text.setContent(`FPS: ${adverageFPS}`);
	return(menu);
}