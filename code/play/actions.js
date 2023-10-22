import PlaceBlock from "./behind/world_editor.js";
import { UI_options } from "./main.js";
import { PlayerPositions } from "./player/movement.js";
import { CashedBlockData } from "./render.js";
import worlds from "../worlds/index.json" assert {type: "json"};

export default class {
	constructor(){

	}
	actions = {
		open: {
			page: (url="") => {
				window.location.href = url;
			},
			menu: (menuName="") => {
				UI_options.currentMenu = menuName;
			}
		},
		change: {
			world: {
				to: (url="") => {
					window.location.href = url;
				}
			},
			player: {
				speed: {
					to: () => {
						// ...
					},
					by: () => {
						// ...
					}
				}
			}
		},
		set: {
			block: (layer=1, x=0, y=0, value="") => {
				if(
					typeof layer == "number" &&
					typeof x == "number" &&
					typeof y == "number" &&
					typeof value == "string"
				){
					PlaceBlock(value, x, y, layer);
				}else if(typeof layer == "string"){
					value = layer;

					x = Math.floor( (PlayerPositions.X) / 16);
					y = Math.floor( (PlayerPositions.Y-2) / 16);

					let worldData = localStorage.getItem(`world.${worlds.worlds[JSON.parse(localStorage.getItem("worldNumber"))].title}`);
					worldData = JSON.parse(worldData);

					for(let testingLayer = 0; testingLayer < worldData.world.length; testingLayer ++){
						let currentWorldLayer = worldData.world[testingLayer];

						console.log(currentWorldLayer?.length, currentWorldLayer?.length <= y);
						console.log(currentWorldLayer[y]?.length, currentWorldLayer[y]?.length <= x);

						let currentBlock = currentWorldLayer[y][x];
						let currentBlockData = CashedBlockData[currentBlock];

						console.log(currentBlockData);

						if(typeof currentBlockData?.aspects?.action == "string") PlaceBlock(value, x, y, testingLayer + 1);
					}
				}else console.log("A Block-action was run without parameters")
			}
		},

		add: {
			item: {
				to: {
					player: (itemName="") => {
						// console.log(itemName);	
					},
					block: (layer=1, x=0, y=0) => {
						// console.log(layer, x, y, itemName);
					}	
				}
			},
			effect: {
				to: {
					player: (itemName="") => {
						// console.log(itemName);	
					},
					entity: (entityName="", itemName="") => {
						// console.log(entityName, itemName);
					}	
				}
			}
		}
	}
}