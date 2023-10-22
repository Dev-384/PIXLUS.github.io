import { cancleKeyPress } from "../code/play/behind/keyboard.js";
import Actions from "../code/play/actions.js";

export default class {
	constructor(){}
	interpert(action=""){
		let runString = "";
		let actionLines = action;

		while(actionLines.includes("; ")){
			actionLines = actionLines.replaceAll("; ", ";")
		}
		while(actionLines.includes(", ")){
			actionLines = actionLines.replaceAll(", ", ",")
		}
		
		actionLines = actionLines.split(";");
		for(let line = 0; line < actionLines.length; line++){
			
			let currentLine = actionLines[line];

			while(currentLine.startsWith(" ")){
				currentLine = currentLine.replace(" ", "");
			}
			// slice(0, -1)
			while(currentLine.endsWith(" ")){
				currentLine = currentLine.slice(0, -1);
			}

			let currentLineWords = currentLine.replaceAll(" ", ".");
			currentLineWords = currentLineWords.replaceAll(".(", "(");
			currentLineWords = currentLineWords.replaceAll("(.", "(");
			currentLineWords = currentLineWords.replaceAll(".)", ")");
			currentLineWords = currentLineWords.replaceAll("%s", "\%s");
			runString += "%s." + currentLineWords + ";";
		}
		return({
			run: async () => {
				cancleKeyPress();

				let {default: block_actions} = await import("./block_actions.js");

				let actions = (new block_actions).actions.actions;

				let evalInput = runString.replaceAll("%s", Object.keys({actions})[0]);
				evalInput = evalInput.replaceAll("\%s", "%s");

				return(eval(evalInput));
			}
		});
	}
	actions = new Actions;
}