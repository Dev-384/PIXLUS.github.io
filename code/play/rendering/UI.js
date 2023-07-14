import { UI_options } from "../main.js";
import Menues from "../ui/ui_elements.json" assert {type: "json"};

export default async function(){
	let currentMenuName = UI_options.currentMenu;
	let allMenues = Menues.elements;
	let currentMenu = allMenues[currentMenuName];
	

	// (condition) ? expression on true : expression on false
	for (let index = 0; index < ( ( currentMenu !== undefined ) ? currentMenu.length : 0 ); index++) {
		let currentMenuElement = currentMenu[index];
		if(currentMenuElement.type == "background"){
			image(
				currentMenuElement.img.source,

				0,
				0,

				Math.max(canvas.width, canvas.height),
				Math.max(canvas.width, canvas.height),
				canvas
			);
		}
		if(currentMenuElement.type == "image"){
			image(
				currentMenuElement.img.source,

				currentMenuElement.img.position.X,
				currentMenuElement.img.position.Y,

				currentMenuElement.img.width,
				currentMenuElement.img.height,
				canvas
			);
		}
	}
}