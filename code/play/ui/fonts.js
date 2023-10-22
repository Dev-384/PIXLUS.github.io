import ui from "../../assets/UI/ui.json" assert {type: "json"};
import { innerScreen } from "../main.js";
import { image } from "../image.js";

export function text(message, x=0, y=0, size=0){
	message = `${message}`;
	let xOffset = 0;
	let yOffset = 0;

	message = message.replaceAll("✏️", "∇");
	message = message.replaceAll("...", "…");
	message = message.replaceAll(":)", "🙂");
	if(message.includes("\"") == true){
		while(message.includes("\"")){
			message = message.replace("\"", "«");
			message = message.replace("\"", "»");
		}
	}

	for(let i = 0; i < message.length; i++){

		letter(message[i], x+xOffset, y+yOffset, size, innerScreen);
		number(message[i], x+xOffset, y+yOffset, size, innerScreen);
		icon(message[i], x+xOffset, y+yOffset, size, innerScreen);

		xOffset += 1 * (size * 0.75);

		if(x+xOffset+size > innerScreen.width - size || message[i] == "\n"){
			xOffset = 0;
			yOffset += 1 * size;
		}
	}
}

export function letter(letter="", x=0, y=0, size=0){
	letter = letter.toLowerCase();
	let letterList = ui.fonts.letters;

	if(letter in letterList){
		let letterData = letterList[letter].img;

		image(
			"../../code/assets/UI/images/fonts/"+letterData.source,
			x, y,
			size, size,
			
			letterData?.tileCoords?.X, letterData?.tileCoords?.Y,
			letterData.width, letterData.height
		);
	}
}

export function number(number="", x=0, y=0, size=0){
	let numberList = ui.fonts.numbers;

	if(number in numberList){
		let numberData = numberList[number].img;

		image(
			"../../code/assets/UI/images/fonts/"+numberData.source,

			x, y,
			size, size,
			
			numberData?.tileCoords?.X, numberData?.tileCoords?.Y,
			numberData.width, numberData.height
		);
	}

}

export function icon(icon="", x=0, y=0, size=0){
	let iconList = ui.fonts.icons;

	if(icon in iconList){
		let iconData = iconList[icon].img;

		image("../../code/assets/UI/images/fonts/"+iconData.source, x, y, size, size, 0,0,16,16);
	}
}