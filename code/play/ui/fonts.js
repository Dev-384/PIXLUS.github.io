import ui from "../../assets/UI/ui.json" assert {type: "json"}

export function text(message="", x=0, y=0, size=0, canvas=HTMLCanvasElement){
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

		letter(message[i], x+xOffset, y+yOffset, size, canvas);
		number(message[i], x+xOffset, y+yOffset, size, canvas);
		icon(message[i], x+xOffset, y+yOffset, size, canvas);

		xOffset += 1 * (size * 0.75);

		if(x+xOffset+size > canvas.width - size || message[i] == "\n"){
			xOffset = 0;
			yOffset += 1 * size;
		}
	}
}

export function letter(letter="", x=0, y=0, size=0, canvas=HTMLCanvasElement){
	letter = letter.toLowerCase();
	let letterList = ui.fonts.letters;

	if(letter in letterList){
		let letterData = letterList[letter].img;

		image(letterData.source, x, y, size, size, canvas);
	}
}

export function number(number="", x=0, y=0, size=0, canvas=HTMLCanvasElement){
	let numberList = ui.fonts.numbers;

	if(number in numberList){
		let numberData = numberList[number].img;

		image(numberData.source, x, y, size, size, canvas);
	}

}

export function icon(icon="", x=0, y=0, size=0, canvas=HTMLCanvasElement){
	let iconList = ui.fonts.icons;

	if(icon in iconList){
		let iconData = iconList[icon].img;

		image(iconData.source, x, y, size, size, canvas);
	}
}

function image(img="", x=0, y=0, width=0, height=0, canvas=HTMLCanvasElement){
	let context = canvas.getContext("2d");
	let myImage = document.createElement('img');
	context.globalAlpha = 1;
	context.shadowBlur = 20;
	myImage.src = `../../code/assets/UI/images/fonts/${img}`;
	context.drawImage(myImage, x+width/2, y+height/2, width,height);
	context.stroke();
	myImage.remove();
}