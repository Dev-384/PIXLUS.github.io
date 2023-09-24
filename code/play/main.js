import * as game from "./screen/loop.js";
import reloadWorlds from "../worlds/reload.js";
import * as loader from "../loader_create.js";
import last_play from "../../last_play.json" assert {type: "json"};
let last_play_copy = JSON.parse(JSON.stringify(last_play));
last_play_copy["CYAN"] = "RED!";
web_request.writeFile("../../last_play.json", JSON.stringify(last_play_copy, null, 4), window.location.href);

await reloadWorlds();
loader.show("Loading");
loadAssets();

import * as web_request from "../../server/web_request.js";

web_request.readFile("last_play.txt", (fileContent) => {
	console.log(fileContent);
});

export const startTime = (new Date).getMilliseconds();
export var canvas = document.getElementById("screen");
export var innerScreen = document.createElement("canvas");
export var UI_options = {
	currentMenu: ""
};
export var actualScale = 1;
export var scale = actualScale / 4;


import gameOptions from "../../options/index.json" assert {type: "json"};
import { loadAssets } from "./preload/assets.js";

if((gameOptions.advanced["show_paused_menu"] !== false)){
	UI_options.currentMenu = "paused";
}

setTimeout( () =>  {

	game.startLoop();
	loader.hide();

}, 1000);

document.onvisibilitychange = () => {
	if(gameOptions.advanced.DEVELOPER_MODE !== true){
		if(UI_options.currentMenu == ""){
			UI_options.currentMenu = "paused";
		}
	}
}