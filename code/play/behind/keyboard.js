import { selectedBlockX, selectedBlockY } from "../ui/block_selection.js";
import { PlaceBlock } from "./world_editor.js";

export var keysPressed = [];

export var MousePositions = {
	X: -1,
	Y: -1
}

export function StartKeyboardTracker(){

	document.onkeydown = (e) => {
			if(
				e.ctrlKey == false &&
				e.key.includes("F") == false &&
				e.metaKey == false &&
				e.altKey == false
			){
				e.preventDefault();
				if(keysPressed.includes(e.key) == false){
					keysPressed.push(e.key);
				}
				return(false);
			}
	}
	document.onkeyup = (e) => {
		keysPressed = keysPressed.removeAll(e.key);
	}
	window.onmousemove = (e) => {
		MousePositions.X = e.clientX + window.scrollX;
		MousePositions.Y = e.clientY + window.scrollY;
	}
	document.onmousedown = () => {
		if(keysPressed.includes("MouseClick") == false){
			keysPressed.push("MouseClick");
		}
	};
	document.onmouseup = () => {
		keysPressed = keysPressed.removeAll("MouseClick");
	};
}

Array.prototype.removeAll = (item) => {
	let NewArray = Array.prototype.filter(function(x) {
		return x !== item;
	});
	return(NewArray);
}

setInterval(() => {
	if(keysPressed.includes("MouseClick")){
		PlaceBlock(localStorage.getItem("currentBlock") || "grass_block");
	}
}, 100);