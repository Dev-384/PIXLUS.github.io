import { UI_options } from "../code/play/main.js";
import { PlayerPositions } from "../code/play/player/movement.js";

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
					console.log(layer-1, x, y, value);
					let worldData = JSON.parse(localStorage.getItem("world.One"));
					worldData.world[layer][y][x] = value;
					localStorage.setItem("world.One", JSON.stringify(worldData));
				}else if(typeof layer == "string"){
					value = layer;
					x = Math.floor(PlayerPositions.X / 16);
					y = Math.floor(PlayerPositions.Y / 16);
	
					let worldData = JSON.parse(localStorage.getItem("world.One"));
					worldData.world[2][y][x] = value;
					localStorage.setItem("world.One", JSON.stringify(worldData));
				}
			}
		},
		add: {
			item: {
				to: {
					player: (itemName="") => {
						console.log(itemName);	
					},
					block: (layer=1, x=0, y=0) => {
						console.log(layer, x, y, itemName);
					}	
				}
			},
			effect: {
				to: {
					player: (itemName="") => {
						console.log(itemName);	
					},
					entity: (entityName="", itemName="") => {
						console.log(entityName, itemName);
					}	
				}
			}
		}
	}
}