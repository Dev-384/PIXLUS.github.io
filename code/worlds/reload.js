import play from "./index.json" assert {type: "json"};
import { PlayerPositions } from "../play/player/movement.js";

export default async function(forceReload=false){
	let numberOfWorlds = play.worlds.length;

	for(let i = 0; i < numberOfWorlds; i++){
		let currentWorldName = play.worlds[i].title;


		if( localStorage.getItem(`world.${currentWorldName}`) == null || forceReload == true){

			let {default: currentWorld} = await import(`../worlds/${play.worlds[i].path}`, {
				assert: {
					type: "json",
				},
			});
		
			let stringifiedWorldData = JSON.stringify(currentWorld);

			localStorage.setItem(`world.${currentWorldName}`, stringifiedWorldData);
			PlayerPositions.X = currentWorld.spawnpoint.X;
			PlayerPositions.Y = currentWorld.spawnpoint.Y;
			location.reload();
		}
	}
}