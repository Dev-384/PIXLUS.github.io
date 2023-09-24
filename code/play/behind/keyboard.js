import options_keybinds from "../../../options/index.json" assert {type: "json"};
import { UI_options, innerScreen, scale } from "../main.js";
import { setEditingLayer } from "./world_editor.js";

export var keysPressed = [];

export var keybinds = options_keybinds.keybinds;

export function KeyPressed(key=""){
	key = key.toLowerCase();
	let indexOfKey = keysPressed.indexOf(key);
	return(indexOfKey !== -1);
}
export function cancleKeyPress(){
	keysPressed = [];
}

export var MousePositions = {
	X: -1,
	Y: -1
}

document.onkeydown = (e) => {

	if( e.ctrlKey == false ){

		if(keysPressed.includes(e.key.toLowerCase()) == false){
			keysPressed.push(e.key.toLowerCase());
		}

		if(KeyPressed("escape")){
			e.preventDefault();
			if(UI_options.currentMenu == ""){
				UI_options.currentMenu = "paused";
			}else{
				UI_options.currentMenu = ""
			}
		}
		if(KeyPressed("e")){
			if(UI_options.currentMenu == ""){
				UI_options.currentMenu = "inventory";
			}else{
				UI_options.currentMenu = ""
			}
		}
		if(UI_options.currentMenu == ""){
			if(e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4"){
				setEditingLayer(JSON.parse(e.key));
			}
		}
	}else{
		if(e.key.toLowerCase() == "r"){
			if(options_keybinds.advanced.DEVELOPER_MODE !== true){
				e.preventDefault();
				window.location.href = "../";	
			}
		}else if(e.shiftKey && e.key.toLowerCase() == "i"){
			if(options_keybinds.advanced.DEVELOPER_MODE !== true){
				e.preventDefault();
			}
		}else if(e.key == "-" || e.key == "_" || e.key == "=" || e.key == "+" || e.key == "0" || e.key == ")"){
			e.preventDefault();
		}else if(e.key.toLowerCase() == "s"){
			e.preventDefault();

			let save = innerScreen.toDataURL();
			// console.log(save);
			downloadImage(save);
		}
	}
}
window.onresize = (e) => {
	e.preventDefault();
}
document.onkeyup = (e) => {
	let key = e.key.toLowerCase(); 
	let indexOfKey = keysPressed.indexOf(key);
	while(indexOfKey >= 0){
		indexOfKey = keysPressed.indexOf(key);
		keysPressed.splice(indexOfKey, 1);
	}
}
window.onmousemove = (e) => {
	MousePositions.X = (e.clientX + window.scrollX) / (16 * scale);
	MousePositions.Y = (e.clientY + window.scrollY) / (16 * scale);
}
document.oncontextmenu = (e) => {
	e.preventDefault();
	if(KeyPressed("mouserightclick") == false){
		keysPressed.push("mouserightclick");
	}
}
document.onmousedown = (e) => {

	if (e.button == 4) {
		if(KeyPressed("mousewheelclick") == false){
			keysPressed.push("MouseWheelClick");
		}
	}else{
		if(KeyPressed("mouseclick") == false){
			keysPressed.push("mouseclick");
		}
	}
};
document.onmouseup = () => {
	keysPressed = keysPressed.removeAll("mouseclick");
	keysPressed = keysPressed.removeAll("mouserightclick");
	keysPressed = keysPressed.removeAll("mousewheelclick");
};


async function downloadImage(image){

	let date = new Date;
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();

	let hour = date.getHours();
	let minute = date.getMinutes();
	let milliseconds = date.getMilliseconds();

	let link = document.createElement("a");
	link.href = image;
	link.download = `PIXLUS_screenshot_${year}-${month}-${day}_${hour+minute+milliseconds}`;
	link.click();
}